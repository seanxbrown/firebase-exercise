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
import { AuthContext } from "./contexts/AuthContext"
import WorkoutDetail from "./components/WorkoutDetail";
import AllTemplates from "./components/AllTemplates";
import TemplateDetail from "./components/TemplateDetail"
 
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
    <AuthContext.Provider value={user}>
      <BrowserRouter>
        <Header logOut={logOut} />
        <Container fluid className="App min-vh-100 text-light overflow-scroll position-relative">
          <Routes>
            <Route path="/firebase-exercise/signup" element={<Signup />} />
            <Route path="/firebase-exercise/login" element={<Login logOut={logOut}/>} />
            <Route path="/firebase-exercise" element={<Home user={user}/> }/>
            <Route element={<PrivateRoute user={user}/>} >
              <Route path="/firebase-exercise/dashboard" element={<Dashboard/> }/>
              <Route path="/firebase-exercise/profile" element={<Profile /> }/>
              <Route path="/firebase-exercise/workouts" element={<AllWorkouts />}/>
              <Route path="/firebase-exercise/workouts/:workoutid" element={<WorkoutDetail />}/>
              <Route path="/firebase-exercise/templates" element={<AllTemplates />} />
              <Route path="/firebase-exercise/templates/:templateid" element={<TemplateDetail />} />
            </Route>
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;