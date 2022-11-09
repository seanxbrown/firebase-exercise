import React from 'react';
import {Form, Container, Button, CloseButton} from "react-bootstrap"

const AddNewExercise = ({toggleNewExerciseStatus}) => {
  return (
    <Container className="border border-1 border-secondary p-5">
        <CloseButton onClick={() => toggleNewExerciseStatus()} className="float-end"/>
        <Form >
            <Form.Group>
                <Form.Label>Exercise</Form.Label>
                <Form.Control required id="workoutTitle" type="text" placeholder="Bench Press" maxLength="30"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sets</Form.Label>
                <Form.Control required id="workoutDate" type="number" min="1"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Reps</Form.Label>
                <Form.Control required id="workoutDate" type="number" min="0"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Weight</Form.Label>
                <Form.Control required id="workoutDate" type="number" min="0"/>
            </Form.Group>
            <Form.Group>
                <Form.Check id="workoutDate" type="checkbox" label="Target achieved?"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" id="workoutDate" />
            </Form.Group>
            <Button type="submit" className="btn btn-primary">Add Exercise</Button>
        </Form>
    </Container>
  )
}

export default AddNewExercise