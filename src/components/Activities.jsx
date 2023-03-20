import React, {useEffect, useState} from "react"
import {ActivitiesDatabase} from "../api-adapters"
import {ActivityCard} from "./"

const Activities = () => {
    const [activities, setActivities] = useState ([])
    const getActivities = async function(){
        const data = await ActivitiesDatabase()
        setActivities(data)
    }
    useEffect(() => {
        getActivities()
    },[])
    return(
        <div>{activities.length ?
            activities.map((activity) => {
                console.log(activity)
                return(
                    <ActivityCard activity={activity} key={activity.id}/>
                )
            }) : null
        }</div>
    )
}

export default Activities