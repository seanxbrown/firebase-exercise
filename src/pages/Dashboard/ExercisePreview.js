import React from 'react'
import { Col, Button } from "react-bootstrap"
import ExerciseComponent from '../../components/ExerciseComponent'

const ExercisePreview = ( { selectedWorkout, selectExercise, openExerciseDeletionBox, removeExerciseFromWorkout, toggleNewExerciseStatus}) => {
  return (
    <Col xs={12} sm={7} id="exerciseDiv" className="p-0">
        <div className="d-flex flex-column" id="exerciseColumnHeader">
            <h2 className="text-center">Exercises {selectedWorkout ? `(${selectedWorkout.title})` : null}</h2>
        </div>
        <div className="workoutDataContainer overflow-hidden">
            {selectedWorkout && selectedWorkout.exercises && selectedWorkout.exercises.length > 0 ? selectedWorkout.exercises.map(exercise => <ExerciseComponent preview="true" selectExercise={selectExercise} openExerciseDeletionBox={openExerciseDeletionBox} removeExerciseFromWorkout={removeExerciseFromWorkout} key={exercise.id} exercise={exercise}/>) : <h3 className="fw-bold text-center">No exercise information found.</h3>}
        </div>          
    </Col>
  )
}

export default ExercisePreview