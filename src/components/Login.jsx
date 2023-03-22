import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserToDatabase } from "../api-adapters";

const Login = (props) =>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState("")
    const setLoggedIn = props.setLoggedIn
    const navigate = useNavigate()
    let data = null

    const loginUser = async ()=>{
        data = await loginUserToDatabase(username,password)
        if(data.token){
            localStorage.setItem("token", data.token)
            setLoggedIn(true)
            navigate("/")
        }else{
            setAlert(data.message)
        }
    }
    return(
        <div>
            <div id="registration-div">
                <p>If you are not registered, you can register here!</p>
                <Link to="/register"><p>Register</p></Link>
            </div>
            <h2>Login</h2>
            <form onSubmit={async (e)=>{
                e.preventDefault()
                setUsername("")
                setPassword("")
                await loginUser()
                if(data.token){
                    location.reload()
                }
            }}>
                <label>Username:</label>
                <input required type="text" value={username} onChange={(e)=>{
                    setUsername(e.target.value)
                }} />
                <label>Password:</label>
                <input required type="password" value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                <button type="submit">Submit</button>
            </form>
            {alert.startsWith('Error') ? <div id="alertError"><p>{alert}</p></div> : <div id="alert"><p>{alert}</p></div> }
        </div>
    )
}
export default Login