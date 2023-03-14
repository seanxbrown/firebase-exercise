import { Alert } from "react-bootstrap"

const AlertModal = ({ type, text, closeModal}) => {
  return (
    <Alert 
        variant={type} 
        className="text-center" 
        dismissible 
        onClose={closeModal}>
        {text}
    </Alert>
  )
}

export default AlertModal