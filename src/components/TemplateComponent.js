import React from 'react'
import { CloseButton, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const TemplateComponent = ({ template, deleteTemplate, openDeleteTemplateModal, selectTemplate, openEditBox }) => {
  return (
        <Row className=" workoutData align-items-center" id={template.id} onClick={()=> selectTemplate(template.id)}>
        <Col xs={5}>{template.name}</Col>
        <Col xs={1}>
          <Link to={`/firebase-exercise/templates/${template.id}`}>View</Link>
        </Col>
        <Col xs={1}>
          <i className="bi-pencil-fill ms-3" onClick={openEditBox}></i>
        </Col>
        <Col xs={1} className="gx-5">
          <CloseButton variant="white" onClick={openDeleteTemplateModal}/>
        </Col>
      </Row>
  )
}

export default TemplateComponent