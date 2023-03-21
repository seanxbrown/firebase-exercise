import { CloseButton, Row, Col, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

const TemplateComponent = ({ preview, template, openDeleteTemplateModal, selectTemplate, openEditBox }) => {
  return (
        <ListGroup.Item action id={template.id} onClick={()=> selectTemplate(template.id)}>
          <Row>
            <Col xs={6} md={9}>{template.name}</Col>
          <Col xs={3} md={1}>
              <Link to={`/firebase-exercise/templates/${template.id}`}>View</Link>
          </Col>
        {!preview && 
          <Col xs={1} md={1}>
            <i className="bi-pencil-fill ms-3" onClick={openEditBox}></i>
          </Col> 
        }
        {!preview && 
          <Col xs={1} md={1} className="gx-5">
            <CloseButton variant="white" onClick={openDeleteTemplateModal}/>
          </Col> 
        }

          </Row>
          
      </ListGroup.Item>
  )
}

export default TemplateComponent