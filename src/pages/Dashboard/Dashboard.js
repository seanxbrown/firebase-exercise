import React, { useState, useEffect, useContext } from 'react';
import { Row } from "react-bootstrap";
import AddNewWorkout from "../../components/AddNewWorkout";
import { v4 as uuidv4 } from "uuid";
import AddNewExercise from "../../components/AddNewExercise";
import { database, set, ref, onValue, update } from "../../firebase";
import Workout from "../../components/Workout";
import Exercise from '../../components/Exercise';
import { AuthContext } from '../../contexts/AuthContext';
import WorkoutsPreview from './WorkoutsPreview';
import ExercisePreview from './ExercisePreview';
import TemplatesPreview from './TemplatesPreview';

const Dashboard = () => {
    const [selectedWorkout, setSelectedWorkout] = useState();
    const [workouts, setWorkouts] = useState([]);
    const [creatingNewWorkout, setCreatingNewWorkout] = useState(false);
    const [addingNewExercise, setAddingNewExercise] = useState(false);
    const [deletingWorkout, setDeletingWorkout] = useState(false)
    const [deletingExercise, setDeletingExercise] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState("");
    const [templates, setTemplates] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [deletingTemplate, setDeletingTemplate] = useState(false)
    const [editingTemplate, setEditingTemplate] = useState(false);
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

function toggleNewWorkoutStatus(e) {
    e.preventDefault();
    setCreatingNewWorkout(creatingNewWorkout => !creatingNewWorkout);
}

function toggleNewExerciseStatus() {
    setAddingNewExercise(addingNewExercise => !addingNewExercise);
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

function handleWorkoutSubmit(e) {
    e.preventDefault();
    const templateInput = document.getElementById("templateInput").value
    templateInput === "noTemplate" ? addWorkout() : createWorkoutFromTemplate(templateInput)
    
}

function openWorkoutDeletionBox(workout) {
    //This opens the div to confirm deletion of workout
    setDeletingWorkout(true)
}

function closeWorkoutDeletionBox() {
    setDeletingWorkout(false)

}

function openExerciseDeletionBox(exercise) {
    //This opens the div to confirm deletion of exercise
    setDeletingExercise(true)
}

function closeExerciseDeletionBox() {
    setDeletingExercise(false)

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

function addExerciseToWorkout(e) {
    e.preventDefault();
    if (selectedWorkout === undefined) {
        alert("No workout selected"); 
        return
    }

    const newWorkouts = [...workouts];
    const exerciseID = uuidv4();
    const exerciseName = document.getElementById("exerciseName").value;
    const exerciseSets = document.getElementById("exerciseSets").value;
    const exerciseReps = document.getElementById("exerciseReps").value;
    const exerciseWeight = document.getElementById("exerciseWeight").value;
    const exerciseUnit = document.getElementById("exerciseUom").value;
    const exercisetTarget = document.getElementById("exercisetTarget").checked;
    const exerciseNotes = document.getElementById("exerciseNotes").value;
    const newExercise = new Exercise(exerciseID, exerciseName, exerciseSets, exerciseReps,exerciseWeight, exerciseUnit, exercisetTarget, exerciseNotes)

    for (let key of newWorkouts) {
        if (key.id === selectedWorkout.id) {
            if (key.exercises) {
                key.exercises.push(newExercise);
            } else {
                key.exercises = [newExercise];
            }
        }
    }

    try {
        update(ref(database, `${user.uid}`), {"workouts": newWorkouts});
        getWorkoutData();

    } catch(error) {
        alert(error);
    }

    setAddingNewExercise(addingNewExercise => !addingNewExercise)
}

//Identify correct workout. Return if no exercises, else remove selected exercise from the selected workout
function removeExerciseFromWorkout(selectedExercise) {
    const newWorkouts = [...workouts];
    for (let workout of newWorkouts) {
        if(selectedWorkout.id === workout.id) {
            if (!workout.exercises) {return}
            workout.exercises = workout.exercises.filter(exercise => exercise.id !== selectedExercise.id);
        }
    }
    //Also needs to be removed from selected workout, otherwise there will be a display error
    const newSelectedWorkout = {...selectedWorkout};
    newSelectedWorkout.exercises = newSelectedWorkout.exercises.filter(exercise => exercise.id !== selectedExercise.id);
    setSelectedWorkout(newSelectedWorkout);
    
    try {
        update(ref(database, `${user.uid}`), {"workouts": newWorkouts});
        getWorkoutData();

    }catch(error) {
        alert(error);
    }

    setDeletingExercise(false)
}

function selectExercise(id) {
    setSelectedExercise(id)
}

async function createWorkoutFromTemplate(id) {
    const newWorkouts = [...workouts];
    const selectedTemplate = [...templates].filter(template => template.id ===id)[0]
    const workoutTitle = document.getElementById("workoutTitle").value || new Date(Date.now()).toString();
    const workoutDate = document.getElementById("workoutDate").value;
    const workoutID = uuidv4();
    const newWorkout = new Workout(workoutID, workoutTitle, workoutDate);
    newWorkout.exercises = []

    //loop through template exercises and push them to workout
    for (let templateExercise of selectedTemplate.exercises) {
        templateExercise.weight = "";
        templateExercise.uom = "kg"
        newWorkout.exercises.push({...templateExercise})
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

function openDeleteTemplateModal() {
    setDeletingTemplate(true)
}

function selectTemplate(selectedID) {
    const selection = [...templates].filter(template => selectedID == template.id);
    setSelectedTemplate(selection[0]);

    const templateComponents = [...document.getElementsByClassName("workoutData")]
    for (let component of templateComponents) {
        if (component.id == selectedID) {
            component.classList.add("selected")
        } else {
            if (component.classList.contains("selected")) {
                component.classList.remove("selected")
            }
        }
    } 

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

useEffect(() => {

    getWorkoutData()
    getTemplateData()
    
},[])

  return (
    <>
    <h2 className="py-3 text-center fw-bold">Dashboard</h2>
    <Row id="dashboard" className="p-4 position-relative">
        {creatingNewWorkout && <AddNewWorkout templates={templates} handleWorkoutSubmit={handleWorkoutSubmit} toggleNewWorkoutStatus={toggleNewWorkoutStatus} /> }
        {addingNewExercise && <AddNewExercise selectedWorkout={selectedWorkout} addExerciseToWorkout={addExerciseToWorkout} toggleNewExerciseStatus={toggleNewExerciseStatus}/> }
        <WorkoutsPreview toggleNewWorkoutStatus={toggleNewWorkoutStatus} workouts={workouts} openWorkoutDeletionBox={openWorkoutDeletionBox} selectWorkout={selectWorkout}/>
        <ExercisePreview toggleNewExerciseStatus={toggleNewExerciseStatus} selectedWorkout={selectedWorkout} selectExercise={selectExercise} openExerciseDeletionBox={openExerciseDeletionBox} removeExerciseFromWorkout={removeExerciseFromWorkout} />
        <TemplatesPreview templates={templates} openDeleteTemplateModal={openDeleteTemplateModal} selectTemplate={selectTemplate}/>
    </Row>
    </>
    
  )
}

export default Dashboard