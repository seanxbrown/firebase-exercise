import React from 'react'
import { Button, Container, Row, Col } from "react-bootstrap"

const Header = ({ title, buttonFunction, buttonText, date = null, isLoading}) => {
  return (
    <Container className="py-4">
      <Row>
        <Col xs={6} md={4}><h2 className="text-center fw-bold"> {title} </h2></Col>
        <Col xs={6} md={4}><p className="lead text-center fw-bold">{date}</p></Col>
        <Col xs={12} md={4} className="text-center">
          <Button type="button" onClick={buttonFunction} className="btn btn-primary rounded-pill w-100">
            { isLoading ? "Loading..." : buttonText}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Header