import React from 'react'
import { Col, ListGroup } from "react-bootstrap"
import ExerciseComponent from '../../components/ExerciseComponent'

const ExercisePreview = ( { selectedWorkout, selectExercise }) => {
  return (
    <Col xs={12} sm={7} id="exerciseDiv" className="p-2">
        <div className="d-flex flex-column" id="exerciseColumnHeader">
            <h2 className="text-center">Exercises {selectedWorkout ? `(${selectedWorkout.title})` : null}</h2>
        </div>
        <ListGroup variant="flush" className="overflow-hidden">
            {selectedWorkout && selectedWorkout.exercises && selectedWorkout.exercises.length > 0 ? 
              selectedWorkout.exercises.map(exercise => 
                <ExerciseComponent 
                  preview={true} 
                  selectExercise={selectExercise} 
                  key={exercise.id} 
                  exercise={exercise}
                />
              ) : <ListGroup.Item className="fw-bold text-center">No exercise information found.</ListGroup.Item>}
        </ListGroup>          
    </Col>
  )
}

export default ExercisePreview