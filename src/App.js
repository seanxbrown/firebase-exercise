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
import Dashboard from "./components/Dashboard";
import Header from "./components/Header"
import "./App.css"
 

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
        <Header user={user} logOut={logOut} />
      <Container fluid className="App">
        <Routes>
          <Route path="/firebase-exercise/signup" element={<Signup user={user}/>} />
          <Route path="/firebase-exercise/login" element={<Login logOut={logOut} user={user}/>} />
          <Route element={<PrivateRoute user={user}/>} >
            <Route path="/firebase-exercise" element={<Dashboard user={user}/> }/>
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>

  );
}

export default App;
