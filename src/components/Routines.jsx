import React, {useEffect, useState} from "react"
import {RoutinesDatabase} from "../api-adapters"
import {RoutineCard} from "./"

const Routines = () => {
    const [routines, setRoutines] = useState ([])
    const getRoutines = async function(){
        const data = await RoutinesDatabase()
        setRoutines(data)
    }
    useEffect(() => {
        getRoutines()
    },[])
    return(
        <div>{routines.length ?
            routines.map((routine) => {
                return(
                    <RoutineCard routine={routine} key={routine.id}/>
                )
            }) : null
        }</div>
    )
}

export default Routines