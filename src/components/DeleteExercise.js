import React from 'react'
import { Container, Button } from "react-bootstrap"

const DeleteExercise = ({selectedExercise, closeExerciseDeletionBox, removeExerciseFromWorkout}) => {

  return (
    <Container className="bg-danger text-dark d-flex justify-content-center align-items-center flex-column rounded p-2">
        <p>Delete this exercise?</p>
        <div id="deleteConfirmationButtonContainer" className="d-flex justify-content-between w-25">
            <Button type="button" variant="dark" onClick={() => removeExerciseFromWorkout(selectedExercise)} >Yes</Button>
            <Button type="button" variant="dark" onClick={closeExerciseDeletionBox}>No</Button>
        </div>
    </Container>
  )
}

export default DeleteExercise