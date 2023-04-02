import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./pages/Signup/Signup"
import Login from './pages/Login/Login';
import { auth } from "./firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navigation from "./components/layouts/Navigation"
import "./App.css"
import Footer from "./components/layouts/Footer"
import Profile from "./pages/Profile/Profile"
import AllWorkouts from "./pages/AllWorkouts/AllWorkouts";
import Home from "./pages/Home/Home";
import { AuthContext } from "./contexts/AuthContext"
import WorkoutDetail from "./pages/WorkoutDetail/WorkoutDetail";
import AllTemplates from "./pages/AllTemplates/AllTemplates";
import TemplateDetail from "./pages/TemplateDetail/TemplateDetail"
 
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
        <Navigation logOut={logOut} />
        <Container fluid className="App min-vh-100 text-light position-relative">
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