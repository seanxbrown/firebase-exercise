import React from 'react';
import { Form, Container, Button, CloseButton } from "react-bootstrap"

const AddNewExercise = ({ toggleNewExerciseStatus, addExerciseToWorkout, selectedWorkout }) => {
  return (
    <Container className="border border-1 border-secondary p-5" id="addExerciseDiv">
        <h2>Add Exercise to {selectedWorkout && selectedWorkout.title}</h2>
        <CloseButton onClick={() => toggleNewExerciseStatus()} className="float-end"/>
        <Form onSubmit={addExerciseToWorkout}>
            <Form.Group>
                <Form.Label>Exercise</Form.Label>
                <Form.Control required id="exerciseName" type="text" placeholder="Bench Press" maxLength="30"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sets</Form.Label>
                <Form.Control required id="exerciseSets" type="number" min="1" max="99"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Reps</Form.Label>
                <Form.Control required id="exerciseReps" type="number" min="0" max="99"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Weight (kg)</Form.Label>
                <Form.Control required id="exerciseWeight" type="number" min="0" max="999"/>
            </Form.Group>
            <Form.Group>
                <Form.Check id="exercisetTarget" type="checkbox" label="Target achieved?" maxlength="30"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" id="exerciseNotes" />
            </Form.Group>
            <Button type="submit" className="btn btn-primary rounded-pill">Add Exercise</Button>
        </Form>
    </Container>
  )
}

export default AddNewExercise