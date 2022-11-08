import Container from "react-bootstrap/Container";
import FormComponent from "./components/FormComponent";
import { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Signup from "./components/Signup"
import Login from './components/Login';
import {auth} from "./firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import {Button } from "react-bootstrap"
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard"
 

function App() {
  const [user, setUser] = useState();
  

  async function logOut() {
    
    return await signOut(auth)

  }


  useEffect(() => {

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

  }, [])

  return (
    <BrowserRouter>
      <Container fluid className="App">
        <header className="py-3 bg-gradient bg-dark">
          <Link to="/firebase-exercise" className="text-light h1">Exercise Tracker App</Link>
          <Button className="btn btn-primary" onClick={() => {logOut()}}>Log Out</Button>

        </header>
        <h2>Logged in as {user && user.email }</h2>
        <Routes>
          <Route path="/firebase-exercise/signup" element={<Signup user={user}/>} />
          <Route path="/firebase-exercise/login" element={<Login logOut={logOut} user={user}/>} />
          <Route element={<PrivateRoute user={user}/>} >
            <Route path="/firebase-exercise" element={<Dashboard/> } user={user}/>
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>

  );
}

export default App;
