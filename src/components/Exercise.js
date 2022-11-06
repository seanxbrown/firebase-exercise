import React from 'react'

const Exercise = ({exercise}) => {

    return (
        <>
        <p>{exercise.name}</p>
        <p>{exercise.weight}</p>
        <p>Sets: {exercise.sets}</p>
        <p>Reps: {exercise.reps}</p>
        <p>Target hit? {exercise.target? "Yes" : "No" }</p>
        </>
 

    )
}

export default Exercise