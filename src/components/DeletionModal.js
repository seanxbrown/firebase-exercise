import { Container, Button, Alert } from "react-bootstrap";

const DeletionModal = ({ type, item, closeModal, removalFunction }) => {
  return (
    <Alert 
      variant="danger" 
      className="p-4 w-50 shadow-lg" 
      id="deleteExerciseBox"
    >
        <p className="text-dark text-center">Delete this {type}?</p>
        <div 
          id="deleteConfirmationButtonContainer" 
          className="d-flex justify-content-around w-50 gap-4 m-auto"
        >
            <Button 
              type="button" 
              variant="dark" 
              onClick={() => removalFunction(item.id)} 
            >
              Yes
            </Button>
            <Button 
              type="button" 
              variant="dark" 
              onClick={closeModal}
            >
              No
            </Button>
        </div>
    </Alert>
  )
}

export default DeletionModal