import React from 'react'
import { Navigate, Outlet} from "react-router-dom";

function PrivateRoute({ user }) { 

  return user ? <Outlet /> : <Navigate to="/firebase-exercise/signup"/>
  
}

export default PrivateRoute