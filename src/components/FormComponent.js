import {Form, Button } from "react-bootstrap";
import {Link} from "react-router-dom"

const FormComponent = ({addExercise}) => {
    return (
        <>
        <Form onSubmit={addExercise}>
            <Form.Group>
                <Form.Label>Exercise</Form.Label>
                <Form.Control type="text" placeholder="e.g. Bench Press" id="exerciseName"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sets</Form.Label>
                <Form.Control type="number" min="1" id="exerciseSets"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Reps</Form.Label>
                <Form.Control type="number" min="0" id="exerciseReps"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" id="exerciseDate"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Target Achieved?</Form.Label>
                <Form.Check type="checkbox" id="exerciseTarget"></Form.Check>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
        <Link to="/firebase-exercise/signup">Sign Up Component</Link>
      <Link to="/firebase-exercise/login">Login Component</Link>

        </>
    )
}

export default FormComponent