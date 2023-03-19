import { Alert } from "react-bootstrap"

const AlertModal = ({ type = "info", text, closeModal}) => {
  return (
    <Alert 
        variant={type} 
        className="text-center" 
        dismissible 
        onClose={closeModal}
    >
      {text}
    </Alert>
  )
}

export default AlertModal