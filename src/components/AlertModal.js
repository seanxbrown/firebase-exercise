import { Alert } from "react-bootstrap"

const AlertModal = ({ text, closeModal}) => {
  return (
    <Alert 
        variant="danger" 
        className="text-center" 
        dismissible 
        onClose={closeModal}>
        {text}
    </Alert>
  )
}

export default AlertModal