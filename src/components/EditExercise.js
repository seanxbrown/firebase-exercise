import React from 'react'
import { Container, Form, CloseButton, Button } from "react-bootstrap"

const EditTemplateExercise = ({ selectedExercise, closeEditBox, handleExerciseUpdate }) => {
  return (
    <Container className="border border-1 border-secondary p-5 bg-light" id="addExerciseDiv">
        <h2>Editing {selectedExercise && selectedExercise.name}</h2>
        <CloseButton className="float-end" onClick={closeEditBox}/>
        <Form onSubmit={handleExerciseUpdate}>
        <Form.Group>
                <Form.Label>Exercise</Form.Label>
                <Form.Control required id="exerciseName" type="text" placeholder="Bench Press" maxLength="30" defaultValue={selectedExercise.name}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Weight</Form.Label>
                <Form.Control required id="exerciseWeight" type="number" min="0" max="999" defaultValue={selectedExercise.weight}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Unit</Form.Label>
                <Form.Select id="exerciseUom" defaultValue={selectedExercise.uom}>
                <option value="kg">kg</option>
                <option value="lb">lb</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sets</Form.Label>
                <Form.Control required id="exerciseSets" type="number" min="1" max="99" defaultValue={selectedExercise.sets}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Reps</Form.Label>
                <Form.Control required id="exerciseReps" type="number" min="0" max="99" defaultValue={selectedExercise.reps}/>
            </Form.Group>
            <Form.Group>
                <Form.Check id="exercisetTarget" type="checkbox" label="Target achieved?" maxLength="30" defaultValue={selectedExercise.target}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" id="exerciseNotes" defaultValue={selectedExercise.notes}/>
            </Form.Group>
            <Button type="submit" className="btn btn-primary rounded-pill mt-4">Update Exercise</Button>
        </Form>
    </Container>
  )
}

export default EditTemplateExercise