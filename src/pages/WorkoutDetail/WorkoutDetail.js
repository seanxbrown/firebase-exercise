import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { AuthContext } from '../../contexts/AuthContext'
import { ref, onValue, update} from "firebase/database";
import { database } from '../../firebase';
import ExerciseComponent from '../../components/ExerciseComponent';
import { v4 as uuidv4 } from "uuid";
import Exercise from '../../utils/exercise';
import DeletionModal from "../../components/DeletionModal"
import ExerciseModal from "../../components/ExerciseModal"
import Header from "../../components/layouts/Header"
import AlertModal from "../../components/AlertModal";
import { ListGroup } from "react-bootstrap"
import { formatDate } from "../../utils/utils"

const WorkoutDetail = () => {
    const [selectedUserWorkout, setSelectedUserWorkout] = useState({})
    const [allUserWorkouts, setAllUserWorkouts] = useState([])
    const [deletingExercise, setDeletingExercise] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState("")
    const [addingNewExercise, setAddingNewExercise] = useState(false);
    const [editing, setEditing] = useState(false)
    const [bestExercises, setBestExercises] = useState([])
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {workoutid} = useParams();
    const user = useContext(AuthContext)

    function getDataForOneWorkout() {
        const dbRef = ref(database, `${user.uid}`);
    
        try {
            onValue(dbRef, snapshot => {
                if (snapshot.val()) {
                    const {workouts: downloadedWorkouts} = snapshot.val()
                    setAllUserWorkouts([...downloadedWorkouts])

                    const selectedWorkout = downloadedWorkouts.filter(downloadedWorkout => downloadedWorkout.id === workoutid)[0]
                    setSelectedUserWorkout(selectedWorkout)
                    } else {
                        setSelectedUserWorkout(selectedUserWorkout => selectedUserWorkout = {})
                }       
            }
                )
        } catch(error) {
            setAlert(true)
            setAlertMessage(error.message)
            setAlertType("danger")
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
        } catch(e) {
            setAlert(true)
            setAlertMessage(e.message)
            setAlertType("danger")
            }    
    }

    function openExerciseDeletionBox(exercise) {
        //This opens the div to confirm deletion of exercise
        setDeletingExercise(true)
    }
    
    function closeExerciseDeletionBox() {
        setDeletingExercise(false)
    
    }
    function openEditBox() {
        setEditing(true)
        setAddingNewExercise(false)
      }
      
      function closeEditBox() {
        setEditing(false)
      }
      

    function selectExercise(id) {
        setSelectedExercise(id)
    }

    function addExerciseToWorkout(e) {
        e.preventDefault();
        if (selectedUserWorkout === undefined) {
            setAlert(true)
            setAlertMessage("No workout selected")
            setAlertType("danger")
                return
        }
    
        const newWorkouts = [...allUserWorkouts];
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
            if (key.id === selectedUserWorkout.id) {
                if (key.exercises) {
                    key.exercises.push(newExercise);
                } else {
                    key.exercises = [newExercise];
                }
            }
        }
    
        try {
            setIsLoading(true)
            update(ref(database, `${user.uid}`), {"workouts": newWorkouts});
            getDataForOneWorkout();
    
        } catch(e) {
            setAlert(true)
            setAlertMessage(e.message)
            setAlertType("danger")
            } finally {
                setIsLoading(false)
            }
    
        setAddingNewExercise(addingNewExercise => !addingNewExercise)
    }

    //Identify correct workout. Return if no exercises, else remove selected exercise from the selected workout
function removeExerciseFromWorkout(id) {
    const newWorkouts = [...allUserWorkouts];
    for (let workout of newWorkouts) {
        if(selectedUserWorkout.id === workout.id) {
            if (!workout.exercises) {return}
            workout.exercises = workout.exercises.filter(exercise => exercise.id !== id);
        }
    }
    //Also needs to be removed from selected workout, otherwise there will be a display error
    const newSelectedWorkout = {...selectedUserWorkout};
    newSelectedWorkout.exercises = newSelectedWorkout.exercises.filter(exercise => exercise.id !== id);
    setSelectedUserWorkout(newSelectedWorkout);
    
    try {
        setIsLoading(true)
        update(ref(database, `${user.uid}`), {"workouts": newWorkouts});
        getDataForOneWorkout();
    }catch(e) {
        setAlert(true)
        setAlertMessage(e.message)
        setAlertType("danger")
    } finally {
        setIsLoading(false)
    }

    setDeletingExercise(false)
}

function openNewExerciseBox() {
    setAddingNewExercise(true);
}

function closeNewExerciseBox() {
    setAddingNewExercise(false);
    setEditing(false)
}

