import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { editRoutineInDB } from "../api-adapters";

const EditRoutine = (props) => {
  const token = props.token;
  const location = useLocation();
  const routine = location.state?.data;
  const navigate = useNavigate();
  const [name, setName] = useState(routine.name);
  const [goal, setGoal] = useState(routine.goal);
  const editIt = async () => {
    if (name.length && goal.length) {
      const data = await editRoutineInDB(routine.id, token, name, goal);
      alert(`${routine.name} has been successfully edited`);
      navigate("/routines");
    } else {
      alert("Your routine must have a valid name and a valid goal");
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        editIt();
      }}
    >
      <label>Name:</label>
      <input
        required
        value={name}
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label>Goal:</label>
      <input
        required
        type="text"
        value={goal}
        onChange={(e) => {
          setGoal(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditRoutine;
