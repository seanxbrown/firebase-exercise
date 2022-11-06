import {Container, Form, Button} from 'react-bootstrap';
import {Link} from "react-router-dom"

export default function Login({logIn, logOut, user}) {
  return (
    <Container className="border border-1 border-secondary mt-5 py-5 rounded">
        <h2 className="text-center">Log In</h2>
        <Form className="w-75 mx-auto" onSubmit={logIn}>
            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control required type="email" placeholder="example@address.com" id="loginEmail"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" id="loginPassword"></Form.Control>
            </Form.Group>
            <Button disabled={user} type="submit" className="w-100 mt-5">Log in</Button>
        </Form>
        <p className="text-center text-muted">Don't have an account? <Link to="/firebase-exercise/signup">Sign up</Link></p>
        <Button className="btn btn-primary" onClick={() => {logOut()}}>Log Out</Button>
        
    </Container>
  )
}

