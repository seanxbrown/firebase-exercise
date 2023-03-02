import { Form, Container, Button, CloseButton } from "react-bootstrap"

const AddTemplateExercise = ({ closeNewExerciseBox, addExerciseToTemplate, selectedUserTemplate }) => {
  return (
    <Container className="border border-1 border-secondary p-5 bg-light" id="addExerciseDiv">
        <h2>Add Exercise to {selectedUserTemplate && selectedUserTemplate.name}</h2>
        <CloseButton onClick={closeNewExerciseBox} className="float-end"/>
        <Form onSubmit={addExerciseToTemplate}>
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
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" id="exerciseNotes"/>
            </Form.Group>
            <Button type="submit" className="btn btn-primary rounded-pill mt-4">Add Exercise</Button>
        </Form>
    </Container>
  )
}

export default AddTemplateExercise