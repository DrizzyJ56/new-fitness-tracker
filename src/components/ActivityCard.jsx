import React from "react";
import { Link } from "react-router-dom";

const ActivityCard = (props) => {
  const activity = props.activity;
  const loggedIn = props.loggedIn
  return (
    <div id="ActivityCard" className="Card">
      <Link
        to={`/activity/${activity.id}/routines`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <h6>{`Name: ${activity.name}`}</h6>
      </Link>
      <h6>{`Description: ${activity.description}`}</h6>
      <h6>{`ID: ${activity.id}`}</h6>
      { loggedIn ? <Link to={`/activity/${activity.id}/edit`} state={{ data: activity }}><button>Edit</button></Link> : null}
    </div>
  );
};

export default ActivityCard;
