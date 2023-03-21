import React,{useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateRoutineActivitiesInDB } from "../api-adapters";

const EditRoutineActivity = (props) => {
    const token = props.token
    const location = useLocation()
    const activity = location.state?.data
    const routineActivityID = activity?.routineActivityId
    const navigate = useNavigate()
    const [count, setCount] = useState(activity.count)
    const [duration, setDuration] = useState(activity.duration)

    const updateRoutineActivity = async () =>{
        if(routineActivityID && count && duration){
            const data = await updateRoutineActivitiesInDB(routineActivityID, token, count, duration)
            if(data.message){
                alert(data.message)
            }else{
                alert("You have successfully updated this RoutineActivity")
                navigate("/myroutines")
            }
        }
    }
    

    return(
        <div>
            <h3>{activity.name}</h3>
            <form onSubmit={(e)=>{
                e.preventDefault()
                updateRoutineActivity()
            }}>
                <label>Count:</label>
                <input required type="number" value={count} onChange={(e)=>{
                    setCount(e.target.value)
                }} />
                <label>Duration:</label>
                <input required type="number" value={duration} onChange={(e)=>{
                    setDuration(e.target.value)
                }} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditRoutineActivity