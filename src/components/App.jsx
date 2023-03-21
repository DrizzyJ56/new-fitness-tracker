import React, {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import {Navbar, Home, Register, Login, Routines, Activities, MyRoutines, EditRoutine, AddActivity, EditRoutineActivity } from "./"
const App = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [token, setToken] = useState("")

    useEffect(()=>{
        const storageToken = localStorage.getItem("token")
        if(storageToken){
            setToken(storageToken)
            setLoggedIn(true)
        }
    }, [])
    return(
        <div>
            <Navbar setLoggedIn={setLoggedIn} token={token} loggedIn={loggedIn} setToken={setToken} />
            <Routes>
                <Route exact path="/" element={<Home token={token} setLoggedIn={setLoggedIn}/>} />
                <Route exact path="/register" element={<Register setLoggedIn={setLoggedIn} />} />
                <Route exact path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
                <Route exact path="/routines" element={<Routines />} />
                <Route exact path="/activities" element={<Activities />} />
                <Route exact path="/myroutines" element={<MyRoutines token={token} />} />
                <Route exact path="/routines/:id/edit" element={<EditRoutine token={token} />}/>
                <Route exact path="/routines/:id/addActivity" element={<AddActivity />} />
                <Route exact path="/routineActivity/:id/edit" element={<EditRoutineActivity token={token} />} />
            </Routes>
        </div>
    )
}

export default App