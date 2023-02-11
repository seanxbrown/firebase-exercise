import React from 'react'
import { Link } from "react-router-dom"

const Home = ({user}) => {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center">
      <h2 className="text-center fw-bold ">The exercise tracker application</h2>
      <div id="homeLinkContainer" className="d-flex justify-content-center align-items-center h-25">
        <Link to="/firebase-exercise/signup" className="btn btn-lg homeLinkButton mx-1">Sign Up</Link>
        <Link to="/firebase-exercise/login" className="btn btn-lg homeLinkButton mx-1">Log in</Link>
      </div>
      
    </div>
  )
}

export default Home