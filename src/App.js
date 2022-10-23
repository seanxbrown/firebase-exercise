import Container from "react-bootstrap/Container";
import FormComponent from "./components/FormComponent";
import { useState } from "react"

function App() {
  const [exercise, setExercise] = useState([])

  return (
    <Container fluid className="App">
      <header className="py-3 bg-gradient bg-dark">
        <h1 className="text-light">Exercise Tracker</h1>
      </header>
      <FormComponent /> 

    </Container>
  );
}

export default App;
