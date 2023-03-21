import { CloseButton, Row, Col, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { formatDate } from "../utils/utils"

const WorkoutComponent = ({workout, selectWorkout, openWorkoutDeletionBox, openEditBox, preview}) => {

  return (
    <ListGroup.Item className="text-dark">
      <Row id={workout.id} onClick={(() => selectWorkout(workout.id))}>
        <Col xs={5}>{workout.title}</Col>
        <Col xs={3}>{formatDate(workout.date)}</Col>
        <Col xs={1}>
          <Link to={`/firebase-exercise/workouts/${workout.id}`}>View</Link>
        </Col>
        <Col xs={1}>
          {!preview && <i className="bi-pencil-fill ms-3" onClick={openEditBox}></i>}
        </Col>
        {!preview && <Col xs={1} className="gx-5">
          <CloseButton variant="white" onClick={() => openWorkoutDeletionBox(workout)}/>
        </Col> }
      </Row>
    </ListGroup.Item>
    
  )
}

export default WorkoutComponent