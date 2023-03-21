import { useEffect } from 'react'
import { Col, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import TemplateComponent from '../../components/TemplateComponent'

const TemplatesPreview = ({ templates, selectTemplate }) => {

  function createTemplatesPreview(templates) {
    if(Array.isArray(templates)) {
        const previewTemplates = [...templates].splice(0, 10);
        return previewTemplates
    }  
}

useEffect(()=> {
  createTemplatesPreview(templates)

},[templates])

  return (
    <Col xs={12} className="border border-1 border-dark rounded px-5 py-4">
        <h2 className="text-center">Templates</h2>
        <ListGroup variant="flush" className="mb-4">
          {templates && templates.length > 0 ?
            createTemplatesPreview(templates).map(template => 
              <TemplateComponent 
                key={template.id} 
                preview={true} 
                selectTemplate={selectTemplate} 
                template={template}
              /> 
              ) : <h3 className="fw-bold text-center">No templates saved.</h3>}
        </ListGroup>        
        <Link to="/firebase-exercise/templates">View all templates</Link>
    </Col>
  )
}

export default TemplatesPreview