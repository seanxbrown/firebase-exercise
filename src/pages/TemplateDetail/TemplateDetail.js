import { useState, useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { onValue, ref, database, update } from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from "react-bootstrap"
import AddTemplateExercise from "../../components/AddTemplateExercise"
import { v4 as uuidv4 } from "uuid";
import TemplateExercise from '../../components/TemplateExercise';
import TemplateExerciseComponent from "../../components/TemplateExerciseComponent"
import EditTemplateExercise from "../../components/EditTemplateExercise"
import DeletionModal from "../../components/DeletionModal"

const TemplateDetail = () => {
    const {templateid: templateID} = useParams();
    const [allUserTemplates, setAllUserTemplates] = useState({})
    const [selectedUserTemplate, setSelectedUserTemplate] = useState({})
    const [addingNewExercise, setAddingNewExercise] = useState(false);
    const [selectedTemplateExercise, setSelectedTemplateExercise] = useState({})
    const [deletingExercise, setDeletingExercise] = useState(false);
    const [editing, setEditing] = useState(false)
    const user = useContext(AuthContext)

    function getDataForOneTemplate() {
      const dbRef = ref(database, `${user.uid}`);
  
      try {
          onValue(dbRef, snapshot => {
              if (snapshot.val()) {
                  const {templates: downloadedTemplates} = snapshot.val()
                  setAllUserTemplates([...downloadedTemplates])

                  const selectedTemplate = downloadedTemplates.filter(downloadedTemplate => downloadedTemplate.id === templateID)[0]
                  setSelectedUserTemplate(selectedTemplate)
                  } else {
                    setSelectedUserTemplate(selectedTemplate => selectedTemplate = {})
              }       
          }
              )
      } catch(error) {
          alert(error)
      }    
  }

  function openNewExerciseBox() {
    setAddingNewExercise(true)
  }

  function closeNewExerciseBox() {
    setAddingNewExercise(false)
  }

  function addExerciseToTemplate(e) {
    e.preventDefault();
    if (selectedUserTemplate === undefined) {
        alert("No workout selected"); 
        return
    }

    const newTemplates = [...allUserTemplates];
    const exerciseID = uuidv4();
    const exerciseName = document.getElementById("exerciseName").value;
    const exerciseSets = document.getElementById("exerciseSets").value;
    const exerciseReps = document.getElementById("exerciseReps").value;
    const exerciseNotes = document.getElementById("exerciseNotes").value;
    const newExercise = new TemplateExercise(exerciseID, exerciseName, exerciseSets, exerciseReps, exerciseNotes)

    for (let key of newTemplates) {
        if (key.id === selectedUserTemplate.id) {
            if (key.exercises) {
                key.exercises.push(newExercise);
            } else {
                key.exercises = [newExercise];
            }
        }
    }

    try {
        update(ref(database, `${user.uid}`), {"templates": newTemplates});
        
        getDataForOneTemplate();

    } catch(error) {
        alert(error);
    }

    setAddingNewExercise(addingNewExercise => !addingNewExercise)
}

function removeExerciseFromTemplate(id) {
  const newTemplates = [...allUserTemplates];
  for (let template of newTemplates) {
      if(selectedUserTemplate.id === template.id) {
          if (!template.exercises) {return}
          template.exercises = template.exercises.filter(exercise => exercise.id !== id);
      }
  }
  //Also needs to be removed from selected workout, otherwise there will be a display error
  const newSelectedTemplate = {...selectedUserTemplate};
  newSelectedTemplate.exercises = newSelectedTemplate.exercises.filter(exercise => exercise.id !== id);
  setSelectedUserTemplate(newSelectedTemplate);
  
  try {
      update(ref(database, `${user.uid}`), {"templates": newTemplates});
      getDataForOneTemplate();

  }catch(error) {
      alert(error);
  }

  closeTemplateExerciseDeletionBox()

}

async function handleTemplateExerciseUpdate(e) {
  e.preventDefault()
  if (templateID === undefined) {
      alert("No workout selected"); 
      return
  }

  const newExercise = {...selectedTemplateExercise};
  newExercise["name"] = document.getElementById("exerciseName").value;
  newExercise["sets"] = document.getElementById("exerciseSets").value;
  newExercise["reps"] = document.getElementById("exerciseReps").value;
  newExercise["notes"] = document.getElementById("exerciseNotes").value;

  const newTemplates = [...allUserTemplates]
  for (let newTemplate of newTemplates) {
      if (newTemplate.exercises) {
        newTemplate.exercises = newTemplate.exercises.map(newTemplateExercise => {
              return newTemplateExercise.id === newExercise.id ?
              newTemplateExercise = { ... newExercise}
              : newTemplateExercise = {...newTemplateExercise}
          })
      }
  }

  try {
      await update(ref(database, `${user.uid}`), {"templates": newTemplates});

  } catch(error) {
      alert(error);
  }

  setEditing(false)
}


function selectTemplateExercise(id) {
  setSelectedTemplateExercise(id)
}

function openTemplateExerciseDeletionBox(exercise) {
  setDeletingExercise(true)
}

function closeTemplateExerciseDeletionBox() {
  setDeletingExercise(false)

}

function openEditBox() {
  setEditing(true)
}

function closeEditBox() {
  setEditing(false)
}


  useEffect(() => {
    getDataForOneTemplate()

  }, [])

  return (
    <div className="text-dark">
      {addingNewExercise && <AddTemplateExercise addExerciseToTemplate={addExerciseToTemplate} closeNewExerciseBox={closeNewExerciseBox} selectedUserTemplate={selectedUserTemplate} /> }
      {deletingExercise && <DeletionModal type="exercise" item={selectedTemplateExercise} removalFunction={removeExerciseFromTemplate} closeModal={closeTemplateExerciseDeletionBox}/>}
      {editing && <EditTemplateExercise selectedTemplateExercise={selectedTemplateExercise} closeEditBox={closeEditBox} handleTemplateExerciseUpdate={handleTemplateExerciseUpdate}/>}

      <h2>{selectedUserTemplate.name}</h2>
      <Button type="button" onClick={openNewExerciseBox}>Add Exercise</Button>
      {selectedUserTemplate && selectedUserTemplate.exercises && selectedUserTemplate.exercises.length > 0 ? 
            selectedUserTemplate.exercises.map(exercise => 
            <TemplateExerciseComponent 
                key={exercise.id}
                openEditBox={openEditBox}
                openTemplateExerciseDeletionBox={openTemplateExerciseDeletionBox}
                selectTemplateExercise={selectTemplateExercise}
                removeExerciseFromTemplate={removeExerciseFromTemplate}
                exercise={exercise}/>) 
                : <h3 className="fw-bold text-center">No exercise information found.</h3>
        }
      <Link to="/firebase-exercise/templates">Return to templates</Link>

    </div>
  )
}

export default TemplateDetail