import { CloseButton, Row, Col, ListGroup } from "react-bootstrap";

const TemplateExerciseComponent = ({ exercise, openTemplateExerciseDeletionBox, selectTemplateExercise, openEditBox }) => {

    return (
        <ListGroup.Item action variant="flush">
            <Row xs={3}className="justify-content-center align-items-center" id={exercise.id} onClick={() => selectTemplateExercise(exercise)}>
                <Col sm={3}>
                    <p>{exercise.name}</p>
                </Col>
                <Col sm={1}>
                    <p>Sets: {exercise.sets}</p>
                </Col>
                <Col sm={1}>
                    <p>Reps: {exercise.reps}</p>
                </Col>

                <Col sm={4}>        
                    <p>Notes: {exercise.notes}</p>
                </Col>
                <Col sm={1}>        
                    <i className="bi-pencil-fill ms-3" onClick={openEditBox}></i>
                </Col>
                <Col sm={1}>
                    <CloseButton variant="white" className="border border-1 border-light" onClick={openTemplateExerciseDeletionBox} />
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default TemplateExerciseComponent