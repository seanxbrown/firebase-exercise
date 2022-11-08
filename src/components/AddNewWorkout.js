import React from 'react';
import {Form, Container, Button, CloseButton} from "react-bootstrap"

const AddNewWorkout = ({toggleNewWorkoutStatus}) => {
  return (
    <Container className="border border-1 border-secondary p-5">
        <CloseButton onClick={toggleNewWorkoutStatus} className="float-end"/>
        <Form>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Push Day" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date"/>
            </Form.Group>
            <Button type="submit" className="btn btn-primary">Create Workout</Button>
        </Form>
    </Container>
  )
}

export default AddNewWorkout