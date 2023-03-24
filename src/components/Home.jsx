import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLoggedInUserFromDB } from "../api-adapters";

const Home = (props) => {
  const token = props.token;
  const [user, setUser] = useState({});
  const checkForUser = async () => {
    if (token) {
      const data = await getLoggedInUserFromDB(token);
      setUser(data);
    }
  };

  useEffect(() => {
    checkForUser();
  }, [token]);
  return (
    <div id="homepage-container">
      <div id="homePage">
        <h1>Fitness Tracker</h1>
        <p className="test" style={{ fontSize: "18px" }}>
          Welcome to Fitness Tracker's website developed by Joel Blevins and
          Sven Scharpen
        </p>
        {user?.username ? (
          <p style={{ fontSize: "34px" }}>{`Hello, ${user.username}`}</p>
        ) : (
          <Link to="/register" style={{ color: "white" }}>
            <p>If you have not registered yet, please click me!</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
