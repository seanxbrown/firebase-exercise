import React, {useState, useEffect} from 'react'
import { Button, Row, Col } from "react-bootstrap";
import Exercise from "./Exercise";
import AddNewWorkout from "./AddNewWorkout";
import { v4 as uuidv4 } from "uuid";
import WorkoutComponent from './WorkoutComponent';
import AddNewExercise from "./AddNewExercise"
import { database, set, ref, onValue, update } from "../firebase"

const Dashboard = ({user}) => {
    const [selectedWorkout, setSelectedWorkout] = useState();
    const [workouts, setWorkouts] = useState([])
    const [creatingNewWorkout, setCreatingNewWorkout] = useState(false);
    const [addingNewExercise, setAddingNewExercise] = useState(false)

function selectWorkout(number) {
    const selection = [...workouts].filter(workout => number == workout.id);
    setSelectedWorkout(selection[0])
}

function toggleNewWorkoutStatus(e) {
    e.preventDefault()
    setCreatingNewWorkout(creatingNewWorkout => !creatingNewWorkout)
}

function toggleNewExerciseStatus() {
    setAddingNewExercise(addingNewExercise => !addingNewExercise)
}

function writeData() {
    const newWorkouts = [...workouts]
    const workoutTitle = document.getElementById("workoutTitle").value || new Date(Date.now()).toString()
    const workoutDate = document.getElementById("workoutDate").value;
    newWorkouts.push({
        id: uuidv4(),
        title: workoutTitle,
        date: workoutDate,
        exercises: []
    })

    try {
        set(ref(database, `${user.uid}/workouts/`), newWorkouts )
    } catch(error) {
        alert(error)
    }
    setCreatingNewWorkout(creatingNewWorkout => !creatingNewWorkout)

 
}

function addWorkoutToListDB(e) {
    e.preventDefault();
    writeData(user.uid)
}

function removeWorkoutFromList(id) {
    const newWorkouts = [...workouts].filter(workout => id !== workout.id);

    try {
        update(ref(database, `${user.uid}`), {"workouts": newWorkouts} )
    } catch(error) {
        alert(error)
    }

}

function addExerciseToWorkout(e) {
    e.preventDefault();
    if (selectedWorkout === undefined) {
        alert("No workout selected") 
        return
    }

    const newWorkouts = [...workouts]
    const exerciseID = uuidv4();
    const exerciseName = document.getElementById("exerciseName").value
    const exerciseSets = document.getElementById("exerciseSets").value
    const exerciseReps = document.getElementById("exerciseReps").value
    const exerciseWeight = document.getElementById("exerciseWeight").value
    const exercisetTarget = document.getElementById("exercisetTarget").checked
    const exerciseNotes = document.getElementById("exerciseNotes").value;

    const newExercise = {
        id: exerciseID,
        name: exerciseName,
        sets: exerciseSets,
        reps: exerciseReps,
        weight: `${exerciseWeight}kg`,
        target: exercisetTarget,
        notes: exerciseNotes,
    }

    for (let key of newWorkouts) {
        if (key.id === selectedWorkout.id) {
            if (key.exercises) {
                key.exercises.push(newExercise)
            } else {
                key.exercises = [newExercise]
            }
        }

    }

    try {
        update(ref(database, `${user.uid}`), {"workouts": newWorkouts} )
    } catch(error) {
        alert(error)
    }

    setAddingNewExercise(addingNewExercise => !addingNewExercise)



}

function removeExerciseFromWorkout(id) {
    const newWorkouts = [...workouts];
    for (let workout of newWorkouts) {
        if(selectedWorkout.id === workout.id) {
            if (!workout.exercises) {return}
            workout.exercises = workout.exercises.filter(exercise => exercise.id !== id)
        }
    }

    const newSelectedWorkout = {...selectedWorkout}
    newSelectedWorkout.exercises = newSelectedWorkout.exercises.filter(exercise => exercise.id !== id)
    setSelectedWorkout(newSelectedWorkout)
    
    try {
        update(ref(database, `${user.uid}`), {"workouts": newWorkouts} )

    }catch(error) {
        alert(error)
    }

}

useEffect(() => {

    function getWorkoutData() {
        const dbRef = ref(database, `${user.uid}`);
        
        try {
            onValue(dbRef, snapshot => {
                if (snapshot.val()) {
                    setWorkouts(workouts => workouts = snapshot.val().workouts)
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
    <Row className="bg-">
        {creatingNewWorkout && <AddNewWorkout addWorkoutToListDB={addWorkoutToListDB} toggleNewWorkoutStatus={toggleNewWorkoutStatus} /> }
        <Col xs={12} sm={4} id="workoutDiv" className="">
            <div>
                <h2 className="text-center">Workouts</h2>
                <Button type="button" onClick={toggleNewWorkoutStatus} className="btn btn-primary">Add New Workout</Button>
            </div>
            <div className="workoutDataContainer">
                {workouts && workouts.map(workout => <WorkoutComponent key={workout.id} removeWorkoutFromList={removeWorkoutFromList} selectWorkout={selectWorkout} workout={workout}/> )}
            </div>  
        </Col>
        <Col xs={12} sm={8} id="exerciseDiv">
            {addingNewExercise && <AddNewExercise selectedWorkout={selectedWorkout} addExerciseToWorkout={addExerciseToWorkout} toggleNewExerciseStatus={toggleNewExerciseStatus}/> }
            <div>
                <h2 className="text-center">Exercises {selectedWorkout ? `(${selectedWorkout.title})` : null}</h2>
                <Button type="button" onClick={toggleNewExerciseStatus} className="btn btn-primary">Add New Exercise</Button>
            </div>
            <div className="workoutDataContainer">
                {selectedWorkout && selectedWorkout.exercises && selectedWorkout.exercises.map(exercise => <Exercise removeExerciseFromWorkout={removeExerciseFromWorkout} key={exercise.id} exercise={exercise}/>)}
            </div>          
            
        </Col>
    </Row>
  )
}

export default Dashboard

