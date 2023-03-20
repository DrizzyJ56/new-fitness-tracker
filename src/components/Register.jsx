import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api-adapters";

const Register = (props) => {
    const setLoggedIn = props.setLoggedIn
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const navigate = useNavigate()

    const sendData = async () =>{
        if(username.length >= 3 && password.length >= 8 && confirmedPassword === password){
            const data = await registerUser(username, password)
            console.log(data)

            setUsername("")
            setPassword("")
            setConfirmedPassword("")
            setLoggedIn(true)
            alert("You are successfully registered!")
            navigate("/")
        }else{
            alert("Error registering! Please check your username and password according to requirements. ")
        }
    }
    // localStorage.setItem("token", data)
    return(
        <div>
            <form id="register-form" onSubmit={(e)=>{
                e.preventDefault()
                sendData()
            }}>
                <label>Username:</label>
                <input required placeholder="Minimum 3 characters" min="3" type="text" onChange={(e)=>{
                    setUsername(e.target.value)
                }} />
                <label>Password:</label>
                <input required placeholder="Minimum 8 characters" min="8" type="password" onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                <label>Confirmed Password:</label>
                <input required placeholder="Confirm Password" min="8" type="password" onChange={(e)=>{
                    setConfirmedPassword(e.target.value)
                }} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register