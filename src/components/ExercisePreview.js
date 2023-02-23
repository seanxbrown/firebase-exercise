import React from 'react'
import { Col, Button } from "react-bootstrap"
import ExerciseComponent from './ExerciseComponent'

const ExercisePreview = ( { selectedWorkout, selectExercise, openExerciseDeletionBox, removeExerciseFromWorkout, toggleNewExerciseStatus}) => {
  return (
    <Col xs={12} sm={7} id="exerciseDiv" className="p-0">
        <div className="d-flex flex-column" id="exerciseColumnHeader">
            <h2 className="text-center fw-bold">Exercises {selectedWorkout ? `(${selectedWorkout.title})` : null}</h2>
            <Button type="button" onClick={toggleNewExerciseStatus} className="btn btn-primary align-self-center mb-3 rounded-pill">Add New Exercise</Button>
        </div>
        <div className="workoutDataContainer overflow-hidden">
            {selectedWorkout && selectedWorkout.exercises && selectedWorkout.exercises.length > 0 ? selectedWorkout.exercises.map(exercise => <ExerciseComponent preview="true" selectExercise={selectExercise} openExerciseDeletionBox={openExerciseDeletionBox} removeExerciseFromWorkout={removeExerciseFromWorkout} key={exercise.id} exercise={exercise}/>) : <h3 className="fw-bold text-center">No exercise selected.</h3>}
        </div>          
            
    </Col>
  )
}

export default ExercisePreview