import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
 
export default function Login({ user }) {
  const navigate = useNavigate();

  async function logUserIn(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch(e) {
      alert(e);
    }
    navigate("/firebase-exercise/dashboard");

  }

  return (
    <Container className="border border-1 border-secondary mt-5 py-5 rounded">
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
        <p className="text-center text-muted">Don't have an account? <Link to="/firebase-exercise/signup">Sign up</Link></p>
    </Container>
  )
}

