import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import {Navbar, Home, Register, Login, Routines, Activities } from "./"
const App = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token"))
    return(
        <div>
            <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} setToken={setToken} />
            <Routes>
                <Route exact path="/" element={<Home token={token} setLoggedIn={setLoggedIn}/>} />
                <Route exact path="/register" element={<Register setLoggedIn={setLoggedIn} />} />
                <Route exact path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
                <Route exact path="/routines" element={<Routines />} />
                <Route exact path="/activities" element={<Activities />} />
            </Routes>
        </div>
    )
}

export default App