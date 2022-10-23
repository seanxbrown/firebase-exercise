import {Form, Button } from "react-bootstrap";

const FormComponent = () => {
    return (
        <>
        <Form>
            <Form.Group>
                <Form.Label>Exercise</Form.Label>
                <Form.Control type="text" placeholder="e.g. Bench Press"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sets</Form.Label>
                <Form.Control type="number" min="1"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Reps</Form.Label>
                <Form.Control type="number" min="0"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Target Achieved?</Form.Label>
                <Form.Check type="checkbox"></Form.Check>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
        </>
    )
}

export default FormComponent