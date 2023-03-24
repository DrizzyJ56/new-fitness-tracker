import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getUserPublicRoutinesFromDB } from "../api-adapters";
import RoutineCard from "./RoutineCard";

const RoutinesByUsername = (props) => {
  const token = props.token;
  const [routines, setRoutines] = useState([]);
  const [alert, setAlert] = useState("");
  let { userName } = useParams();

  const getRoutines = async () => {
    const data = await getUserPublicRoutinesFromDB(userName);
    if (data.message) {
      setAlert(data.message);
    } else {
      setRoutines(data);
    }
  };

  useEffect(() => {
    getRoutines();
  }, []);

  return (
    <div>
      {alert.startsWith("Error") ? (
        <div id="alertError">
          <p>{alert}</p>
        </div>
      ) : (
        <div id="alert">
          <p>{alert}</p>
        </div>
      )}
      {routines.map((routine, idx) => {
        return <RoutineCard token={token} routine={routine} key={idx} />;
      })}
    </div>
  );
};

export default RoutinesByUsername;
