import React, { useState, useEffect, useContext } from 'react';
import { Row } from "react-bootstrap";
import AddNewWorkout from "./AddNewWorkout";
import { v4 as uuidv4 } from "uuid";
import AddNewExercise from "./AddNewExercise";
import { database, set, ref, onValue, update } from "../firebase";
import Workout from "./Workout";
import Exercise from './Exercise';
import DeleteWorkout from './DeleteWorkout';
import DeleteExercise from './DeleteExercise';
import { AuthContext } from '../contexts/AuthContext';
import WorkoutsPreview from './WorkoutsPreview';
import ExercisePreview from './ExercisePreview';

const Dashboard = () => {
    const [selectedWorkout, setSelectedWorkout] = useState();
    const [workouts, setWorkouts] = useState([]);
    const [creatingNewWorkout, setCreatingNewWorkout] = useState(false);
    const [addingNewExercise, setAddingNewExercise] = useState(false);
    const [deletingWorkout, setDeletingWorkout] = useState(false)
    const [deletingExercise, setDeletingExercise] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState("")
    const user = useContext(AuthContext)

function selectWorkout(selectedID) {
    const selection = [...workouts].filter(workout => selectedID == workout.id);
    setSelectedWorkout(selection[0]);

    const workoutComponents = [...document.getElementsByClassName("workoutData")]
    for (let component of workoutComponents) {
        if (component.id == selectedID) {
            component.classList.add("selected")
        } else {
            if (component.classList.contains("selected")) {
                component.classList.remove("selected")
            }
        }
    } 

}

function toggleNewWorkoutStatus(e) {
    e.preventDefault();
    setCreatingNewWorkout(creatingNewWorkout => !creatingNewWorkout);
}

function toggleNewExerciseStatus() {
    setAddingNewExercise(addingNewExercise => !addingNewExercise);
}

function formatDate(dateString) {
    if (typeof dateString === "string" && dateString.includes("-")) {
        const day = dateString.slice(8)
        const month = dateString.slice(5, 7)
        const year = dateString.slice(0, 4)
        return `${day}/${month}/${year}`
      
    } else {
      return dateString
    }
}


function addWorkout() {
    const newWorkouts = [...workouts];
    const workoutTitle = document.getElementById("workoutTitle").value || new Date(Date.now()).toString();
    const workoutDate = document.getElementById("workoutDate").value;
    const workoutID = uuidv4();
    const newWorkout = new Workout(workoutID, workoutTitle, formatDate(workoutDate));
    newWorkouts.push(newWorkout);

    try {
        set(ref(database, `${user.uid}/workouts/`), newWorkouts);
        getWorkoutData();

    } catch(error) {
        alert(error);
    }
    setCreatingNewWorkout(creatingNewWorkout => !creatingNewWorkout);
}

function handleWorkoutSubmit(e) {
    e.preventDefault();
    addWorkout();
}

function openWorkoutDeletionBox(workout) {
    //This opens the div to confirm deletion of workout
    setDeletingWorkout(true)
}

function closeWorkoutDeletionBox() {
    setDeletingWorkout(false)

}

function openExerciseDeletionBox(exercise) {
    //This opens the div to confirm deletion of exercise
    setDeletingExercise(true)
}

function closeExerciseDeletionBox() {
    setDeletingExercise(false)

}

function removeWorkoutFromList(id) {
    const newWorkouts = [...workouts].filter(workout => id !== workout.id);

    try {
        update(ref(database, `${user.uid}`), {"workouts": newWorkouts});
        getWorkoutData();
        setDeletingWorkout(false)
    } catch(error) {
        alert(error);
    }
}

function addExerciseToWorkout(e) {
    e.preventDefault();
    if (selectedWorkout === undefined) {
        alert("No workout selected"); 
        return
    }

    const newWorkouts = [...workouts];
    const exerciseID = uuidv4();
    const exerciseName = document.getElementById("exerciseName").value;
    const exerciseSets = document.getElementById("exerciseSets").value;
    const exerciseReps = document.getElementById("exerciseReps").value;
    const exerciseWeight = document.getElementById("exerciseWeight").value;
    const exerciseUnit = document.getElementById("exerciseUom").value;
    const exercisetTarget = document.getElementById("exercisetTarget").checked;
    const exerciseNotes = document.getElementById("exerciseNotes").value;
    const newExercise = new Exercise(exerciseID, exerciseName, exerciseSets, exerciseReps,exerciseWeight, exerciseUnit, exercisetTarget, exerciseNotes)

    for (let key of newWorkouts) {
        if (key.id === selectedWorkout.id) {
            if (key.exercises) {
                key.exercises.push(newExercise);
            } else {
                key.exercises = [newExercise];
            }
        }
    }

    try {
        update(ref(database, `${user.uid}`), {"workouts": newWorkouts});
        getWorkoutData();

    } catch(error) {
        alert(error);
    }

    setAddingNewExercise(addingNewExercise => !addingNewExercise)
}

//Identify correct workout. Return if no exercises, else remove selected exercise from the selected workout
function removeExerciseFromWorkout(selectedExercise) {
    const newWorkouts = [...workouts];
    for (let workout of newWorkouts) {
        if(selectedWorkout.id === workout.id) {
            if (!workout.exercises) {return}
            workout.exercises = workout.exercises.filter(exercise => exercise.id !== selectedExercise.id);
        }
    }
    //Also needs to be removed from selected workout, otherwise there will be a display error
    const newSelectedWorkout = {...selectedWorkout};
    newSelectedWorkout.exercises = newSelectedWorkout.exercises.filter(exercise => exercise.id !== selectedExercise.id);
    setSelectedWorkout(newSelectedWorkout);
    
    try {
        update(ref(database, `${user.uid}`), {"workouts": newWorkouts});
        getWorkoutData();

    }catch(error) {
        alert(error);
    }

    setDeletingExercise(false)
}

function selectExercise(id) {
    setSelectedExercise(id)
}

function getWorkoutData() {
    const dbRef = ref(database, `${user.uid}`);
    
    try {
        onValue(dbRef, snapshot => {
            if (snapshot.val()) {
                setWorkouts(workouts => workouts = snapshot.val().workouts.sort((a, b) => b.date > a.date))
                } else {
                setWorkouts(workouts => workouts = [])
            }       
        }
            )
    } catch(error) {
        alert(error)
    }
}

useEffect(() => {

    getWorkoutData()
    
},[])

  return (
    <>
    <h2 className="py-3 text-center fw-bold">Dashboard</h2>
    <Row id="dashboard" className="p-4 position-relative">
        {creatingNewWorkout && <AddNewWorkout handleWorkoutSubmit={handleWorkoutSubmit} toggleNewWorkoutStatus={toggleNewWorkoutStatus} /> }
        {deletingWorkout && <DeleteWorkout workout={selectedWorkout} formatDate={formatDate} closeWorkoutDeletionBox={closeWorkoutDeletionBox} removeWorkoutFromList={removeWorkoutFromList}/>}
        {deletingExercise && <DeleteExercise selectedExercise={selectedExercise} removeExerciseFromWorkout={removeExerciseFromWorkout} closeExerciseDeletionBox={closeExerciseDeletionBox}/>}
        {addingNewExercise && <AddNewExercise selectedWorkout={selectedWorkout} addExerciseToWorkout={addExerciseToWorkout} toggleNewExerciseStatus={toggleNewExerciseStatus}/> }
        <WorkoutsPreview toggleNewWorkoutStatus={toggleNewWorkoutStatus} workouts={workouts} openWorkoutDeletionBox={openWorkoutDeletionBox} selectWorkout={selectWorkout}/>
        <ExercisePreview toggleNewExerciseStatus={toggleNewExerciseStatus} selectedWorkout={selectedWorkout} selectExercise={selectExercise} openExerciseDeletionBox={openExerciseDeletionBox} removeExerciseFromWorkout={removeExerciseFromWorkout} />
    </Row>
    </>

    
  )
}

export default Dashboard