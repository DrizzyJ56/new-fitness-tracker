import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getActivitiesFromDB, attachActivityToRoutine } from "../api-adapters";

const AddActivity = () =>{
    let selector = ""
    const location = useLocation()
    const navigate = useNavigate()
    const routine = location.state?.data;
    const routineId = routine?.id
    const [activities, setActivities] = useState([])
    const [count, setCount] = useState(0)
    const [duration, setDuration] = useState(0)
    const getActivities = async () =>{
        const data = await getActivitiesFromDB()
        setActivities(data)
    }

    const activityToRoutine = async () =>{
        let activityId = selector.value
        if(activityId && routineId){
            const data = await attachActivityToRoutine(routineId, activityId, count, duration)
            alert("Activity was successfully added to routine")
            navigate("/myroutines")
        }else{
            alert("Activity could not be added to routine")
        }
    }

    useEffect(()=>{
        getActivities()
    },[])

    
    return(
        <div>
            <form onSubmit={(e)=>{
                e.preventDefault()
                selector = document.querySelector("#dropdown option:checked")
                activityToRoutine()
            }}>
                <label>Select Activity to Add:</label>
                <select id="dropdown">{activities.map((activity, idx) => {
                    return(
                        <option key={idx} value={activity.id}>{activity.name}</option>
                    )
                })}</select>
                <label>Count:</label>
                <input required type="number" placeholder="how many times to do the workout" onChange={(e)=>{
                    setCount(e.target.value)
                }} />
                <label>Duration:</label>
                <input required type="number" placeholder="how many seconds to do the workout for" onChange={(e)=>{
                    setDuration(e.target.value)
                }} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddActivity