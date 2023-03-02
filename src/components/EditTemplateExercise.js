import React from 'react'
import { Container, Form, CloseButton, Button } from "react-bootstrap"

const EditTemplateExercise = ({ selectedTemplateExercise, closeEditBox, handleTemplateExerciseUpdate }) => {
  return (
    <Container className="border border-1 border-secondary p-5 bg-light" id="addExerciseDiv">
        <h2>Editing {selectedTemplateExercise && selectedTemplateExercise.name}</h2>
        <CloseButton className="float-end" onClick={closeEditBox}/>
        <Form onSubmit={handleTemplateExerciseUpdate}>
        <Form.Group>
                <Form.Label>Exercise</Form.Label>
                <Form.Control required id="exerciseName" type="text" placeholder="Bench Press" maxLength="30" defaultValue={selectedTemplateExercise.name}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sets</Form.Label>
                <Form.Control required id="exerciseSets" type="number" min="1" max="99" defaultValue={selectedTemplateExercise.sets}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Reps</Form.Label>
                <Form.Control required id="exerciseReps" type="number" min="0" max="99" defaultValue={selectedTemplateExercise.reps}/>
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" id="exerciseNotes" defaultValue={selectedTemplateExercise.notes}/>
            </Form.Group>
            <Button type="submit" className="btn btn-primary rounded-pill mt-4">Update Exercise</Button>
        </Form>
    </Container>
  )
}

export default EditTemplateExercise