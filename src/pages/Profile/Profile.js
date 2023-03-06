import { useState, useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import {Button, Form} from "react-bootstrap";
import { auth, updateProfile } from "../../firebase";
import { Link } from "react-router-dom"


const Profile = () => {
    const [updating, setUpdating] = useState(false);
    const user = useContext(AuthContext)

    async function updateUserProfile() {
        const newDisplayName = document.getElementById("displayNameInput").value;
        if (typeof newDisplayName === "string") {
          try {
            await updateProfile(auth.currentUser, {displayName: newDisplayName})
            setUpdating(false)
           } catch(e) {
            alert(e)
           }
        }
    }

  return (
    <>
        <h2 className="fw-bold text-center py-3">Profile</h2>
        <div className="border border-3 border-secondary rounded p-5 mb-5 w-75 m-auto" id="profileDiv">
          <div className="d-flex align-items-center border-bottom border-1 border-secondary">
              {updating ? 
              <Form.Control 
                id="displayNameInput" 
                type="text" defaultValue={user.displayName} /> 
                : <p id="userDisplayName"><span className="fw-bold">Display Name: </span>{user.displayName ? `${user.displayName}` 
                : "No Display Name Available"}</p>}
              {!updating && <Button type="button" className="btn btn-primary p-1 ms-4 " onClick={() => setUpdating(true)}>Edit</Button> }
              {updating && <Button type="button" className="btn" onClick={updateUserProfile}>Save</Button>}
          </div>
          <p id="userEmail"><span className="fw-bold">Email Address: </span>{user.email}</p>
        </div>
        
        <Link to={`/firebase-exercise/dashboard`}>Return to dashboard</Link>
    </>
  )
}

export default Profile