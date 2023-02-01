import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from "react-bootstrap";
import ExerciseComponent from "./ExerciseComponent";
import AddNewWorkout from "./AddNewWorkout";
import { v4 as uuidv4 } from "uuid";
import WorkoutComponent from './WorkoutComponent';
import AddNewExercise from "./AddNewExercise";
import { database, set, ref, onValue, update } from "../firebase";
import Workout from "./Workout";
import Exercise from './Exercise';

const Dashboard = ({ user }) => {
    const [selectedWorkout, setSelectedWorkout] = useState();
    const [workouts, setWorkouts] = useState([]);
    const [creatingNewWorkout, setCreatingNewWorkout] = useState(false);
    const [addingNewExercise, setAddingNewExercise] = useState(false);

function selectWorkout(selectedID) {
    const selection = [...workouts].filter(workout => selectedID == workout.id);
    setSelectedWorkout(selection[0]);
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
    } catch(error) {
        alert(error);
    }
    setCreatingNewWorkout(creatingNewWorkout => !creatingNewWorkout);
}

function handleWorkoutSubmit(e) {
    e.preventDefault();
    addWorkout();
}

function removeWorkoutFromList(id) {
    const newWorkouts = [...workouts].filter(workout => id !== workout.id);

    try {
        update(ref(database, `${user.uid}`), {"workouts": newWorkouts});
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
    } catch(error) {
        alert(error);
    }

    setAddingNewExercise(addingNewExercise => !addingNewExercise)
}

//Identify correct workout. Return if no exercises, else remove selected exercise from the selected workout
function removeExerciseFromWorkout(id) {
    const newWorkouts = [...workouts];
    for (let workout of newWorkouts) {
        if(selectedWorkout.id === workout.id) {
            if (!workout.exercises) {return}
            workout.exercises = workout.exercises.filter(exercise => exercise.id !== id);
        }
    }
    //Also needs to be removed from selected workout, otherwise there will be a display error
    const newSelectedWorkout = {...selectedWorkout};
    newSelectedWorkout.exercises = newSelectedWorkout.exercises.filter(exercise => exercise.id !== id);
    setSelectedWorkout(newSelectedWorkout);
    
    try {
        update(ref(database, `${user.uid}`), {"workouts": newWorkouts});

    }catch(error) {
        alert(error);
    }
}

useEffect(() => {

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

    getWorkoutData()

},[])

  return (
    <Row id="dashboard">
        {creatingNewWorkout && <AddNewWorkout handleWorkoutSubmit={handleWorkoutSubmit} toggleNewWorkoutStatus={toggleNewWorkoutStatus} /> }
        <Col xs={12} sm={4} id="workoutDiv" className="border-end border-1 border-light mt-3 ">
            <div className="border-bottom border-light border-1 d-flex flex-column">
                <h2 className="text-center fw-bold">Workouts</h2>
                <Button type="button" onClick={toggleNewWorkoutStatus} className="btn btn-primary align-self-center mb-3 rounded-pill">Add New Workout</Button>
            </div>
            <div className="workoutDataContainer">
                {workouts && workouts.map(workout => <WorkoutComponent key={workout.id} removeWorkoutFromList={removeWorkoutFromList} selectWorkout={selectWorkout} workout={workout}/> )}
            </div>  
        </Col>
        <Col xs={12} sm={8} id="exerciseDiv" className="mt-3">
            {addingNewExercise && <AddNewExercise selectedWorkout={selectedWorkout} addExerciseToWorkout={addExerciseToWorkout} toggleNewExerciseStatus={toggleNewExerciseStatus}/> }
            <div className="border-bottom border-1 border-light d-flex flex-column">
                <h2 className="text-center fw-bold">Exercises {selectedWorkout ? `(${selectedWorkout.title})` : null}</h2>
                <Button type="button" onClick={toggleNewExerciseStatus} className="btn btn-primary align-self-center mb-3 rounded-pill">Add New Exercise</Button>
            </div>
            <div className="workoutDataContainer">
                {selectedWorkout && selectedWorkout.exercises && selectedWorkout.exercises.map(exercise => <ExerciseComponent removeExerciseFromWorkout={removeExerciseFromWorkout} key={exercise.id} exercise={exercise}/>)}
            </div>          
            
        </Col>
    </Row>
  )
}

export default Dashboard