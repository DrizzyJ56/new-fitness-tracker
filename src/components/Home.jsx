import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div id="homepage-container">
      <div id="homePage">
        <h1>Fitness Tracker</h1>
        <p className="test">
          Welcome to Fitness Tracker's website developed by Joel Blevins and
          Sven Scharpen
        </p>
        <Link to="/register" style={{color:"white"}}>
          <p>If you have not registered yet, please click me!</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
