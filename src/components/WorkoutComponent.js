import React from 'react'
import { CloseButton, Row, Col } from "react-bootstrap"

const WorkoutComponent = ({workout, selectWorkout, removeWorkoutFromList}) => {
  return (
    <Row className="workoutData" id={workout.id} onClick={(() => selectWorkout([workout.id]))}>
      <Col xs={6}>{workout.title}</Col>
      <Col xs={4}>{workout.date}</Col>
        <Col xs={2}>
          <CloseButton onClick={() => removeWorkoutFromList(workout.id)}/>
        </Col>
    </Row>
  )
}

export default WorkoutComponent