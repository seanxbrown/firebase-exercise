import React from 'react'
import { Form, Container, Button, CloseButton } from "react-bootstrap"

const ExerciseModal = ({ isTemplate, isEdit, closeModal, updateFunction, workoutItem, exerciseItem }) => {
  return (
    <Container className="border border-1 border-secondary p-5 bg-light" id="addExerciseDiv">
        <h2>Add Exercise to {workoutItem && workoutItem.title || workoutItem && workoutItem.name}</h2>
        <CloseButton onClick={closeModal} className="float-end"/>
        <Form onSubmit={updateFunction}>
            <Form.Group>
                <Form.Label>Exercise</Form.Label>
                <Form.Control required id="exerciseName" type="text" placeholder="Bench Press" maxLength="30" defaultValue={isEdit && exerciseItem && exerciseItem.name || ""}/>
            </Form.Group>
            {!isTemplate && <Form.Group>
                <Form.Label>Weight</Form.Label>
                <Form.Control required id="exerciseWeight" type="number" min="0" max="999" defaultValue={isEdit && exerciseItem && exerciseItem.weight || ""}/>
            </Form.Group> }
            {!isTemplate && <Form.Group>
                <Form.Label>Unit</Form.Label>
                <Form.Select id="exerciseUom" defaultValue={isEdit && exerciseItem && exerciseItem.uom || ""}>
                <option value="kg">kg</option>
                <option value="lb">lb</option>
                </Form.Select>
            </Form.Group> }
            <Form.Group>
                <Form.Label>Sets</Form.Label>
                <Form.Control required id="exerciseSets" type="number" min="1" max="99" defaultValue={isEdit && exerciseItem && exerciseItem.sets || ""}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Reps</Form.Label>
                <Form.Control required id="exerciseReps" type="number" min="0" max="99" defaultValue={isEdit && exerciseItem && exerciseItem.reps || ""}/>
            </Form.Group>
            
            {!isTemplate && <Form.Group>
                <Form.Check id="exercisetTarget" type="checkbox" label="Target achieved?" maxLength="30" defaultValue={isEdit && exerciseItem && exerciseItem.checked || ""}/>
            </Form.Group> }
            <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" id="exerciseNotes" defaultValue={isEdit && exerciseItem && exerciseItem.notes || ""}/>
            </Form.Group>
            <Button type="submit" className="btn btn-primary rounded-pill mt-4">Add Exercise</Button>
        </Form>
    </Container>
  )
}

export default ExerciseModal