import React, {useState, useEffect} from 'react'
import { Button } from "react-bootstrap";
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

    set(ref(database, `${user.uid}/workouts/`), newWorkouts )
 
}

function addWorkoutToListDB(e) {
    e.preventDefault();
    writeData(user.uid)
}

function removeWorkoutFromList(id) {
    const newWorkouts = [...workouts].filter(workout => id !== workout.id);
    update(ref(database, `${user.uid}`), {"workouts": newWorkouts} )

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

    update(ref(database, `${user.uid}`), {"workouts": newWorkouts} )


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

    update(ref(database, `${user.uid}`), {"workouts": newWorkouts} )


}

useEffect(() => {

    function getWorkoutData() {
        const dbRef = ref(database, `${user.uid}`);
        onValue(dbRef, snapshot => {
            if (snapshot.val()) {
                setWorkouts(workouts => workouts = snapshot.val().workouts)


            }

            
        }
            )
    }

    getWorkoutData()

},[])


  return (
    <div>
        {creatingNewWorkout && <AddNewWorkout addWorkoutToListDB={addWorkoutToListDB} toggleNewWorkoutStatus={toggleNewWorkoutStatus} /> }
        <div id="workoutDiv">
            <h2>Workouts</h2><p>{selectedWorkout ? selectedWorkout.title : "No workout selected"}</p>
            <Button type="button" onClick={toggleNewWorkoutStatus} className="btn btn-primary">Add New Workout</Button>
            {workouts && workouts.map(workout => <WorkoutComponent key={workout.id} removeWorkoutFromList={removeWorkoutFromList} selectWorkout={selectWorkout} workout={workout}/> )}
        </div>
        <div>
            <h2>Exercise</h2>
            {addingNewExercise && <AddNewExercise selectedWorkout={selectedWorkout} addExerciseToWorkout={addExerciseToWorkout} toggleNewExerciseStatus={toggleNewExerciseStatus}/> }
            <Button type="button" onClick={toggleNewExerciseStatus} className="btn btn-primary">Add New Exercise</Button>


            {selectedWorkout && selectedWorkout.exercises && selectedWorkout.exercises.map(exercise => <Exercise removeExerciseFromWorkout={removeExerciseFromWorkout} key={exercise.id} exercise={exercise}/>)}
        </div>
    </div>
  )
}

export default Dashboard

/*{id: 1, title: "Test", date: "01/01/2022", exercises: [{id: 1, name: "bench", sets: 3, reps: 10, weight: "90 KG", target: true, notes: ""}]},*/