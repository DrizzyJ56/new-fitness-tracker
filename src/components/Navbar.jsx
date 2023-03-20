import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    
    return(<div id="nav">
            <Link to="/"><h3>Home</h3></Link>
            <Link to="/routines"><h3>Routines</h3></Link>
            <Link to="/activities"><h3>Activities</h3></Link>
            <Link to="/login"><h3>Login</h3></Link>
        </div>
    )
}

export default Navbar