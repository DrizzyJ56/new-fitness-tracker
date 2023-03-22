import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getActivitiesFromDB, attachActivityToRoutine } from "../api-adapters";

const AddActivity = () =>{
    let selector = ""
    const location = useLocation()
    const navigate = useNavigate()
    const routine = location.state?.data;
    const routineId = routine?.id
    let actArr = []
    let badArr = []
    let newArr = []
    const [activities, setActivities] = useState([])
    const [count, setCount] = useState(0)
    const [duration, setDuration] = useState(0)
    const [alert, setAlert] = useState("")
    const getActivities = async () =>{
        const data = await getActivitiesFromDB()
        for(let i=0; i<routine.activities.length; i++){
            badArr.push(routine.activities[i].name)
        }
        for(let k=0; k<data.length; k++){
            newArr.push(data[k])
        }
        newArr.filter((name,idx)=>{
            // console.log(newArr[idx].name)
            if(!badArr.includes(newArr[idx].name)){
                actArr.push(newArr[idx])
            }
        })
        setActivities(actArr)
        actArr=[]
        badArr=[]
    }

    const activityToRoutine = async () =>{
        let activityId = selector.value
        if(activityId && routineId){
            const data = await attachActivityToRoutine(routineId, activityId, count, duration)
            if(data.message){
                setAlert(data.message)
            }else{
                setAlert("Activity was successfully added to routine")
                navigate("/myroutines")
            }
        }
    }

    useEffect(()=>{
        getActivities()
    },[])

    
    return(
        <div>
            <form id="addActivityForm" className="form" onSubmit={(e)=>{
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
            {alert.startsWith('Error') ? <div id="alertError"><p>{alert}</p></div> : <div id="alert"><p>{alert}</p></div> }
        </div>
    )
}

export default AddActivity