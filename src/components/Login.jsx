import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserToDatabase } from "../api-adapters";

const Login = (props) =>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const setLoggedIn = props.setLoggedIn
    const navigate = useNavigate()

    const loginUser = async ()=>{
        const data = await loginUserToDatabase(username,password)
        if(data.token){
            localStorage.setItem("token", data.token)
            setLoggedIn(true)
            navigate("/")
        }else{
            alert(data.message)
        }
    }
    return(
        <div>
            <div id="registration-div">
                <p>If you are not registered, you can register here!</p>
                <Link to="/register"><p>Register</p></Link>
            </div>
            <h2>Login</h2>
            <form onSubmit={(e)=>{
                e.preventDefault()
                setUsername("")
                setPassword("")
                loginUser()
            }}>
                <label>Username:</label>
                <input required type="text" onChange={(e)=>{
                    setUsername(e.target.value)
                }} />
                <label>Password:</label>
                <input required type="password" onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default Login