import React, {useState} from 'react'
import { Button } from "react-bootstrap";
import Exercise from "./Exercise";
import Workout from './Workout';
import AddNewWorkout from "./AddNewWorkout";
import { v4 as uuidv4 } from "uuid"

const Dashboard = () => {
    const [selectedWorkout, setSelectedWorkout] = useState();
    const [workouts, setWorkouts] = useState([{id: 1, title: "Test", date: "01/01/2022", exercises: [{id: 1, name: "bench", sets: 3, reps: 10, weight: "90 KG", target: true}]}, {id: 2, title: "Test 2", date: "01/01/2022", exercises: [{id: 1, name: "Deadlift", sets: 3, reps: 10, weight: "150 KG", target: false}]}])
    const [creatingNewWorkout, setCreatingNewWorkout] = useState(false)

function selectWorkout(number) {
    const selection = [...workouts].filter(workout => number == workout.id);
    setSelectedWorkout(selection[0])
}

//Create "add new workout" functionality next

function toggleNewWorkoutStatus(e) {
    e.preventDefault()
    setCreatingNewWorkout(creatingNewWorkout => !creatingNewWorkout)
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

  return (
    <div>
        {creatingNewWorkout && <AddNewWorkout addWorkoutToList={addWorkoutToList} toggleNewWorkoutStatus={toggleNewWorkoutStatus} /> }
        <div id="workoutDiv">
            <h2>Workouts</h2>
            <Button type="button" onClick={toggleNewWorkoutStatus} className="btn btn-primary">Add New Workout</Button>
            {workouts.map(workout => <p id={workout.id} key={workout.id} className="bg-info" onClick={(() => selectWorkout([workout.id]))}>{workout.title}</p>)}
        </div>
        <div>
            <h2>Exercise</h2>
            {selectedWorkout && selectedWorkout.exercises.map(exercise => <Exercise key={exercise.id} exercise={exercise}/>)}
        </div>
    </div>
  )
}

export default Dashboard