import React from 'react'
import { Container, Button } from "react-bootstrap";


const DeletionModal = ({ type, item, closeModal, removalFunction}) => {
  return (
    <Container className="bg-danger bg-gradient border-dark rounded p-4 w-50 shadow-lg position-absolute top-50 start-50 translate-middle" id="deleteExerciseBox">
        <p className="text-dark text-center">Delete this {type}?</p>
        <div id="deleteConfirmationButtonContainer" className="d-flex justify-content-around w-50 gap-4 m-auto">
            <Button type="button" variant="dark" onClick={() => removalFunction(item.id)} >Yes</Button>
            <Button type="button" variant="dark" onClick={closeModal}>No</Button>
        </div>
    </Container>
  )
}

export default DeletionModal