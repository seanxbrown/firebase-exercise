import { Link, useNavigate } from "react-router-dom"
import { signInAnonymously, auth } from "../../firebase"

const Home = () => {
  const navigate = useNavigate()

  async function signInAsGuest() {

    try {
      await signInAnonymously(auth)
      navigate("/firebase-exercise/dashboard")

    } catch(e) {
      alert(e)
    }

  }
  return (
    <div className="vh-100 d-flex flex-column justify-content-center">
      <h2 className="text-center fw-bold ">The exercise tracker application</h2>
      <div id="homeLinkContainer" className="d-flex justify-content-center align-items-center h-25">
        <Link to="/firebase-exercise/signup" className="btn btn-lg homeLinkButton mx-1">Sign Up</Link>
        <Link to="/firebase-exercise/login" className="btn btn-lg homeLinkButton mx-1">Log in</Link>
      </div>
      <div className="text-center">
        <a onClick={signInAsGuest} className="link-primary" id="guestSignInLink">Continue as guest</a>
      </div>
    </div>
  )
}

export default Home