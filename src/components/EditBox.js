import React from 'react'
import { Form, Button, CloseButton, Container } from "react-bootstrap"

const EditBox = ({itemBeingEdited, closeEditBox, handleWorkoutUpdate, handleExerciseUpdate}) => {

  const { type } = itemBeingEdited;
  const { item } = itemBeingEdited
  return (
    type === "workout" ?
    <Container className="border border-1 border-secondary p-5 bg-light" id="addWorkoutDiv">
        <CloseButton className="float-end" onClick={closeEditBox}/>
        <Form onSubmit={handleWorkoutUpdate}>
            <Form.Group>
                <Form.Label>Editing {item && item.title}</Form.Label>
                <Form.Control id="workoutTitle" type="text" list="datalistOptions" placeholder="Select or enter a workout" maxLength="30" defaultValue={item.title}/>
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
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control required id="workoutDate" type="date" defaultValue={item.date}/>
            </Form.Group>
            <Button type="submit" className="btn btn-primary rounded-pill mt-3">Update Workout</Button>
        </Form>
    </Container>
  :

  <Container className="border border-1 border-secondary p-5 bg-light" id="addExerciseDiv">
        <h2>Editing {item && item.name}</h2>
        <CloseButton className="float-end" onClick={closeEditBox}/>
        <Form onSubmit={handleExerciseUpdate}>
            <Form.Group>
                <Form.Label>Exercise</Form.Label>
                <Form.Control required id="exerciseName" type="text" placeholder="Bench Press" maxLength="30" defaultValue={item.name}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Weight (kg)</Form.Label>
                <Form.Control required id="exerciseWeight" type="number" min="0" max="999" defaultValue={item.weight}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Sets</Form.Label>
                <Form.Control required id="exerciseSets" type="number" min="1" max="99" defaultValue={item.sets}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Reps</Form.Label>
                <Form.Control required id="exerciseReps" type="number" min="0" max="99" defaultValue={item.reps}/>
            </Form.Group>
            
            <Form.Group>
                <Form.Check id="exercisetTarget" type="checkbox" label="Target achieved?" maxLength="30" defaultValue={item.checked}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" id="exerciseNotes" defaultValue={item.notes}/>
            </Form.Group>
            <Button type="submit" className="btn btn-primary rounded-pill mt-4">Update Exercise</Button>
        </Form>
    </Container>
    
  )
}

export default EditBox