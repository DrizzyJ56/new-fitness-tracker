import React, {useEffect, useState} from "react";
import { getLoggedInUserFromDB, getUserRoutinesFromDB, postRoutineToDB} from "../api-adapters";
import {RoutineCard} from "./";
import { useNavigate, Link } from "react-router-dom";

const MyRoutines = (props) => {
    const token = props.token
    const [user, setUser] = useState({})
    const [routines, setRoutines] = useState([])
    const [name, setName] = useState("")
    const [goal, setGoal] = useState("")
    const [alert, setAlert] = useState("")
    const [isPublic, setIsPublic] = useState(true)
    let noArr = []
    let yesArr = []
    let finalArr = []
    const getUser = async () => {
        if(token){
            const data = await getLoggedInUserFromDB(token)
            setUser(data)
        }
    }

     const getRoutines = async () => {
        if(user.username){
            const data = await getUserRoutinesFromDB(user.username, token)
        await data.filter((routine)=>{
            if(routine.activities.length){
                yesArr.push(routine)
            }else{
                noArr.push(routine)
            }
        })
        for(let i =0; i<yesArr.length; i++){
            finalArr.push(yesArr[i])
        }
        for(let k=0; k<noArr.length; k++){
            finalArr.push(noArr[k])
        }
        setRoutines(finalArr)
        }
    }

    const postRoutine = async () => {
        if(name.length && goal.length){
            const data = await postRoutineToDB(token, name, goal, isPublic)
            if(data.goal){
                setAlert(`You have made ${name} successfully`)
            }else if(data.message){
                setAlert(`Error: ${data.message}`)
            }
        }
    }

    useEffect(()=>{
        getUser()
    },[token])
    useEffect(()=>{
        getRoutines()
    },[user])

    return(
        <div id="myRoutinesContainer">
            <div id="myRoutinesFormContainer" >
                <form id="routinesForm" className="form" onSubmit={async (e)=>{
                    e.preventDefault()
                    await postRoutine()
                    getRoutines()
                }}>
                    <h3>Make a new routine!</h3>
                    <label>Name</label>
                    <input required type="text" onChange={(e)=>{
                        setName(e.target.value)
                    }} />
                    <label>Goal</label>
                    <input required type="text" onChange={(e)=>{
                        setGoal(e.target.value)
                    }} />
                    <label>isPublic:</label>
                    <input type="checkbox" checked={isPublic} onChange={()=>{
                        setIsPublic(!isPublic)
                    }} />
                    <button type="submit">Submit</button>
                </form>
            { alert.startsWith('Error') ? <div id="alertError"><p>{alert}</p></div> : <div id="alert"><p>{alert}</p></div> }
            </div>
            <div id="myroutines-routines">
                {routines ?
                routines.map((routine, idx) => {
                    return(
                        <div id="myRoutinesCard" key={`000${idx}`}>
                            <RoutineCard token={token} routine={routine} />
                            {/* <Link to={`/routines/${routine.id}/addActivity`} state={{data: routine}}><button>Add Activity</button></Link>
                            <Link to={`/routines/${routine.id}/edit`} state={{data: routine}}><button>Edit</button></Link>
                            <button onClick={async ()=>{
                                await deleteRoutineFromDB(routine.id, token)
                                getRoutines()
                            }}>Delete</button> */}
                        </div>
                    )
                }) : null
                }
            </div>
        </div>
    )
}

export default MyRoutines