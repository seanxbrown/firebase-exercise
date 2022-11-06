import Container from "react-bootstrap/Container";
import FormComponent from "./components/FormComponent";
import { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Signup from "./components/Signup"
import Login from './components/Login';
import {auth} from "./firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


function App() {
  const [exercise, setExercise] = useState([]);
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
          <h1 className="text-light">Exercise Tracker App</h1>
        </header>
        <h2>Logged in as {user && user.email }</h2>
        <h2>Auth: {auth.currentUser && auth.currentUser.email}</h2>
        <Routes>
          <Route path="/firebase-exercise/signup" element={<Signup user={user}/>} />
          <Route path="/firebase-exercise/login" element={<Login logOut={logOut} user={user}/>} />
          <Route path="/firebase-exercise" element={<FormComponent /> } />
        </Routes>
      </Container>
    </BrowserRouter>

  );
}

export default App;
