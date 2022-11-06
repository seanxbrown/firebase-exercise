import React from 'react'
import {auth} from "../firebase"
import {useNavigate, Navigate, Route, Outlet} from "react-router-dom"

function PrivateRoute({ user }) { 
    const navigate = useNavigate()
    
  return user ? <Outlet /> : <Navigate to="/firebase-exercise/signup"/>
  
}

export default PrivateRoute