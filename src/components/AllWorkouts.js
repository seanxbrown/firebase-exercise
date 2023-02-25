import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext";
import { database, set, ref, onValue, update } from "../firebase";
import WorkoutComponent from "./WorkoutComponent";
import DeleteWorkout from "./DeleteWorkout";
import { v4 as uuidv4 } from "uuid";
import Workout from "./Workout";
import AddNewWorkout from "./AddNewWorkout";
import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom";
import EditWorkout from "./EditWorkout";
import { formatDate } from "../utils/utils"

const AllWorkouts = () => {
  const [workouts, setWorkouts] = useState([])
  const [deletingWorkout, setDeletingWorkout] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState();
  const [creatingNewWorkout, setCreatingNewWorkout] = useState(false);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("")

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

function openEditBox() {
  setEditing(true)
}

function closeEditBox() {
  setEditing(false)
}

function handleWorkoutUpdate(e) {
  e.preventDefault()
  const newItem = {...selectedWorkout}
  newItem["date"] = document.querySelector("#workoutDate").value
  newItem["title"] = document.querySelector("#workoutTitle").value

  updateWorkout(newItem)

}

async function updateWorkout(item){

  const newWorkouts = workouts.map(newWorkout => {
      return newWorkout.id === item.id ?
      newWorkout = {...item}
      : newWorkout = {...newWorkout}
      }
  )

   try {
      await update(ref(database, `${user.uid}`), {"workouts": newWorkouts});
      } catch(e) {
          alert(e)
      }
      setEditing(false)
}

function searchChangeHandler(e) {
  setSearch(search => e.target.value)
}


useEffect(() => {

    if(user) {getWorkoutData()}

},[user])
   
  return (

      <div className="workoutDataContainer overflow-hidden position-relative">
        <div className="d-flex gap-4">
          <h2 className="text-center fw-bold py-5">All workouts</h2>
          <Button type="button" onClick={toggleNewWorkoutStatus} className="btn btn-primary align-self-center mb-3 rounded-pill">Add New Workout</Button>    
        </div>
        <Form.Control type="text" id="workoutSearchBar" placeholder="Search" onChange={searchChangeHandler}/>
        {deletingWorkout && <DeleteWorkout workout={selectedWorkout} closeWorkoutDeletionBox={closeWorkoutDeletionBox} removeWorkoutFromList={removeWorkoutFromList}/>}
        {creatingNewWorkout && <AddNewWorkout handleWorkoutSubmit={handleWorkoutSubmit} toggleNewWorkoutStatus={toggleNewWorkoutStatus} /> }
        {editing && <EditWorkout selectedWorkout={selectedWorkout} closeEditBox={closeEditBox} updateWorkout={updateWorkout} handleWorkoutUpdate={handleWorkoutUpdate} />}
        {workouts && workouts.length > 0 ? workouts.filter(workout => {
          if (search === "") {
            return workout
          } else {
            return workout.title.includes(search) || workout.date.includes(search)
          }
        })
        .map(workout => 
          <WorkoutComponent 
            key={workout.id} 
            openEditBox={openEditBox} 
            openWorkoutDeletionBox={openWorkoutDeletionBox} 
            selectWorkout={selectWorkout} 
            workout={workout}/> ) 
            : <h3 className="fw-bold text-center">No workouts saved.</h3>}
        <Link to={`/firebase-exercise/dashboard`} >Return to dashboard </Link>
      </div>
  
  )
}

export default AllWorkouts