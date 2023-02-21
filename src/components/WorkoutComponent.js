import { useContext } from 'react'
import { CloseButton, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from '../contexts/AuthContext'

const WorkoutComponent = ({workout, selectWorkout, openWorkoutDeletionBox, openEditBox, preview}) => {
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
      <Col xs={5}>{workout.title}</Col>
      <Col xs={3}>{formatDate(workout.date)}</Col>
      <Col xs={1}>
        <Link to={`/firebase-exercise/workouts/${workout.id}`}>View</Link>
      </Col>
      <Col xs={1}>
        {!preview && <p onClick={openEditBox}>Edit</p>}
      </Col>
      <Col xs={2} className="gx-5">
        <CloseButton variant="white" onClick={() => openWorkoutDeletionBox(workout)}/>
      </Col>
    </Row>
  )
}

export default WorkoutComponent