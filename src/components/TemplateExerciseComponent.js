import { CloseButton, Row, Col } from "react-bootstrap";

const TemplateExerciseComponent = ({ exercise, openTemplateExerciseDeletionBox, selectTemplateExercise, openEditBox }) => {

    return (
        <>
            <Row xs={3}className="justify-content-center text-center workoutData align-items-center pb-3" id={exercise.id} onClick={() => selectTemplateExercise(exercise)}>
                <Col sm={2}>
                    <p>{exercise.name}</p>
                </Col>
                <Col sm={1}>
                    <p>Sets: {exercise.sets}</p>
                </Col>
                <Col sm={1}>
                    <p>Reps: {exercise.reps}</p>
                </Col>

                <Col sm={3}>        
                    <p>Notes: {exercise.notes}</p>
                </Col>
                <Col sm={1}>        
                    <i className="bi-pencil-fill ms-3" onClick={openEditBox}></i>
                </Col>
                <Col sm={1}>
                    <CloseButton variant="white" className="border border-1 border-light" onClick={openTemplateExerciseDeletionBox} />
                </Col>
            </Row>
        </>
    )
}

export default TemplateExerciseComponent