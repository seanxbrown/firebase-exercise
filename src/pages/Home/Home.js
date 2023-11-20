import { Link, useNavigate } from "react-router-dom"
import { signInAnonymously, auth } from "../../firebase"
import AlertModal from "../../components/AlertModal"
import { useState, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { AuthContext } from "../../contexts/AuthContext"

const Home = () => {
  const navigate = useNavigate()
   const [error, setError] = useState(false)
   const [errorMessage, setErrorMessage] = useState("")
   const user = useContext(AuthContext)

  async function signInAsGuest() {

    try {
      await signInAnonymously(auth)
      navigate("/firebase-exercise/dashboard")

    } catch(e) {
      setError(true)
      setErrorMessage(e.message)
    }

  }

  function closeErrorModal() {
    setError(false);
    setErrorMessage("")
  }


  return (
    <>
    {error && <AlertModal 
      type="danger" 
      text={errorMessage} 
      closeModal={closeErrorModal} 
      />
    }
      <div className="vh-100 d-flex flex-column justify-content-center">
        <h2 className="text-center fw-bold ">The exercise tracker application</h2>
        <Container id="homeLinkContainer">
          <Row className="align-items-center justify-content-center m-auto gy-5">
            <Col xs={12} md={6}><Link to="/firebase-exercise/signup" className="btn btn-lg homeLinkButton w-100">Sign up</Link></Col>
            <Col xs={12} md={6}><Link to="/firebase-exercise/login" className="btn btn-lg homeLinkButton w-100">Log in</Link></Col>
            { !user && <Col xs={12} md={6} className="text-center"><a onClick={signInAsGuest} className="link-primary" id="guestSignInLink">Continue as guest</a></Col> }
            { user && <Col xs={12} md={6} className="text-center"><Link to="/firebase-exercise/dashboard">Go to Dashboard</Link></Col> }
          </Row>
       </Container>
      </div>
    </>
  )
}

export default Home