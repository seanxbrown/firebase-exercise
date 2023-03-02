import { Form, Button, Container, CloseButton } from "react-bootstrap"

const AddNewTemplate = ({ closeNewTemplateBox, createNewTemplate }) => {

    function handleSubmit(e) {
        e.preventDefault()
        createNewTemplate()
    }
   
  return (
    <Container >
        <Form className="border border-2 border-dark px-2" onSubmit={handleSubmit} >
            <CloseButton onClick={closeNewTemplateBox}/>
            <Form.Group>
                <Form.Label>Template Name</Form.Label>
                <Form.Control required type="text" id="templateName" placeholder="Push Day Hypertrophy" maxLength="30"></Form.Control>
            </Form.Group>   
            <Button type="submit">Create Template</Button>
        </Form>
        
    </Container>
  )
}

export default AddNewTemplate