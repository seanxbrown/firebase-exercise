import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useContext, useState } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import PasswordReset from './PasswordReset';
import AlertModal from '../../components/AlertModal';
 
export default function Login() {
  const navigate = useNavigate();
  const user = useContext(AuthContext)
  const [resetting, setResetting] = useState(false)
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState("")

  async function logUserIn(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(`/firebase-exercise/dashboard`);
    } catch(e) {
      setAlert(true)
      setAlertMessage(e.message)
      setAlertType("danger")
      
    }
    
  }

  function openResetModal() {
    setResetting(true)
  }

  function closeResetModal() {
    setResetting(false)
  }

  async function resetPassword() {
    
    try {
      const email = document.getElementById("resetEmail").value;

      sendPasswordResetEmail(auth, email)
      setAlert(true)
      setAlertMessage("You have been emailed a link with password reset instructions")
      setAlertType("success")
      setResetting(false)
      
    } catch(e) {
      setAlert(true)
      setAlertMessage(e.message)
      setAlertType("danger")
    }

  }

  function closeErrorModal() {
    setAlert(false);
    setAlertMessage("")
  }


  return (
    <>
      {alert && <AlertModal type={alertType} text={alertMessage} closeModal={closeErrorModal} />}
      {resetting && <PasswordReset closeResetModal={closeResetModal} resetPassword={resetPassword} /> }
      <Container className="border border-1 border-secondary mt-5 py-5 rounded text-dark">
          <h2 className="text-center">Log In</h2>
          <Form className="w-75 mx-auto" onSubmit={logUserIn}>
              <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control required type="email" placeholder="example@address.com" id="loginEmail"></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" id="loginPassword"></Form.Control>
              </Form.Group>
              <Button disabled={user} type="submit" className="w-100 mt-5 rounded-pill">Log in</Button>
          </Form>
          <div className="d-flex flex-column">
            <p className="text-center text-muted">Don't have an account? <Link to="/firebase-exercise/signup">Sign up</Link></p>
            <p onClick={openResetModal} className="text-center align-self-center" id="passwordChange">Click here to reset your password</p>
          </div>
      </Container>
    </>
    
  )
}

