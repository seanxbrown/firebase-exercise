import { CloseButton, Row, Col } from "react-bootstrap";

const ExerciseComponent = ({ preview, exercise, openExerciseDeletionBox, selectExercise, openEditBox }) => {

    return (
        <>
            <Row xs={3}className="justify-content-center workoutData align-items-center pb-1" id={exercise.id} onClick={() => selectExercise(exercise)}>
                <Col sm={2}>
                    <p>{exercise.name}</p>
                </Col>
                <Col sm={1}>
                    <p>Weight: {exercise.weight.includes("kg") ? exercise.weight : `${exercise.weight}${exercise.uom}`}</p>
                </Col>
                <Col sm={1}>
                    <p>Sets: {exercise.sets}</p>
                </Col>
                <Col sm={1}>
                    <p>Reps: {exercise.reps}</p>
                </Col>
                <Col sm={2}>       
                    <p>Target hit? {exercise.target? "Yes" : "No" }</p>
                </Col>
                <Col sm={3}>        
                    <p>Notes: {exercise.notes}</p>
                </Col>
                {!preview && <Col sm={1}>        
                  <i className="bi-pencil-fill ms-3" onClick={openEditBox}></i>
                </Col> }
                {!preview && <Col sm={1}>
                    <CloseButton variant="white" className="border border-1 border-light" onClick={() => openExerciseDeletionBox(exercise)} />
                </Col>}
            </Row>
        </>
    )
}

export default ExerciseComponent