import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const loggedIn = props.loggedIn;
  const setLoggedIn = props.setLoggedIn;
  const setToken = props.setToken;
  const navigate = useNavigate();
  return (
    <div id="nav">
      <Link style={{ color: "#05C3DE", textDecoration: "none" }} to="/">
        <h3>Home</h3>
      </Link>
      <Link style={{ color: "#05C3DE", textDecoration: "none" }} to="/routines">
        <h3>Routines</h3>
      </Link>
      {loggedIn ? (
        <Link
          style={{ color: "#05C3DE", textDecoration: "none" }}
          to="/myroutines"
        >
          <h3>My Routines</h3>
        </Link>
      ) : null}
      <Link
        style={{ color: "#05C3DE", textDecoration: "none" }}
        to="/activities"
      >
        <h3>Activities</h3>
      </Link>
      {!loggedIn ? (
        <Link style={{ color: "#05C3DE", textDecoration: "none" }} to="/login">
          <h3>Register/Login</h3>
        </Link>
      ) : (
        <Link style={{ color: "#05C3DE", textDecoration: "none" }} to="/">
          <h3
            onClick={() => {
              localStorage.removeItem("token");
              setLoggedIn(false);
              setToken("");
              navigate("/");
              location.reload();
            }}
          >
            Logout
          </h3>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
