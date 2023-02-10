import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { database, set, ref, onValue, update } from "../firebase";


const AllWorkouts = () => {
  const [workouts, setWorkouts] = useState([])

  const {id} = useParams()

  function getWorkoutData() {
    const dbRef = ref(database, `${id}`);
    
    try {
        onValue(dbRef, snapshot => {
            if (snapshot.val()) {
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

useEffect(() => {
  getWorkoutData()
}, [])




   
  return (
    
    <div className="text-dark">Workouts div</div>
  )
}

export default AllWorkouts