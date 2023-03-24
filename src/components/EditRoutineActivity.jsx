import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateRoutineActivitiesInDB } from "../api-adapters";

const EditRoutineActivity = (props) => {
  const token = props.token;
  const location = useLocation();
  const activity = location.state?.data;
  const routineActivityID = activity?.routineActivityId;
  const navigate = useNavigate();
  const [count, setCount] = useState(activity.count);
  const [duration, setDuration] = useState(activity.duration);
  const [alert, setAlert] = useState("");

  const updateRoutineActivity = async () => {
    if (routineActivityID && count && duration) {
      const data = await updateRoutineActivitiesInDB(
        routineActivityID,
        token,
        count,
        duration
      );
      if (data.message) {
        setAlert(`Error: ${data.message}`);
      } else {
        setAlert("You have successfully updated this RoutineActivity");
        navigate("/myroutines");
      }
    }
  };

  return (
    <div id="editRoutineActivity-container">
      <form
        id="editRoutineActivityForm"
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          updateRoutineActivity();
        }}
      >
        <h3>{activity.name}</h3>
        <label>Count:</label>
        <input
          required
          type="number"
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
        />
        <label>Duration:</label>
        <input
          required
          type="number"
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
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

export default EditRoutineActivity;
