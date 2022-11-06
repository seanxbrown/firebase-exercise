import React, {useState} from 'react'
import { Button } from "react-bootstrap";
import Exercise from "./Exercise"

const Dashboard = ( {workouts}) => {
    const [selectedWorkout, setSelectedWorkout] = useState()

function selectWorkout(number) {
    const selection = [...workouts].filter(workout => number == workout.id);
    setSelectedWorkout(selection[0])
    
}
  return (
    <div>
        <div id="workoutDiv">
            <h2>Workouts</h2>
            <Button type="button" className="btn btn-primary">Add Workout</Button>
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