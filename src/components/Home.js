import React from 'react'
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
        <h2>Home</h2>
            <Link to="/firebase-exercise/signup">Sign Up</Link>
            <Link to="/firebase-exercise/login">Log in</Link>
    </div>
  )
}

export default Home