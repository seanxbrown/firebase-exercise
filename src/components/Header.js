import React from 'react'
import {Link} from "react-router-dom"
import { Navbar, Container, Nav } from "react-bootstrap"

const Header = ({ logOut, user }) => {
  return (
    <Navbar expand="lg" id="header">
      <Container>
        <Link to="/firebase-exercise" className="text-light navbar-brand fs-1 text-decoration-none fw-bold">Metis</Link>
        <Navbar.Toggle/>
        <Navbar.Collapse>

          <Nav className="me-auto">
            <Navbar.Text className="text-light">{user && user.displayName || user && user.email}</Navbar.Text>
          </Nav>

          <Nav>
            <Link to={`/firebase-exercise/${user && user.uid}/profile`} className="text-light text-decoration-none nav-link">Profile</Link>
          </Nav>

          <Nav>
            <Nav.Link className="text-decoration-none text-light" id="logout-text" onClick={() => {logOut()}}>Log Out</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header