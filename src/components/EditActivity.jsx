import e from "cors";
import React,{useState, useEffect} from "react";
import { useParams } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";
import { editActivityInDB } from "../api-adapters";

const EditActivity = (props) =>{
    const token = props.token
    const {id} = useParams()
    const location = useLocation()
    const activity = location.state?.data
    const [name, setName] = useState(activity?.name)
    const [desc, setDesc] = useState(activity?.description)
    const [alert, setAlert] = useState("")
    const navigate = useNavigate()
    
    const submitEditedActivity = async ()=>{
        const data = await editActivityInDB(id, token, name, desc)
        if(data.message){
            setAlert(data.message)
        }else{
            setAlert(`${activity.name} has been edited successfully`)
            navigate("/activities")
        }
    }
    return(
        <div id="editActivity-container">
            <form id="editActivityForm" className="form" onSubmit={(e)=>{
                e.preventDefault()
                submitEditedActivity()
            }}>
                <label>Name:</label>
                <input required type="text" value={name} onChange={(e)=>{
                    setName(e.target.value)
                }} />
                <label>Description:</label>
                <input required type="text" value={desc} onChange={(e)=>{
                    setDesc(e.target.value)
                }} />
                <button type="submit">Submit</button>
            </form>
            {alert.startsWith('Error') ? <div id="alertError"><p>{alert}</p></div> : <div id="alert"><p>{alert}</p></div> }
        </div>
    )
}

export default EditActivity