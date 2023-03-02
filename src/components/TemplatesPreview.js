import React from 'react'
import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const TemplatesPreview = () => {
  return (
    <Col xs={12} className="text-dark">
        <h2>Templates Preview</h2>
        <Link to="/firebase-exercise/templates">View all templates</Link>
    </Col>
  )
}

export default TemplatesPreview