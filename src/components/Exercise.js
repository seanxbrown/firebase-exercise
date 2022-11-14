import React from 'react'
import {Container, CloseButton, Row, Col } from "react-bootstrap"

const Exercise = ({exercise, removeExerciseFromWorkout}) => {

    return (
        <>
        <Row xs={3}className="justify-content-center text-center workoutData" >
            <Col sm={1}>
                <p>{exercise.name}</p>
            </Col>
            <Col sm={1}>
                <p>{exercise.weight}</p>
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
            <Col sm={5}>        
                <p>Notes: {exercise.notes}</p>
            </Col>
            <Col sm={1}>
                <CloseButton onClick={() => removeExerciseFromWorkout(exercise.id)} />
            </Col>

        </Row>

        </>
 

    )
}

export default Exercise