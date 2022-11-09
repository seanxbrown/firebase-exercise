import React from 'react';
import {Form, Container, Button, CloseButton} from "react-bootstrap"

const AddNewExercise = ({toggleNewExerciseStatus, addExerciseToWorkout, selectedWorkout}) => {
  return (
    <Container className="border border-1 border-secondary p-5">
        <h2>Add Exercise to {selectedWorkout.title}</h2>
        <CloseButton onClick={() => toggleNewExerciseStatus()} className="float-end"/>
        <Form onSubmit={addExerciseToWorkout}>
            <Form.Group>
                <Form.Label>Exercise</Form.Label>
                <Form.Control  id="exerciseName" type="text" placeholder="Bench Press" maxLength="30"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sets</Form.Label>
                <Form.Control  id="exerciseSets" type="number" min="1"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Reps</Form.Label>
                <Form.Control  id="exerciseReps" type="number" min="0"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Weight (kg)</Form.Label>
                <Form.Control  id="exerciseWeight" type="number" min="0"/>
            </Form.Group>
            <Form.Group>
                <Form.Check id="exercisetTarget" type="checkbox" label="Target achieved?"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" id="exerciseNotes" />
            </Form.Group>
            <Button type="submit" className="btn btn-primary">Add Exercise</Button>
        </Form>
    </Container>
  )
}

export default AddNewExercise