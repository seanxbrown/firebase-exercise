import React from 'react'
import { Container, Button } from "react-bootstrap"

const DeleteExercise = ({selectedExercise, closeExerciseDeletionBox, removeExerciseFromWorkout}) => {

  return (
    <Container className="bg-danger text-dark d-flex justify-content-center align-items-center flex-column rounded p-2 w-50 position-absolute top-50 start-50 translate-middle" id="deleteExerciseBox">
        <p>Delete this exercise?</p>
        <div id="deleteConfirmationButtonContainer" className="d-flex justify-content-between w-25">
            <Button type="button" variant="dark" onClick={() => removeExerciseFromWorkout(selectedExercise)} >Yes</Button>
            <Button type="button" variant="dark" onClick={closeExerciseDeletionBox}>No</Button>
        </div>
    </Container>
  )
}

export default DeleteExercise