import { Container, Button } from "react-bootstrap"

const DeleteWorkout = ({workout, closeWorkoutDeletionBox, removeWorkoutFromList}) => {
  return (
    <Container className="bg-danger bg-gradient rounded border border-1 border-white p-4 position-absolute top-50 start-50 translate-middle w-50" id="deleteWorkoutBox">
        <p className="text-dark text-center">Delete "{workout.title}"" (created on {workout.date})?</p>
        <div id="deleteConfirmationButtonContainer" className="d-flex justify-content-around w-50 gap-4 m-auto">
            <Button type="button" variant="dark" onClick={() => removeWorkoutFromList(workout.id)}>Yes</Button>
            <Button type="button" variant="dark" onClick={closeWorkoutDeletionBox}>No</Button>
        </div>
    </Container>
  )
}

export default DeleteWorkout