import Container from "react-bootstrap/Container";
import FormComponent from "./components/FormComponent";
import { useState } from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Signup from "./components/Signup"
import Login from './components/Login'

function App() {
  const [exercise, setExercise] = useState([])

  return (
    <Container fluid className="App">
      <header className="py-3 bg-gradient bg-dark">
        <h1 className="text-light">Exercise Tracker App</h1>
      </header>
      <BrowserRouter>
      <Routes>
        <Route path="/firebase-exercise/signup" element={<Signup />} />
        <Route path="/firebase-exercise/login" element={<Login />} />
        <Route path="/firebase-exercise" element={<FormComponent /> } />
      </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
