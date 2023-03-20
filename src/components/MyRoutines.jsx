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
    const [isPublic, setIsPublic] = useState(true)
    const navigate = useNavigate()
    const getUser = async () => {
        if(token){
            const data = await getLoggedInUserFromDB(token)
            setUser(data)
        }
    }

    const getRoutines = async () => {
        if(user.username){
            const data = await getUserRoutinesFromDB(user.username, token)
            setRoutines(data)
        }
    }

    const postRoutine = async () => {
        if(name.length && goal.length){
            const data = await postRoutineToDB(token, name, goal, isPublic)
            if(data.goal){
                alert(`You have made ${name} successfully`)
                navigate("/routines")
            }else{
                alert(`A routine named ${name} already exists`)
            }
        }
    }

    useEffect(()=>{
        getUser()
    },[])
    useEffect(()=>{
        getRoutines()
    },[user])

    return(
        <div>
            <div id="myroutines-form">
                <h3>Make a new routine!</h3>
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    postRoutine()
                }}>
                    <label>Name</label>
                    <input required type="text" onChange={(e)=>{
                        setName(e.target.value)
                    }} />
                    <label>Goal</label>
                    <input required type="text" onChange={(e)=>{
                        setGoal(e.target.value)
                    }} />
                    <label>isPublic:</label>
                    <input type="checkbox" value={isPublic} onChange={()=>{
                        setIsPublic(!isPublic)
                    }} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div id="myroutines-routines">
                {routines ?
                routines.map((routine, idx) => {
                    return(
                        <div key={`000${idx}`}>
                            <RoutineCard routine={routine} />
                            <Link to={`/routines/${routine.id}/edit`} state={{data: routine}}><p>Edit</p></Link>
                        </div>
                    )
                }) : null
                }
            </div>
        </div>
    )
}

export default MyRoutines