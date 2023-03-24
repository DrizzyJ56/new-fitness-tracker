import React, { useEffect, useState } from "react";
import { ActivitiesDatabase, postActivityToDB } from "../api-adapters";
import { ActivityCard } from "./";

const Activities = (props) => {
  const loggedIn = props.loggedIn;
  const token = props.token;
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [alert, setAlert] = useState("");
  const getActivities = async function () {
    const data = await ActivitiesDatabase();
    setActivities(data);
  };
  const postActivity = async function () {
    if (desc.length < 150) {
      const data = await postActivityToDB(name, desc, token);
      if (data.message) {
        setAlert(`Error: ${data.message}`);
      } else {
        setAlert(`Successfully created Activity ${name}`);
        setName("");
        setDesc("");
      }
    } else {
      setAlert(
        `Error: Maximum description length is 150 characters, you have ${desc.length}.`
      );
    }
  };
  useEffect(() => {
    getActivities();
  }, [token]);
  return (
    <div id="activities-container">
      {loggedIn ? (
        <form
          id="activitiesForm"
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            postActivity();
          }}
        >
          <label>Name:</label>
          <input
            required
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label>Description:</label>
          <input
            required
            type="text"
            placeholder="Max: 150 Characters"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      ) : null}
      {alert.startsWith("Error") ? (
        <div id="alertError">
          <p>{alert}</p>
        </div>
      ) : (
        <div id="alert">
          <p>{alert}</p>
        </div>
      )}
      <div id="activities-card-container">
        {activities.length
          ? activities.map((activity) => {
              return (
                <ActivityCard
                  loggedIn={loggedIn}
                  activity={activity}
                  key={activity.id}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Activities;