async function handleExerciseUpdate(e) {
    e.preventDefault()
    if (workoutid === undefined) {
        setAlert(true)
        setAlertMessage("No workout selected")
        setAlertType("danger")
 
        return
    }

    const newExercise = {...selectedExercise};
    newExercise["name"] = document.getElementById("exerciseName").value;
    newExercise["sets"] = document.getElementById("exerciseSets").value;
    newExercise["reps"] = document.getElementById("exerciseReps").value;
    newExercise["uom"] = document.getElementById("exerciseUom").value;
    newExercise["weight"] = document.getElementById("exerciseWeight").value;
    newExercise["target"] = document.getElementById("exercisetTarget").checked;
    newExercise["notes"] = document.getElementById("exerciseNotes").value;

    const newWorkouts = [...allUserWorkouts]
    for (let newWorkout of newWorkouts) {
        if (newWorkout.exercises) {
            newWorkout.exercises = newWorkout.exercises.map(newWorkoutExercise => {
                return newWorkoutExercise.id === newExercise.id ?
                newWorkoutExercise = { ... newExercise}
                : newWorkoutExercise = {...newWorkoutExercise}
            })
        }
    }
    try {
        setIsLoading(true)
        await update(ref(database, `${user.uid}`), {"workouts": newWorkouts});

    } catch(e) {
        setAlert(true)
        setAlertMessage(e.message)
        setAlertType("danger")
    } finally {
        setIsLoading(false)
    }
    setEditing(false)
}

async function addToBestExercises(exercise) {
    const newBestExercises = [...bestExercises]
    
    
    //Compare the id of the new exercise to the ids of existing exercises in the best exercises array
    const doesExerciseExist = newBestExercises.map(existingExercise => existingExercise.id).includes(exercise.id)

    if(doesExerciseExist) {
        setAlert(true)
        setAlertMessage("Exercise already exists as a personal best")
        setAlertType("info")

        return
    } else {

        const newBestExercise = {
            id: exercise.id,
            date: selectedUserWorkout.date,
            workout: selectedUserWorkout.title,
            workoutid: selectedUserWorkout.id,
            name: exercise.name,
            weight: exercise.weight,
            uom: exercise.uom,
            sets: exercise.sets,
            reps: exercise.reps
        }
        newBestExercises.push(newBestExercise)
        
        try {
            update(ref(database, `${user.uid}`), {"bestexercises": newBestExercises});

        } catch(e) {
        setAlert(true)
        setAlertMessage(e.message)
        setAlertType("danger")
        }
        

    }
}

async function removeFromBestExercises(exercise) {
    const newBestExercises = [...bestExercises].filter(bestExercise => bestExercise.id !== exercise.id)

    try {
        update(ref(database, `${user.uid}`), {"bestexercises": newBestExercises});

    } catch(e) {
        setAlert(true)
        setAlertMessage(e.message)
        setAlertType("danger")
    }

}

function closeErrorModal() {
    setAlert(false);
    setAlertMessage("")
    setAlertType("")
  }


    useEffect(() => {

        getDataForOneWorkout()
        downloadBestExercises()

    }, [])

  return (
    <>
        {alert && <AlertModal type={alertType} text={alertMessage} closeModal={closeErrorModal} />}
        <div className="text-dark position-relative">
            <Header 
                title={selectedUserWorkout.title} 
                buttonFunction={openNewExerciseBox} 
                buttonText="Add New Exercise" 
                date={formatDate(selectedUserWorkout.date)}
                isLoading={isLoading}
                />
            {addingNewExercise ?
                <ExerciseModal 
                    isEdit={false} 
                    isTemplate={false} 
                    workoutItem={selectedUserWorkout} 
                    updateFunction={addExerciseToWorkout} 
                    closeModal={closeNewExerciseBox}
                /> : editing ? 
                    <ExerciseModal 
                        isEdit={true} 
                        isTemplate={false} 
                        workoutItem={selectedUserWorkout} 
                        exerciseItem={selectedExercise} 
                        closeModal={closeEditBox} 
                        updateFunction={handleExerciseUpdate}
                    /> : null
            }
            {deletingExercise && 
                <DeletionModal 
                    type="exercise" 
                    item={selectedExercise} 
                    removalFunction={removeExerciseFromWorkout} 
                    closeModal={closeExerciseDeletionBox}
                />
            }
            <ListGroup variant="flush">
                {selectedUserWorkout && selectedUserWorkout.exercises && selectedUserWorkout.exercises.length > 0 ?
                selectedUserWorkout.exercises.map(exercise => 
                    <ExerciseComponent 
                        selectExercise={selectExercise} 
                        openExerciseDeletionBox={openExerciseDeletionBox} 
                        removeExerciseFromWorkout={removeExerciseFromWorkout}
                        handleExerciseUpdate={handleExerciseUpdate} 
                        openEditBox={openEditBox}
                        addToBestExercises={addToBestExercises}
                        removeFromBestExercises={removeFromBestExercises}
                        isBestExercise={bestExercises.map(bestExercise => bestExercise.id).includes(exercise.id)}
                        key={exercise.id} exercise={exercise}
                    />
                ) : <ListGroup.Item className="fw-bold text-center">No exercise information found.</ListGroup.Item>
            }

            </ListGroup>
            
            <div id="workoutDetailLinkContainer" className="d-flex justify-content-around">
                <Link to={`/firebase-exercise/dashboard`}>Return to dashboard</Link>
                <Link to={`/firebase-exercise/workouts`}>Return to workouts overview</Link>
            </div>
        </div>
    </>
  )
}

export default WorkoutDetail