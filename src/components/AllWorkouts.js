import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext";
import { database, set, ref, onValue, update } from "../firebase";
import WorkoutComponent from "./WorkoutComponent";
import DeleteWorkout from "./DeleteWorkout";
import { v4 as uuidv4 } from "uuid";
import Workout from "./Workout";
import AddNewWorkout from "./AddNewWorkout";
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const AllWorkouts = () => {
  const [workouts, setWorkouts] = useState([])
  const [deletingWorkout, setDeletingWorkout] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState();
  const [creatingNewWorkout, setCreatingNewWorkout] = useState(false);

  const user = useContext(AuthContext)

  function selectWorkout(selectedID) {
    const selection = [...workouts].filter(workout => selectedID == workout.id);
    setSelectedWorkout(selection[0]);

    const workoutComponents = [...document.getElementsByClassName("workoutData")]
    for (let component of workoutComponents) {
        if (component.id == selectedID) {
            component.classList.add("selected")
        } else {
            if (component.classList.contains("selected")) {
                component.classList.remove("selected")
            }
        }
    } 

}

function openWorkoutDeletionBox(workout) {
  //This opens the div to confirm deletion of workout
  setDeletingWorkout(true)
}

function closeWorkoutDeletionBox(workout) {
  //This opens the div to confirm deletion of workout
  setDeletingWorkout(false)
}

function addWorkout() {
  const newWorkouts = [...workouts];
  const workoutTitle = document.getElementById("workoutTitle").value || new Date(Date.now()).toString();
  const workoutDate = document.getElementById("workoutDate").value;
  const workoutID = uuidv4();
  const newWorkout = new Workout(workoutID, workoutTitle, workoutDate);
  newWorkouts.push(newWorkout);

  try {
      set(ref(database, `${user.uid}/workouts/`), newWorkouts);
      getWorkoutData();

  } catch(error) {
      alert(error);
  }
  setCreatingNewWorkout(creatingNewWorkout => !creatingNewWorkout);
}


function removeWorkoutFromList(id) {
  const newWorkouts = [...workouts].filter(workout => id !== workout.id);

  try {
      update(ref(database, `${user.uid}`), {"workouts": newWorkouts});
      getWorkoutData();
      setDeletingWorkout(false)
  } catch(error) {
      alert(error);
  }
}

function handleWorkoutSubmit(e) {
  e.preventDefault();
  addWorkout();
}

function toggleNewWorkoutStatus(e) {
  e.preventDefault();
  setCreatingNewWorkout(creatingNewWorkout => !creatingNewWorkout);
}

  function getWorkoutData() {
    const dbRef = ref(database, `${user.uid}`);
    
    try {
        onValue(dbRef, snapshot => {
            if (snapshot.val()) {
                setWorkouts(workouts => workouts = snapshot.val().workouts.sort((a, b) => b.date > a.date))
                } else {
                setWorkouts(workouts => workouts = [])
            }       
        }
            )
    } catch(error) {
        alert(error)
    }
}


useEffect(() => {

    if(user) {getWorkoutData()}

},[user])
   
  return (

      <div className="workoutDataContainer overflow-hidden position-relative">
        <h2 className="text-center fw-bold">All workouts</h2>
        {deletingWorkout && <DeleteWorkout workout={selectedWorkout} closeWorkoutDeletionBox={closeWorkoutDeletionBox} removeWorkoutFromList={removeWorkoutFromList}/>}

        <Button type="button" onClick={toggleNewWorkoutStatus} className="btn btn-primary align-self-center mb-3 rounded-pill">Add New Workout</Button>

        {creatingNewWorkout && <AddNewWorkout handleWorkoutSubmit={handleWorkoutSubmit} toggleNewWorkoutStatus={toggleNewWorkoutStatus} /> }


            {workouts && workouts.length > 0 ? workouts.map(workout => <WorkoutComponent key={workout.id} openWorkoutDeletionBox={openWorkoutDeletionBox} selectWorkout={selectWorkout} workout={workout}/> ) : <h3 className="fw-bold text-center">No workouts saved.</h3>}
            <Link to={`/firebase-exercise/dashboard`} >Return to dashboard </Link>
        </div>
  
  )
}

export default AllWorkouts