import React from "react";
import { Link } from "react-router-dom";
import { deleteRoutineFromDB, removeActivityFromRoutine } from "../api-adapters";

const RoutineCard = (props) => {
  const token = props.token
  const routine = props.routine;
  return (
    <div>
      <h3>{`Name: ${routine.name}`}</h3>
      <h4>{`Creator:${routine.creatorName}`}</h4>
      <h5>{`Goal: ${routine.goal}`}</h5>
      <h5>{`isPublic: ${routine.isPublic}`}</h5>
      <h5>{`ID: ${routine.id}`}</h5>
      <Link
        to={`/routines/${routine.id}/addActivity`}
        state={{ data: routine }}
      >
        <button>Add Activity</button>
      </Link>
      <Link to={`/routines/${routine.id}/edit`} state={{ data: routine }}>
        <button>Edit</button>
      </Link>
      <button
        onClick={async (e) => {
            e.preventDefault()
          const data = await deleteRoutineFromDB(routine.id, token);
          if(data.message){
            alert(data.message)
          }else{
              alert("Routine has been successfully deleted")
              location.reload()
          }
        }}
      >
        Delete
      </button>
      <div>
        <h5>{`Activities:`}</h5>
        {routine.activities.map((activity, idx) => {
            
          return (
            <div className="Activity" key={idx}>
              <h6>{`Name: ${activity.name}`}</h6>
              <h6>{`Description: ${activity.description}`}</h6>
              <h6>{`Duration: ${activity.duration}`}</h6>
              <h6>{`count: ${activity.count}`}</h6>
              <Link to={`/routineActivity/${activity.routineActivityId}/edit`} state={{data: activity}}><button>Edit</button></Link>
              <button onClick={async (e)=>{
                e.preventDefault()
                const data = await removeActivityFromRoutine(activity.routineActivityId, token)
                if(data.message){
                    alert(data.message)
                }else{
                    alert("Activity has been successfully removed from routine")
                    location.reload()
                }
              }}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoutineCard;
