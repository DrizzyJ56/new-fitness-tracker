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
  const [alert, setAlert] = useState("")
  const editIt = async () => {
    if (name.length && goal.length) {
      const data = await editRoutineInDB(routine.id, token, name, goal);
      if(data.message){
        setAlert(data.message)
      }else{
        setAlert(`${routine.name} has been successfully edited`);
        navigate("/routines");
      }
    }
  };
  return (
    <div>
      <form id="editRoutineForm" className="form"
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
      { alert.startsWith('Error') ? <div id="alertError"><p>{alert}</p></div> : <div id="alert"><p>{alert}</p></div> }
    </div>
  );
};

export default EditRoutine;
