import React from 'react'
import { Col } from "react-bootstrap"
import ExerciseComponent from '../../components/ExerciseComponent'

const ExercisePreview = ( { selectedWorkout, selectExercise }) => {
  return (
    <Col xs={12} sm={7} id="exerciseDiv" className="border border-1 border-dark rounded p-2">
        <div className="d-flex flex-column" id="exerciseColumnHeader">
            <h2 className="text-center">Exercises {selectedWorkout ? `(${selectedWorkout.title})` : null}</h2>
        </div>
        <div className="workoutDataContainer overflow-hidden">
            {selectedWorkout && selectedWorkout.exercises && selectedWorkout.exercises.length > 0 ? 
              selectedWorkout.exercises.map(exercise => 
                <ExerciseComponent 
                  preview={true} 
                  selectExercise={selectExercise} 
                  key={exercise.id} 
                  exercise={exercise}
                />
              ) : <h3 className="fw-bold text-center">No exercise information found.</h3>}
        </div>          
    </Col>
  )
}

export default ExercisePreview