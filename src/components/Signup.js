import {Container, Form, Button} from 'react-bootstrap';
import {Link} from "react-router-dom"

export default function Signup() {
  return (
    <Container className="border border-1 border-secondary mt-5 py-5 rounded">
        <h2 className="text-center">Sign Up</h2>
        <Form className="w-75 mx-auto">
            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control required type="email" placeholder="example@address.com"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control required type="password"></Form.Control>
            </Form.Group>
            <Button type="submit" className="w-100 mt-5">Create Account</Button>
        </Form>
        <p className="text-center text-muted">Already have an account? <Link to="/firebase-exercise/login">Log in</Link></p>
        
    </Container>
  )
}

