import React, { useEffect, useState } from 'react'
import Back from '../../common/back/Back';
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import './taskstyle.css';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../axios/stdaxios';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import  { Toaster } from 'react-hot-toast';


const TaskUpload = () => {

    const {id} = useParams();
    const navigate=useNavigate()

    const [taskDetails,setTaskDetails] = useState("");
    const [videoInput,setVideoInput] = useState(null);
    const [desc,setDesc] = useState(null);

    useEffect(()=>{
        const values={
            id:id
        }
        axiosInstance.post("activity-details/",values)
        .then((res)=>{
            setTaskDetails(res.data)
        })
    },[])

    const handleVideoUpload = (e)=>{
        const file = e.target.files[0];
        setVideoInput(file);
    }

    const handleVideoSubmit = async(e)=>{
        console.log("video uploading..");
        e.preventDefault();

        const stdData = localStorage.getItem("stdDetails")
        if (stdData){
            const parseData = JSON.parse(stdData)

            console.log(parseData,"&&&&&&&&&");

        const formData = new FormData();
        formData.append('video',videoInput)
        formData.append('description',desc)
        formData.append('student',parseData.id)
        formData.append('task',id)

        const toastid=toast.loading("Uploading..")
        
        try {
            const response = await axios.post(`http://localhost:8000/std/task-upload/`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
                params: {
                    resource_type: 'video',
                },
            });
            console.log(response.data,"###########");
            console.log('Video uploaded:',  response.data.url);
            if(response.data.message==="success"){
                setVideoInput(null);
                setDesc(null);

                toast.dismiss(toastid)

                toast.success("Task Upload", {
                    position: toast.POSITION.TOP_RIGHT
                  });

                  navigate('../std-dashboard/')
                
            }
        } catch (error) {
            console.error("Error Uploading Video :",error)
        }
        }
        
        // props.setRenderComponent((prev)=>!prev)
    }

  return (
    <>
    <Toaster/>
        <Back title='Task Upload'/>
        <br />
        <div className="upload-container">
            <Stack spacing={2} useFlexGap>
                <Card variant="outlined" sx={{ width: 1000 }}>
                <CardContent orientation="horizontal">
                <div className="task-upload-container" >

                <h1>Upload Your Task Here.</h1>
             
                    <Typography>
                        {taskDetails.task}
                    </Typography>
                    <br />
                    <form onSubmit={handleVideoSubmit}  className="upload-form">
                        <label htmlFor="upload-input" className="upload-input-label">
                        Choose a Video :
                        </label>
                
                        <input
                        type="file"
                        id="upload-input"
                        accept="video/*"
                        name="video"
                        onChange={handleVideoUpload}
                        className="upload-input"
                        />

                        <label htmlFor="upload-input" className="upload-input-label">
                        Add Your Task Description :
                        </label>
                        <input
                        type="text"
                        placeholder="Video Description"
                        onChange={(e) => setDesc(e.target.value)}
                        className="desc-input"
                        />
                        <button className="upload-btn" type="submit">
                        Upload Task
                        </button>
                    </form>
                    </div>
                </CardContent>                           
                </Card>
            </Stack>
            </div>
    <br />
    </>
  )
}

export default TaskUpload