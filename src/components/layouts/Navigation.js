import { useContext } from 'react'
import { Link } from "react-router-dom"
import { Navbar, Container, Nav } from "react-bootstrap"
import { AuthContext } from '../../contexts/AuthContext';

const Navigation = ({ logOut }) => {
const user = useContext(AuthContext)
  
  return (
    <Navbar collapseOnSelect expand="lg" id="header">
      <Container>
        <Nav.Link as={Link} to="/firebase-exercise" href="/firebase-exercise" className="text-light navbar-brand fs-1 text-decoration-none fw-bold">Metis</Nav.Link>
        <Nav className="me-auto">
            <Navbar.Text className="text-light">{user && user.displayName || user && user.email || user && "Guest User"}</Navbar.Text>
        </Nav>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to={`/firebase-exercise/profile`} href="/firebase-exercise/profile" className="text-light text-decoration-none nav-link">Profile</Nav.Link>
            <Nav.Link as={Link} to={`/firebase-exercise/dashboard`} href="/firebase-exercise/dashboard" className="text-light text-decoration-none nav-link">Dashboard</Nav.Link> 
          </Nav>
          <Nav>
            <Nav.Link as={Link} className="text-decoration-none text-light" id="logout-text" onClick={() => { logOut() }}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation