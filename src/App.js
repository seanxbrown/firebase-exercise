import Container from "react-bootstrap/Container";
import FormComponent from "./components/FormComponent";
import { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, Redirect} from 'react-router-dom';
import Signup from "./components/Signup"
import Login from './components/Login';
import {auth} from "./firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


function App() {
  const [exercise, setExercise] = useState([]);
  const [user, setUser] = useState();

  async function signUp(e) {
    e.preventDefault()

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const passwordConf = document.getElementById("signupPasswordConf").value;

    if(password !== passwordConf) {
      return
    }

    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
    } catch(e) {
      alert(e)
    }

  }

  async function logIn(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const loginUser = await signInWithEmailAndPassword(auth, email, password);
    } catch(e) {
      alert(e)
    }

  }

  async function logOut() {
    
    return await signOut(auth)


  }

  useEffect(() => {

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

  }, [])

  return (
    <Container fluid className="App">
      <header className="py-3 bg-gradient bg-dark">
        <h1 className="text-light">Exercise Tracker App</h1>
      </header>
      <h2>Logged in as {user && user.email }</h2>
      <h2>Auth: {auth.currentUser && auth.currentUser.email}</h2>

      <BrowserRouter>
      <Routes>
        <Route path="/firebase-exercise/signup" element={<Signup signUp={signUp} user={user}/>} />
        <Route path="/firebase-exercise/login" element={<Login logIn={logIn} logOut={logOut} user={user}/>} />
        <Route path="/firebase-exercise" element={<FormComponent /> } />
      </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
