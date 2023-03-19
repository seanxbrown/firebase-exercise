import React, { useState, useEffect, useContext } from 'react';
import { Row } from "react-bootstrap";
import { database, ref, onValue } from "../../firebase";
import { AuthContext } from '../../contexts/AuthContext';
import WorkoutsPreview from './WorkoutsPreview';
import ExercisePreview from './ExercisePreview';
import TemplatesPreview from './TemplatesPreview';
import PersonalBest from './PersonalBest';

const Dashboard = () => {
    const [selectedWorkout, setSelectedWorkout] = useState();
    const [workouts, setWorkouts] = useState([]);
    const [templates, setTemplates] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [bestExercises, setBestExercises] = useState([])

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

function downloadBestExercises() {
    const dbRef = ref(database, `${user.uid}`);

    try {
        onValue(dbRef, snapshot => {
            const {bestexercises: downloadedBestExercises} = snapshot.val()
            if (downloadedBestExercises) {
                setBestExercises([...downloadedBestExercises])
                } else {
                    setBestExercises([])
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
    downloadBestExercises()
    
},[])

  return (
    <>
    <h2 className="py-3 text-center fw-bold">Dashboard</h2>
    <Row id="dashboard" className="p-4 position-relative">
        <WorkoutsPreview workouts={workouts} selectWorkout={selectWorkout}/>
        <ExercisePreview selectedWorkout={selectedWorkout} />
    </Row>
    <Row className="p-4 position-relative">
        <TemplatesPreview templates={templates} selectTemplate={selectTemplate}/>
    </Row>
    <Row className="p-4 position-relative">
        <PersonalBest bestExcercises={bestExercises}/>
    </Row>
    </>
    
  )
}

export default Dashboard