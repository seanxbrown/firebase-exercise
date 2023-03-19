import { useEffect } from 'react'
import { Col } from "react-bootstrap"
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
    <Col xs={12} sm={5} id="workoutDiv" className="border border-1 border-dark rounded p-2">
        <div className="d-flex flex-column" id="workoutColumnHeader">
            <h2 className="text-center">Workouts</h2>
        </div>
        <div className="workoutDataContainer overflow-hidden mb-4">
            {workouts && workouts.length > 0 ? 
                createWorkoutsPreview(workouts).map(workout => 
                    <WorkoutComponent 
                        key={workout.id} 
                        preview={true} 
                        selectWorkout={selectWorkout} 
                        workout={workout}
                    /> 
                ) : <h3 className="fw-bold text-center">No workouts saved.</h3>}
        </div>  
        <Link to={`/firebase-exercise/workouts`}>View all workouts</Link>
    </Col>
  )
}

export default WorkoutsPreview