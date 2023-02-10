import {useContext} from 'react'
import { CloseButton, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from '../contexts/AuthContext'

const WorkoutComponent = ({workout, selectWorkout, openWorkoutDeletionBox}) => {
  const user = useContext(AuthContext)

  function formatDate(dateString) {
    if (typeof dateString === "string") {
        const day = dateString.slice(8)
        const month = dateString.slice(5, 7)
        const year = dateString.slice(0, 4)
        return `${day}/${month}/${year}`
      
    }
}

  return (
    <Row className="text-center workoutData" id={workout.id} onClick={(() => selectWorkout([workout.id]))}>
      <Col xs={6}>{workout.title}</Col>
      <Col xs={4}>{formatDate(workout.date)}</Col>
      <Col xs={1}>
        <Link to={`/firebase-exercise/${user.uid}/workouts/${workout.id}`}>View</Link>
      </Col>

      <Col xs={1}>
        <CloseButton variant="white" onClick={() => openWorkoutDeletionBox(workout)}/>
      </Col>
    </Row>
  )
}

export default WorkoutComponent