import React from 'react'
import { CloseButton, Row, Col } from "react-bootstrap"

const WorkoutComponent = ({workout, selectWorkout, openWorkoutDeletionBox}) => {

  function formatDate(dateString) {
    if (typeof dateString === "string") {
        const day = dateString.slice(8)
        const month = dateString.slice(5, 7)
        const year = dateString.slice(0, 4)
        return `${day}/${month}/${year}`
      
    }
}

  return (
    <Row className="text-center workoutData" id={workout.id} onClick={(() => selectWorkout([workout.id]))}>
      <Col xs={6}>{workout.title}</Col>
      <Col xs={4}>{formatDate(workout.date)}</Col>
      <Col xs={2}>
        <CloseButton variant="white" onClick={() => openWorkoutDeletionBox(workout)}/>
      </Col>
    </Row>
  )
}

export default WorkoutComponent