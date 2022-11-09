import React from 'react'
import {Container, CloseButton } from "react-bootstrap"

const Exercise = ({exercise, removeExerciseFromWorkout}) => {

    return (
        <>
        <Container className="d-flex">
        <p>{exercise.name}</p>
        <p>{exercise.weight}</p>
        <p>Sets: {exercise.sets}</p>
        <p>Reps: {exercise.reps}</p>
        <p>Target hit? {exercise.target? "Yes" : "No" }</p>
        <CloseButton onClick={() => removeExerciseFromWorkout(exercise.id)} />

        </Container>

        </>
 

    )
}

export default Exercise