import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const loggedIn = props.loggedIn
    const setLoggedIn = props.setLoggedIn
    const setToken = props.setToken
    const navigate = useNavigate()
    return(<div id="nav">
            <Link to="/"><h3>Home</h3></Link>
            <Link to="/routines"><h3>Routines</h3></Link>
            <Link to="/activities"><h3>Activities</h3></Link>
            {!loggedIn ? <Link to="/login"><h3>Register/Login</h3></Link> : <Link to="/"><h3 onClick={()=>{
                localStorage.removeItem("token")
                setLoggedIn(false)
                setToken("")
                alert("You have been successfully logged out")
                navigate("/")
            }}>Logout</h3></Link>}
        </div>
    )
}

export default Navbar