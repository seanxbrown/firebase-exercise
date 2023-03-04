import { useEffect } from 'react'
import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import TemplateComponent from '../../components/TemplateComponent'

const TemplatesPreview = ({ templates, openDeleteTemplateModa, selectTemplate }) => {

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
    <Col xs={12} className="text-dark">
        <h2>Templates Preview</h2>
        {templates && templates.length > 0 ?
                createTemplatesPreview(templates).map(template => <TemplateComponent key={template.id} preview={true} openDeleteTemplateModa={openDeleteTemplateModa} selectTemplate={selectTemplate} template={template}/> ) : <h3 className="fw-bold text-center">No templates saved.</h3>}
        <Link to="/firebase-exercise/templates">View all templates</Link>
    </Col>
  )
}

export default TemplatesPreview