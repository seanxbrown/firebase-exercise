import React from 'react'
import {Link} from "react-router-dom"

const Header = ({ logOut, user }) => {
  console.log(user)
  return (
    <header className="py-3 px-2 d-flex justify-content-between align-items-center text-light" id="header">
        <Link to="/firebase-exercise" className="text-light h1 text-decoration-none fw-bold">Metis</Link>
        <h5>{user && user.displayName || user && user.email}</h5>
        <Link to="/firebase-exercise/profile" className="text-light text-decoration-none">Profile</Link>
        <a className="align-self-center text-decoration-none text-light" id="logout-text" onClick={() => {logOut()}}>Log Out</a>
  </header>  )
}

export default Header