import React from 'react'
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom"

const Header = ( {logOut, user}) => {
  return (
    <header className="py-3 px-2 d-flex justify-content-between align-items-center text-light" id="header">
        <Link to="/firebase-exercise" className="text-light h1 text-decoration-none fw-bold">Exercise Tracker App</Link>
        <h5>{user && user.email}</h5>
        <a className="align-self-center text-decoration-none text-light" id="logout-text" onClick={() => {logOut()}}>Log Out</a>
  </header>  )
}

export default Header