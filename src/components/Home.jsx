import React from "react";

const Home = (props) => {
    const token = props.token
    const setLoggedIn = props.setLoggedIn
    if(token){
        setLoggedIn(true)
    }
    return(
        <h1>I am home</h1>
    )
}

export default Home