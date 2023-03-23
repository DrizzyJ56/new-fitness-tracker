import React, {useEffect, useState} from "react"
import {RoutinesDatabase} from "../api-adapters"
import {RoutineCard} from "./"

const Routines = (props) => {
    const token = props.token
    const [routines, setRoutines] = useState ([])
    let noArr = []
    let yesArr = []
    let finalArr = []
    const getRoutines = async function(){
        const data = await RoutinesDatabase()
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
    useEffect(() => {
        getRoutines()
    },[])
    return(
        <div id="routines-container">{routines.length ?
            routines.map((routine) => {
                return(
                    <RoutineCard token={token} routine={routine} key={routine.id}/>
                )
            }) : null
        }</div>
    )
}

export default Routines