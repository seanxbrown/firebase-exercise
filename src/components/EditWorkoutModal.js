import { Container, Form, Button, CloseButton } from "react-bootstrap"

const EditWorkoutModal = ({ isTemplate, item, closeModal, updateFunction }) => {
  return (
    <Container className="border border-1 border-secondary p-5 bg-light" id="addWorkoutDiv">
        <CloseButton className="float-end" onClick={closeModal}/>
        <Form onSubmit={updateFunction}>
            <Form.Group>
                <Form.Label>Editing {item && item.title || item && item.name}</Form.Label>
                <Form.Control id="workoutTitle" type="text" list="datalistOptions" placeholder="Select or enter a workout" maxLength="30" defaultValue={item.title || item.name}/>
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
            {!isTemplate && <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control required id="workoutDate" type="date" defaultValue={item.date}/>
            </Form.Group> }
            <Button type="submit" className="btn btn-primary rounded-pill mt-3">Update Workout</Button>
        </Form>
    </Container>
  )
}

export default EditWorkoutModal