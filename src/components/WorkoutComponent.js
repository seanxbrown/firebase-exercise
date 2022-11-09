import React from 'react'
import { CloseButton } from "react-bootstrap"

const WorkoutComponent = ({workout, selectWorkout, removeWorkoutFromList}) => {
  return (
    <div id={workout.id} className="bg-info" onClick={(() => selectWorkout([workout.id]))}>
        {workout.title}
        <CloseButton onClick={() => removeWorkoutFromList(workout.id)}/>
    </div>
  )
}

export default WorkoutComponent