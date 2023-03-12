import React from 'react'
import { Form, Button, Modal } from "react-bootstrap"


const WorkoutModal = ({ item = {}, isEdit, isTemplate, closeModal, updateFunction, templates = []}) => {
    function handleSubmit(e) {
        e.preventDefault()
        updateFunction()
    }

  return (
    <Modal show={true} onHide={closeModal} >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">
          {isEdit ? "Edit " : "Add "} {isTemplate ? "Template" : "Workout"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control id="workoutTitle" type="text" list="datalistOptions" placeholder="Select or enter a workout" maxLength="30" defaultValue={isEdit && item.title || isEdit && item.name || ""}/>
                <datalist id="datalistOptions">
                  <option value="Upper Body" />
                  <option value="Lower Body" />
                  <option value="Full Body" />
                  <option value="Push" />
                  <option value="Pull" />
                  <option value="Legs" />
                  <option value="Abs" />
                  <option value="Chest" />
                  <option value="Back" />
                  <option value="Arms" />
                </datalist>
            </Form.Group>
            {!isTemplate && !isEdit && <Form.Group>
              <Form.Label>Create from Template</Form.Label>
              <Form.Select id="templateInput">
                <option value="noTemplate">--</option>
                {templates && templates.map(template => <option key={template.id} value={template.id}>{template.name}</option>)}
              </Form.Select>
            </Form.Group> }
            {!isTemplate && <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control required id="workoutDate" type="date" defaultValue={isEdit && item && item.date || ""}/>
            </Form.Group> }
            <Button type="submit" className="btn btn-primary rounded-pill mt-3">Create Workout or Template</Button>
        </Form>
        </Modal.Body>
    </Modal>
  )
}

export default WorkoutModal