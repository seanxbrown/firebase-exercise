import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext";
import { database, set, ref, onValue, update } from "../../firebase";
import WorkoutComponent from "../../components/WorkoutComponent";
import { v4 as uuidv4 } from "uuid";
import Workout from "../../utils/workout";
import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom";
import DeletionModal from "../../components/DeletionModal"
import WorkoutModal from "../../components/WorkoutModal"
import Header from "../../components/layouts/Header"

const AllWorkouts = () => {
  const [workouts, setWorkouts] = useState([])
  const [deletingWorkout, setDeletingWorkout] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState();
  const [creatingNewWorkout, setCreatingNewWorkout] = useState(false);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [templates, setTemplates] = useState([])
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

function handleWorkoutSubmit() {
  const templateInput = document.getElementById("templateInput").value
  templateInput === "noTemplate" ? addWorkout() : createWorkoutFromTemplate(templateInput)
  
}

function toggleNewWorkoutStatus(e) {
  e.preventDefault();
  setCreatingNewWorkout(creatingNewWorkout => !creatingNewWorkout);
}

  function getWorkoutData() {
    const dbRef = ref(database, `${user.uid}`);
    
    try {
        onValue(dbRef, snapshot => {
            if (snapshot.val() && snapshot.val().workouts) {
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

function handleWorkoutUpdate() {
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
  setSearch(e.target.value.toLowerCase())
}

function getTemplateData() {
  const dbRef = ref(database, `${user.uid}`);
  
  try {
      onValue(dbRef, snapshot => {
          if (snapshot.val()) {
              setTemplates(snapshot.val().templates)
              } else {
              setTemplates([])
          }       
      }
          )
  } catch(error) {
      alert(error)
  }
}

async function createWorkoutFromTemplate(id) {
  const newWorkouts = [...workouts];
  const selectedTemplate = [...templates].filter(template => template.id ===id)[0]


  const workoutTitle = document.getElementById("workoutTitle").value || new Date(Date.now()).toString();
  const workoutDate = document.getElementById("workoutDate").value;
  const workoutID = uuidv4();
  const newWorkout = new Workout(workoutID, workoutTitle, workoutDate);
  newWorkout.exercises = []

  if (selectedTemplate.exercises) {
     //loop through template exercises and push them to workout
    for (let templateExercise of selectedTemplate.exercises) {
      templateExercise.weight = "";
      templateExercise.uom = "kg"
      newWorkout.exercises.push({...templateExercise})
  }

  }
 
  newWorkouts.push(newWorkout);

  try {
      set(ref(database, `${user.uid}/workouts/`), newWorkouts);
      getWorkoutData();

  } catch(error) {
      alert(error);
  }
  setCreatingNewWorkout(creatingNewWorkout => !creatingNewWorkout);

}


useEffect(() => {

    if(user) {getWorkoutData()}

},[user])

useEffect(() => {

  getTemplateData()
  
},[])
   
  return (

      <div className="workoutDataContainer overflow-hidden position-relative">
        <Header title="My workouts" buttonFunction={toggleNewWorkoutStatus} buttonText="Add New Workout" />
        <Form.Control type="text" className="mb-4" id="workoutSearchBar" placeholder="Search" onChange={searchChangeHandler}/>
        {deletingWorkout && <DeletionModal type="workout" item={selectedWorkout} closeModal={closeWorkoutDeletionBox} removalFunction={removeWorkoutFromList}/>}
        {creatingNewWorkout ?  <WorkoutModal isEdit={false} isTemplate={false} templates={templates} updateFunction={handleWorkoutSubmit} closeModal={toggleNewWorkoutStatus} /> 
        : editing ? <WorkoutModal isEdit={true} isTemplate={false} item={selectedWorkout} closeModal={closeEditBox} updateFunction={handleWorkoutUpdate} /> 
        : null
        }
        {workouts && workouts.length > 0 ? workouts.filter(workout => {
          if (search === "") {
            return workout
          } else {
            return workout.title.toLowerCase().includes(search) || workout.date.includes(search)
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