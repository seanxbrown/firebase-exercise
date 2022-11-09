import React, {useState} from 'react'
import { Button } from "react-bootstrap";
import Exercise from "./Exercise";
import AddNewWorkout from "./AddNewWorkout";
import { v4 as uuidv4 } from "uuid";
import WorkoutComponent from './WorkoutComponent';
import AddNewExercise from "./AddNewExercise"

const Dashboard = () => {
    const [selectedWorkout, setSelectedWorkout] = useState();
    const [workouts, setWorkouts] = useState([{id: 1, title: "Test", date: "01/01/2022", exercises: [{id: 1, name: "bench", sets: 3, reps: 10, weight: "90 KG", target: true, notes: ""}]}, {id: 2, title: "Test 2", date: "01/01/2022", exercises: [{id: 1, name: "Deadlift", sets: 3, reps: 10, weight: "150 KG", target: false, notes: ""}]}])
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

function addWorkoutToList(e) {
    e.preventDefault()
    
    const newWorkouts = [...workouts]
    const workoutTitle = document.getElementById("workoutTitle").value || new Date(Date.now()).toString()
    const workoutDate = document.getElementById("workoutDate").value;
    newWorkouts.push({
        id: uuidv4(),
        title: workoutTitle,
        date: workoutDate,
        exercises: []
    })

    setWorkouts(newWorkouts)

}

function removeWorkoutFromList(id) {
    const newWorkouts = [...workouts].filter(workout => id !== workout.id);
    setWorkouts(newWorkouts);
    console.log(id)

}

function addExerciseToWorkout(e) {
    e.preventDefault();

    console.log("workouts", workouts)
    const newWorkouts = [...workouts]
   const exerciseID = uuidv4();
    const exerciseName = document.getElementById("exerciseName").value
    const exerciseSets = document.getElementById("exerciseSets").value
    const exerciseReps = document.getElementById("exerciseReps").value
    const exerciseWeight = document.getElementById("exerciseWeight").value
    const exercisetTarget = document.getElementById("exercisetTarget").value
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
            key.exercises.push(newExercise)
        }

    }

    setWorkouts(newWorkouts)


}


  return (
    <div>
        {creatingNewWorkout && <AddNewWorkout addWorkoutToList={addWorkoutToList} toggleNewWorkoutStatus={toggleNewWorkoutStatus} /> }
        <div id="workoutDiv">
            <h2>Workouts</h2>
            <Button type="button" onClick={toggleNewWorkoutStatus} className="btn btn-primary">Add New Workout</Button>
            {workouts && workouts.map(workout => <WorkoutComponent key={workout.id} removeWorkoutFromList={removeWorkoutFromList} selectWorkout={selectWorkout} workout={workout}/> )}
        </div>
        <div>
            <h2>Exercise</h2>
            {addingNewExercise && <AddNewExercise selectedWorkout={selectedWorkout} addExerciseToWorkout={addExerciseToWorkout} toggleNewExerciseStatus={toggleNewExerciseStatus}/> }
            <Button type="button" onClick={toggleNewExerciseStatus} className="btn btn-primary">Add New Exercise</Button>


            {selectedWorkout && selectedWorkout.exercises.map(exercise => <Exercise key={exercise.id} exercise={exercise}/>)}
        </div>
    </div>
  )
}

export default Dashboard