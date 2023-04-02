import { useEffect } from 'react'
import { Col, ListGroup } from "react-bootstrap"
import WorkoutComponent from '../../components/WorkoutComponent';
import { Link } from "react-router-dom"

const WorkoutsPreview = ({ workouts, selectWorkout }) => {

    function createWorkoutsPreview(workouts) {
        if(Array.isArray(workouts)) {
            const previewWorkouts = [...workouts].splice(0, 10);
            return previewWorkouts
        }  
    }

    useEffect(()=> {
        createWorkoutsPreview(workouts)
    
    },[workouts])
    
  return (
    <Col xs={12} sm={5} id="workoutDiv" className="rounded p-2 border-end border-1 border-secondary">
        <div className="d-flex flex-column" id="workoutColumnHeader">
            <h2 className="text-center">Workouts</h2>
        </div>
        <ListGroup variant="flush" className="mb-4">
            {workouts && workouts.length > 0 ? 
                createWorkoutsPreview(workouts).map(workout => 
                    <WorkoutComponent 
                        key={workout.id} 
                        preview={true} 
                        selectWorkout={selectWorkout} 
                        workout={workout}
                    /> 
                ) : <ListGroup.Item className="fw-bold text-center">No workouts saved.</ListGroup.Item>}
        </ListGroup>  
        <Link to={`/firebase-exercise/workouts`}>View all workouts</Link>
    </Col>
  )
}

export default WorkoutsPreview