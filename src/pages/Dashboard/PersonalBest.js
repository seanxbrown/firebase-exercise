import React from 'react'
import { Col, Row } from "react-bootstrap"
import { formatDate } from '../../utils/utils'

const PersonalBest = ({ bestExcercises }) => {
  return (
    <Col xs={12} className="border border-1 border-dark rounded px-5 py-4 text-dark">
      <h2 className="text-center">Personal Bests</h2>
        {bestExcercises && bestExcercises.length > 0 ? bestExcercises.map(bestExercise => {
            return <Row key={bestExercise.id} className="mb-3">
                <Col xs={12} md={2} className="text-center">{formatDate(bestExercise.date)}</Col>
                <Col xs={7} md={2}>{bestExercise.workout}</Col>
                <Col xs={5} md={2}>{bestExercise.name}</Col>
                <Col xs={4} md={2}>{bestExercise.weight}{bestExercise.uom}</Col>
                <Col xs={4} md={2}>Sets: {bestExercise.sets}</Col>
                <Col xs={4} md={2}>Reps: {bestExercise.reps}</Col>
            </Row>
        }
        ) : <h2 className="fw-bold text-center">No personal bests saved</h2>
        }
    </Col>
  )
}

export default PersonalBest