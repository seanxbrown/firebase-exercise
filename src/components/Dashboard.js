import React, { useState, useEffect, useContext } from 'react';
import { Button, Row, Col } from "react-bootstrap";
import ExerciseComponent from "./ExerciseComponent";
import AddNewWorkout from "./AddNewWorkout";
import { v4 as uuidv4 } from "uuid";
import WorkoutComponent from './WorkoutComponent';
import AddNewExercise from "./AddNewExercise";
import { database, set, ref, onValue, update } from "../firebase";
import Workout from "./Workout";
import Exercise from './Exercise';
import DeleteWorkout from './DeleteWorkout';
import DeleteExercise from './DeleteExercise';
import { Link } from "react-router-dom"
import { AuthContext } from '../contexts/AuthContext';

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

function addWorkout() {
    const newWorkouts = [...workouts];
    const workoutTitle = document.getElementById("workoutTitle").value || new Date(Date.now()).toString();
    const workoutDate = document.getElementById("workoutDate").value;
    const workoutID = uuidv4();
    const newWorkout = new Workout(workoutID, workoutTitle, workoutDate);
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
    const exercisetTarget = document.getElementById("exercisetTarget").checked;
    const exerciseNotes = document.getElementById("exerciseNotes").value;
    const newExercise = new Exercise(exerciseID, exerciseName, exerciseSets, exerciseReps,`${exerciseWeight}kg`, exercisetTarget, exerciseNotes)

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

function createWorkoutsPreview(workouts) {
    if(Array.isArray(workouts)) {
        const previewWorkouts = [...workouts].splice(0, 10);
        return previewWorkouts

    }
    
}


useEffect(() => {

    getWorkoutData()
    

},[])

useEffect(()=> {
    createWorkoutsPreview(workouts)

},[workouts])

  return (

    <Row id="dashboard" className="p-4 position-relative">
        {creatingNewWorkout && <AddNewWorkout handleWorkoutSubmit={handleWorkoutSubmit} toggleNewWorkoutStatus={toggleNewWorkoutStatus} /> }
        {deletingWorkout && <DeleteWorkout workout={selectedWorkout} closeWorkoutDeletionBox={closeWorkoutDeletionBox} removeWorkoutFromList={removeWorkoutFromList}/>}
        {deletingExercise && <DeleteExercise selectedExercise={selectedExercise} removeExerciseFromWorkout={removeExerciseFromWorkout} closeExerciseDeletionBox={closeExerciseDeletionBox}/>}
        <Col xs={12} sm={5} id="workoutDiv" className="border-end border-1 border-light p-1">
            <div className="d-flex flex-column" id="workoutColumnHeader">
                <h2 className="text-center fw-bold">Workouts</h2>
                <Button type="button" onClick={toggleNewWorkoutStatus} className="btn btn-primary align-self-center mb-3 rounded-pill">Add New Workout</Button>
            </div>
            <div className="workoutDataContainer overflow-hidden">
                {workouts && workouts.length > 0 ?
                 createWorkoutsPreview(workouts).map(workout => <WorkoutComponent key={workout.id} preview="true" openWorkoutDeletionBox={openWorkoutDeletionBox} selectWorkout={selectWorkout} workout={workout}/> ) : <h3 className="fw-bold text-center">No workouts saved.</h3>}
            </div>  
            <Link to={`/firebase-exercise/workouts`}>View all workouts</Link>
        </Col>
        <Col xs={12} sm={7} id="exerciseDiv" className="p-0">
            {addingNewExercise && <AddNewExercise selectedWorkout={selectedWorkout} addExerciseToWorkout={addExerciseToWorkout} toggleNewExerciseStatus={toggleNewExerciseStatus}/> }
            <div className="d-flex flex-column" id="exerciseColumnHeader">
                <h2 className="text-center fw-bold">Exercises {selectedWorkout ? `(${selectedWorkout.title})` : null}</h2>
                <Button type="button" onClick={toggleNewExerciseStatus} className="btn btn-primary align-self-center mb-3 rounded-pill">Add New Exercise</Button>
            </div>
            <div className="workoutDataContainer overflow-hidden">
                {selectedWorkout && selectedWorkout.exercises && selectedWorkout.exercises.length > 0 ? selectedWorkout.exercises.map(exercise => <ExerciseComponent preview="true" selectExercise={selectExercise} openExerciseDeletionBox={openExerciseDeletionBox} removeExerciseFromWorkout={removeExerciseFromWorkout} key={exercise.id} exercise={exercise}/>) : <h3 className="fw-bold text-center">No exercise selected.</h3>}
            </div>          
            
        </Col>
    </Row>
  )
}

export default Dashboard

//{workouts && workouts.length > 0 ? workouts.map(workout => <WorkoutComponent key={workout.id} openWorkoutDeletionBox={openWorkoutDeletionBox} selectWorkout={selectWorkout} workout={workout}/> ) : <h3 className="fw-bold text-center">No workouts saved.</h3>}
