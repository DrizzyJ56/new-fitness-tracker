import React from "react"

const ActivityCard = (props) => {
    const activity = props.activity
    return(
        <div className="Activity">
            <h6>{`Name: ${activity.name}`}</h6>
            <h6>{`Description: ${activity.description}`}</h6>
            <h6>{`ID: ${activity.id}`}</h6>
        </div>
    )
}

export default ActivityCard