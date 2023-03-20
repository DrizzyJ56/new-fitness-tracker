import React from "react"

const RoutineCard = (props) => {
    const routine = props.routine
    return(
        <div>
            <h3>{`Name: ${routine.name}`}</h3>
            <h4>{`Creator:${routine.creatorName}`}</h4>
            <h5>{`Goal: ${routine.goal}`}</h5>
            <h5>{`ID: ${routine.id}`}</h5>
            <div>
                <h5>{`Activities:`}</h5>
                    {routine.activities.map((activity, idx) => {
                        return(
                            <div className="Activity">
                                <h6>{`Name: ${activity.name}`}</h6>
                                <h6>{`Description: ${activity.description}`}</h6>
                                <h6>{`Duration: ${activity.duration}`}</h6>
                                <h6>{`count: ${activity.count}`}</h6>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default RoutineCard