import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteRoutineFromDB,
  removeActivityFromRoutine,
  getLoggedInUserFromDB,
} from "../api-adapters";

const RoutineCard = (props) => {
  const token = props.token;
  const routine = props.routine;
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState("")
  const whoIsLoggedIn = async () => {
    if (token) {
      const data = await getLoggedInUserFromDB(token);
      setUser(data);
    }
  };

  useEffect(() => {
    whoIsLoggedIn();
  }, [token]);
  return (
    <div id="routineCard-container" className="Card">
      <div id="routineCard-routines">
        <h3>{`Name: ${routine.name}`}</h3>
        <Link to={`/routines/${routine.creatorName}/public`} style={{textDecoration: "none", color: "blue"}}><h4>{`Creator: ${routine.creatorName}`}</h4></Link>
        <h5>{`Goal: ${routine.goal}`}</h5>
        <h5>{`isPublic: ${routine.isPublic}`}</h5>
        <h5>{`ID: ${routine.id}`}</h5>
        {user && user.username === routine.creatorName ? (
          <Link
            to={`/routines/${routine.id}/addActivity`}
            state={{ data: routine }}
          >
            <button>Add Activity</button>
          </Link>
        ) : null}
        {user && user.username === routine.creatorName ? (
          <Link to={`/routines/${routine.id}/edit`} state={{ data: routine }}>
            <button>Edit</button>
          </Link>
        ) : null}
        {user && user.username === routine.creatorName ? (
          <button
            onClick={async (e) => {
              e.preventDefault();
              const data = await deleteRoutineFromDB(routine.id, token);
              if (data.message) {
                setAlert(data.message);
              } else {
                setAlert(`${routine.name} has been successfully deleted`);
                location.reload();
              }
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
      <div id="routineCard-activities">
        <h5>{`Activities:`}</h5>
        {routine.activities.map((activity, idx) => {
          return (
            <div className="Activity" key={idx}>
              <Link to={`/activity/${activity.id}/routines`} style={{textDecoration: "none", color: "black"}}><h6>{`Name: ${activity.name}`}</h6></Link>
              <h6>{`Description: ${activity.description}`}</h6>
              <h6>{`Duration: ${activity.duration}`}</h6>
              <h6>{`count: ${activity.count}`}</h6>
              {user && user.username === routine.creatorName ? (
                <Link
                  to={`/routineActivity/${activity.routineActivityId}/edit`}
                  state={{ data: activity }}
                >
                  <button>Edit</button>
                </Link>
              ) : null}
              {user && user.username === routine.creatorName ? (
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    const data = await removeActivityFromRoutine(
                      activity.routineActivityId,
                      token
                    );
                    if (data.message) {
                      setAlert(data.message);
                    } else {
                      setAlert("Activity has been successfully removed from routine");
                      location.reload();
                    }
                  }}
                >
                  Delete
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
      {alert.startsWith('Error') ? <div id="alertError"><p>{alert}</p></div> : <div id="alert"><p>{alert}</p></div> }
    </div>
  );
};

export default RoutineCard;
