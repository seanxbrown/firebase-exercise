import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup"
import Login from './components/Login';
import { auth } from "./firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header"
import "./App.css"
import Footer from "./components/Footer"
import Profile from "./components/Profile"
import AllWorkouts from "./components/AllWorkouts";
import Home from "./components/Home";
 
function App() {
  const [user, setUser] = useState();

  async function logOut() {
    
    return await signOut(auth);

  }
  
  useEffect(() => {

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    
    })

  })

  return (
    <BrowserRouter>
      <Header user={user} logOut={logOut} />
      <Container fluid className="App min-vh-100 text-light overflow-scroll">
        <Routes>
          <Route path="/firebase-exercise/signup" element={<Signup user={user}/>} />
          <Route path="/firebase-exercise/login" element={<Login logOut={logOut} user={user}/>} />
          <Route path="/firebase-exercise" element={<Home user={user}/> }/>
          <Route element={<PrivateRoute user={user}/>} >
            <Route path="/firebase-exercise/:id/dashboard" element={<Dashboard user={user}/> }/>
            <Route path="/firebase-exercise/profile" element={<Profile user={user}/> }/>
            <Route path="/firebase-exercise/:id/workouts" element={<AllWorkouts />}/>
          </Route>
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>

  );
}

export default App;