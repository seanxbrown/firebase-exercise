import React from 'react';
import { Form, Container, Button, CloseButton } from "react-bootstrap"

const AddNewWorkout = ({toggleNewWorkoutStatus, handleWorkoutSubmit}) => {
  return (
    <Container className="border border-1 border-secondary p-5 bg-light" id="addWorkoutDiv">
        <CloseButton onClick={toggleNewWorkoutStatus} className="float-end"/>
        <Form onSubmit={handleWorkoutSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control id="workoutTitle" type="text" list="datalistOptions" placeholder="Select or enter a workout" maxLength="30" />
                <datalist id="datalistOptions">
                <option value="Upper Body" />
                <option value="Lower Body" />
                <option value="Full Body" />
                <option value="Push" />
                <option value="Pull" />
                <option value="Legs" />
                <option value="Abs" />
                <option value="Chest" />
                <option value="Back" />
                <option value="Arms" />
                </datalist>
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control required id="workoutDate" type="date"/>
            </Form.Group>
            <Button type="submit" className="btn btn-primary rounded-pill mt-3">Create Workout</Button>
        </Form>
    </Container>
  )
}

export default AddNewWorkout