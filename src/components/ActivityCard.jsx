import React from "react";
import { Link } from "react-router-dom";

const ActivityCard = (props) => {
  const activity = props.activity;
  const loggedIn = props.loggedIn
  return (
    <div id="ActivityCard" className="Card">
      <Link
        to={`/activity/${activity.id}/routines`}
        style={{ textDecoration: "none", color: "green" }}
      >
        <h6>{`Name: `}<span>{activity.name}</span></h6>
      </Link>
      <h6>{`Description: `}<span className="test">{activity.description}</span></h6>
      <h6>{`ID: `}<span className="test">{activity.id}</span></h6>
      { loggedIn ? <Link to={`/activity/${activity.id}/edit`} state={{ data: activity }}><button>Edit</button></Link> : null}
    </div>
  );
};

export default ActivityCard;
