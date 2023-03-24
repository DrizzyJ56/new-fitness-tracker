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
  const [alert, setAlert] = useState("");
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
        <h3>
          {`Name: `}
          <span className="test">{routine.name}</span>
        </h3>
        <Link
          to={`/routines/${routine.creatorName}/public`}
          style={{ textDecoration: "none", color: "green" }}
        >
          <h4>
            {`Creator: `} <span>{routine.creatorName}</span>
          </h4>
        </Link>
        <h5>
          {`Goal: `} <span className="test">{routine.goal}</span>
        </h5>
        <h5>
          {`isPublic: ${routine.isPublic}`}
          <span className="test"></span>
        </h5>
        <h5>
          {`ID: `}
          <span className="test">{routine.id}</span>
        </h5>
        {user && user.username === routine.creatorName ? (
          <Link
            to={`/routines/${routine.id}/addActivity`}
            state={{ data: routine }}
          >
            <button className="routineCardButton">Add Activity</button>
          </Link>
        ) : null}
        {user && user.username === routine.creatorName ? (
          <Link to={`/routines/${routine.id}/edit`} state={{ data: routine }}>
            <button className="routineCardButton">Edit</button>
          </Link>
        ) : null}
        {user && user.username === routine.creatorName ? (
          <button
            className="routineCardButton"
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
      <h5>{`Activities:`}</h5>
      <div id="routineCard-activities">
        {routine.activities.map((activity, idx) => {
          return (
            <div className="Activity" id="activitiesRoutineCard" key={idx}>
              <Link
                to={`/activity/${activity.id}/routines`}
                style={{ textDecoration: "none", color: "green" }}
              >
                <h6>
                  {`Name: `}
                  <span>{activity.name}</span>
                </h6>
              </Link>
              <h6 className="title">
                {`Description:`}{" "}
                <span className="test">{activity.description}</span>
              </h6>
              <h6 className="title">
                {`Duration: `} <span className="test">{activity.duration}</span>
              </h6>
              <h6 className="title">
                {`count: `}
                <span className="test">{activity.count}</span>
              </h6>
              {user && user.username === routine.creatorName ? (
                <div id="buttons">
                  <Link
                    to={`/routineActivity/${activity.routineActivityId}/edit`}
                    state={{ data: activity }}
                  >
                    <button>Edit</button>
                  </Link>

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
                        setAlert(
                          "Activity has been successfully removed from routine"
                        );
                        location.reload();
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {alert.startsWith("Error") ? (
        <div id="alertError">
          <p>{alert}</p>
        </div>
      ) : (
        <div id="alert">
          <p>{alert}</p>
        </div>
      )}
    </div>
  );
};

export default RoutineCard;
