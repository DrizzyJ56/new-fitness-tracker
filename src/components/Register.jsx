import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { registerUserToDatabase } from "../api-adapters";

const Register = (props) => {
    const setLoggedIn = props.setLoggedIn
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const navigate = useNavigate()
    const [alert, setAlert] = useState("")

    const sendData = async () =>{
        if(username.length > 2 && password.length > 7 && confirmedPassword === password){
            const data = await registerUserToDatabase(username, password)
            if(data.name){
                setAlert(data.message)
            }else{
                localStorage.setItem("token", data.token)
    
                setUsername("")
                setPassword("")
                setConfirmedPassword("")
                setLoggedIn(true)
                setAlert(data.message)
                navigate("/")
            }
        }else{
            setAlert("Error registering! Please check your username and password according to requirements. ")
        }
    }
    return(
        <div>
            <form id="registerForm" className="form" onSubmit={(e)=>{
                e.preventDefault()
                sendData()
            }}>
                <label>Username:</label>
                <input required placeholder="Minimum 3 characters" value={username} min="3" type="text" onChange={(e)=>{
                    setUsername(e.target.value)
                }} />
                <label>Password:</label>
                <input required placeholder="Minimum 8 characters" min="8" value={password} type="password" onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                <label>Confirmed Password:</label>
                <input required placeholder="Confirm Password" min="8" value={confirmedPassword} type="password" onChange={(e)=>{
                    setConfirmedPassword(e.target.value)
                }} />
                <button type="submit">Submit</button>
            </form>
            {alert.startsWith('Error') ? <div id="alertError"><p>{alert}</p></div> : <div id="alert"><p>{alert}</p></div> }
        </div>
    )
}

export default Register