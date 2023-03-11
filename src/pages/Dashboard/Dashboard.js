import React, { useState, useEffect, useContext } from 'react';
import { Row } from "react-bootstrap";
import { database, set, ref, onValue, update } from "../../firebase";
import { AuthContext } from '../../contexts/AuthContext';
import WorkoutsPreview from './WorkoutsPreview';
import ExercisePreview from './ExercisePreview';
import TemplatesPreview from './TemplatesPreview';
import PersonalBest from './PersonalBest';

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


function openWorkoutDeletionBox(workout) {
    setDeletingWorkout(true)
}

function closeWorkoutDeletionBox() {
    setDeletingWorkout(false)

}

function openExerciseDeletionBox(exercise) {
    setDeletingExercise(true)
}

function closeExerciseDeletionBox() {
    setDeletingExercise(false)

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
        <WorkoutsPreview toggleNewWorkoutStatus={toggleNewWorkoutStatus} workouts={workouts} openWorkoutDeletionBox={openWorkoutDeletionBox} selectWorkout={selectWorkout}/>
        <ExercisePreview toggleNewExerciseStatus={toggleNewExerciseStatus} selectedWorkout={selectedWorkout} selectExercise={selectExercise} openExerciseDeletionBox={openExerciseDeletionBox} removeExerciseFromWorkout={removeExerciseFromWorkout} />
    </Row>
    <Row className="p-4 position-relative">
        <TemplatesPreview templates={templates} openDeleteTemplateModal={openDeleteTemplateModal} selectTemplate={selectTemplate}/>
    </Row>
    <Row className="p-4 position-relative">
        <PersonalBest />
    </Row>
    </>
    
  )
}

export default Dashboard