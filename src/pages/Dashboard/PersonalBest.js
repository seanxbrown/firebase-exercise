import { useState } from 'react'
import { Col, Row, Form, ListGroup } from "react-bootstrap"
import { formatDate } from '../../utils/utils'


const PersonalBest = ({ bestExcercises }) => {
  const [search, setSearch] = useState("")

  function handlehange(e) {

    setSearch(e.target.value.toLowerCase())
    
  }


  return (
    <Col xs={12} className="border border-1 border-dark rounded px-5 py-4 text-dark">
      <h2 className="text-center">Personal Bests</h2>
      <Form.Control type="search" placeholder="Search for an exercise (e.g. bench press)" className="mb-4" onChange={handlehange}/>
      <ListGroup variant="flush">
      {bestExcercises && bestExcercises.length > 0 ? bestExcercises.filter(bestExercise => 
          bestExercise.name.toLowerCase().includes(search)
          )
        .map(bestExercise => {
            return <ListGroup.Item action>
                    <Row key={bestExercise.id} className="">
                      <Col xs={12} md={2} className="text-center">{formatDate(bestExercise.date)}</Col>
                      <Col xs={7} md={2}>{bestExercise.workout}</Col>
                      <Col xs={5} md={2}>{bestExercise.name}</Col>
                      <Col xs={4} md={2}>{bestExercise.weight}{bestExercise.uom}</Col>
                      <Col xs={4} md={2}>Sets: {bestExercise.sets}</Col>
                      <Col xs={4} md={2}>Reps: {bestExercise.reps}</Col>
                    </Row>
                  </ListGroup.Item>
            }
          ) : <ListGroup.Item className="fw-bold text-center">No personal bests saved</ListGroup.Item>
        }
        
      </ListGroup>
        
    </Col>
  )
}

export default PersonalBest