import {useState} from 'react'
import {Button, Form} from "react-bootstrap";
import { auth, updateProfile } from "../firebase"


const Profile = ({ user }) => {
    const [updating, setUpdating] = useState(false);

    async function updateUserProfile() {
        const newDisplayName = document.getElementById("displayNameInput").value;
       try {
        await updateProfile(auth.currentUser, {displayName: newDisplayName})
        setUpdating(false)
        console.log(user)
       } catch(e) {
        console.log(e)
       }

    }

  return (
    <>
        <h2>Profile</h2>
        <div>
            {updating ? <Form.Control id="displayNameInput" type="text" defaultValue={user.displayName} /> : <p id="userDisplayName">{user.displayName ? `Display Name: ${user.displayName}` : "No Display Name Available"}</p>}
            <Button type="button" className="btn btn-primary" onClick={() => setUpdating(true)}>Edit</Button>
            {updating && <Button type="button" className="btn" onClick={updateUserProfile}>Save</Button>}
        </div>
        <p id="userEmail">Email Address: {user.email}</p>
    </>
  )
}

export default Profile