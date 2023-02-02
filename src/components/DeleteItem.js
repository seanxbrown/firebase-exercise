import React from 'react'
import { Container, Button } from "react-bootstrap"

const DeleteItem = ({workout, closeWorkoutDeletionBox, removeWorkoutFromList}) => {
  return (
    <Container className="bg-danger text-dark d-flex justify-content-center align-items-center flex-column rounded p-2">
        <p>Delete "{workout.title}"" (created on {workout.date})?</p>
        <div id="deleteConfirmationButtonContainer" className="d-flex justify-content-between w-25">
            <Button type="button" variant="dark" onClick={() => removeWorkoutFromList(workout.id)}>Yes</Button>
            <Button type="button" variant="dark" onClick={closeWorkoutDeletionBox}>No</Button>
        </div>
    </Container>
  )
}

export default DeleteItem