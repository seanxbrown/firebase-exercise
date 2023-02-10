import React from 'react'
import { Link } from "react-router-dom"

const Home = ({user}) => {
  return (
    <div>
        <h2>Home</h2>
            <Link to="/firebase-exercise/signup">Sign Up</Link>
            <Link to="/firebase-exercise/login">Log in</Link>
            {user && user.uid && <Link to={`/firebase-exercise/${user.uid}/dashboard`}>Dashboard</Link> }

    </div>
  )
}

export default Home