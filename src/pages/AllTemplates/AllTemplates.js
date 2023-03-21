import { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom"
import { set, ref, database, onValue, update } from "../../firebase"
import { AuthContext } from '../../contexts/AuthContext'
import { v4 as uuidv4 } from "uuid";
import TemplateComponent from '../../components/TemplateComponent'
import DeletionModal from "../../components/DeletionModal"
import WorkoutModal from "../../components/WorkoutModal"
import Header from '../../components/layouts/Header'
import { ListGroup } from "react-bootstrap"


const AllTemplates = () => {
    const [creatingNewTemplate, setCreatingNewTemplate] = useState(false)
    const [templates, setTemplates] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [deletingTemplate, setDeletingTemplate] = useState(false)
    const [editingTemplate, setEditingTemplate] = useState(false);
    const user = useContext(AuthContext)

    function openNewTemplateBox() {
        setCreatingNewTemplate(true)
    }

    function closeNewTemplateBox() {
        setCreatingNewTemplate(false)
    }
    
    async function createNewTemplate() {
        const newTemplateWorkout = {
            id: uuidv4(),
            name: document.getElementById("workoutTitle").value,
            date: new Date(Date.now()).toString()
        }
        const newTemplates = [...templates]
        newTemplates.push(newTemplateWorkout)

        try {
            await set(ref(database, `${user.uid}/templates/`), newTemplates);
        } catch(e) {
            alert(e)
        }
        closeNewTemplateBox()
    }

    async function getTemplatesFromDatabase() {
        const dbRef = ref(database, `${user.uid}`);

        try {
            onValue(dbRef, snapshot => {
                const {templates: templatesFromDatabase} = snapshot.val()
                if (templatesFromDatabase && typeof templatesFromDatabase === "object") {
                    templatesFromDatabase.sort((a, b) => b.date > a.date)
                    setTemplates([...templatesFromDatabase])
                } else {
                    setTemplates([])
                }
               
            }
                )

        } catch(error) {
            alert(error)
        }

    }

    async function deleteTemplate(id) {
        const newTemplates = [...templates].filter(template => template.id !==id)

        try {
            update(ref(database, `${user.uid}`), {"templates": newTemplates});
        } catch(error) {
            alert(error);
        }
        closeDeleteTemplateModal()

    }

    function openDeleteTemplateModal() {
        setDeletingTemplate(true)
    }

    
    function closeDeleteTemplateModal() {
        setDeletingTemplate(false)
    }

    function selectTemplate(selectedID) {
        const selection = [...templates].filter(template => selectedID == template.id);

        if (typeof selection === "object") { setSelectedTemplate(selection[0]); }
        
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

    
function openEditBox() {
    setEditingTemplate(true)
  }
  
  function closeEditBox() {
    setEditingTemplate(false)
  }

  function handleTemplateUpdate() {
    
    const newItem = {...selectedTemplate}
    newItem["name"] = document.querySelector("#workoutTitle").value
  
    updateTemplate(newItem)
  
  }
  
  async function updateTemplate(item){

    const newTemplates = templates.map(template => {
        return template.id === item.id ?
        template = {...item}
        : template = {...template}
        }
    )
  
     try {
        await update(ref(database, `${user.uid}`), {"templates": newTemplates});
        } catch(e) {
            alert(e)
        }
        setEditingTemplate(false)
  }
  
    useEffect(() => {
        getTemplatesFromDatabase()
    }, [])
    
  return (
    <div>
        <Header 
            title="My templates" 
            buttonFunction={openNewTemplateBox} 
            buttonText="Create New Template" 
        />
        {deletingTemplate && 
            <DeletionModal 
                type="template" 
                item={selectedTemplate} 
                closeModal={closeDeleteTemplateModal} 
                removalFunction={deleteTemplate}
            />
        }
        {editingTemplate ? 
            <WorkoutModal 
                isEdit={true} 
                isTemplate={true} 
                item={selectedTemplate} 
                closeModal={closeEditBox} 
                updateFunction={handleTemplateUpdate} 
            />
            :  creatingNewTemplate ? 
                <WorkoutModal 
                    isEdit={false} 
                    isTemplate={true} 
                    closeModal={closeNewTemplateBox} 
                    updateFunction={createNewTemplate}
                />
                : null 
        }
        <ListGroup variant="flush">
            {templates && templates.map((template, key) => 
                <TemplateComponent 
                    key={key} 
                    template={template} 
                    openEditBox={openEditBox} 
                    selectTemplate={selectTemplate} 
                    openDeleteTemplateModal={openDeleteTemplateModal} 
                    deleteTemplate={deleteTemplate}
                />
                )
            }

        </ListGroup>
        
        <Link to="/firebase-exercise/dashboard">Return to dashboard</Link>
    </div>
  )
}

export default AllTemplates