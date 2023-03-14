import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { auth  } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import AlertModal from '../../components/AlertModal';

export default function Signup() {
    const navigate = useNavigate()
    const user = useContext(AuthContext)
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")


    async function signUserUp(e) {
        e.preventDefault()
    
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const passwordConf = document.getElementById("signupPasswordConf").value;
    
        if(password !== passwordConf) {
          setError(true)
          setErrorMessage("Passwords do not match")
          return
        }
    
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch(e) {
          setError(true)
          setErrorMessage(e.message)
        }

        navigate("/firebase-exercise/dashboard");
    
      }

      function closeErrorModal() {
        setError(false);
        setErrorMessage("")
      }


      
    useEffect(()=> {
      const signupDiv = document.getElementById("signupContainer");
      signupDiv.classList.remove("container-invisible");

    }, [])

  return (
    <>
      {error && <AlertModal type="danger" text={errorMessage} closeModal={closeErrorModal} />}
      <Container className="border border-1 border-secondary mt-5 py-5 rounded container-invisible" id="signupContainer">
          <h2 className="text-center">Sign Up</h2>
          <Form className="w-75 mx-auto" onSubmit={signUserUp}>
              <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control required type="email" placeholder="example@address.com" id="signupEmail"></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" id="signupPassword"></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control required type="password" id="signupPasswordConf"></Form.Control>
              </Form.Group>
              <Button disabled={user} type="submit" className="w-100 mt-5 rounded-pill">Create Account</Button>
          </Form>
          <p className="text-center text-muted">Already have an account? <Link to="/firebase-exercise/login">Log in</Link></p>
      </Container>
    </>
  )
}

