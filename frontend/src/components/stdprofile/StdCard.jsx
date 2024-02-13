import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {changeName,changeEmail,changePassword,changePhone,changeUsername} from '../../features/stdEditslice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import axiosInstance from '../../axios/stdaxios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ImageListItem from "@mui/material/ImageListItem";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TasksAssigned from './task/TasksAssigned';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  marginTop:5 ,
  p: 4,
};

const StdCard = () => {

  const {id} = useParams();

  const dispatch = useDispatch()
  const user = useSelector((state)=>state.stdedit)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image,setImage] = useState('');
  const [task,setTask] = useState(false)
  const [taskCount,setTaskCount] = useState(null)

  const [data,setData] = useState("")

  useEffect(()=>{
    const stdDetails = localStorage.getItem("stdDetails");

    if (stdDetails) {
      const parseData = JSON.parse(stdDetails);

      setData(parseData); 

      const values = {
        id:id
      }

      axiosInstance.post("task-details/",values)
      .then((res)=>{
        setTaskCount(res.data.taskCount)
      })

    }

  },[]);

  const imageHandle =(e)=>{
    setImage(e.target.files[0]);
  }



  const handleSubmit = ()=>{

    const datas={
      id:data.id,
        username:data.username,
        course:data.course.id,
         name:data.name, 
         email:data.email, 
         phone:data.phone, 
         score:data.score, 
         password:data.password, 
         image:data.image
    }

    axiosInstance.post("std-edit/",datas).then((res)=>{
      localStorage.setItem("stdDetails",JSON.stringify(res.data.data))
      setData({...data,id:res.data.data.id,username:res.data.data.username,course: res.data.course ,name:res.data.data.name, email:res.data.data.email, phone:res.data.data.phone, password:res.data.data.password});

      if (image){
        const handleSubmitFile = async(e)=>{  
          const formData = new FormData();
          formData.append('image',image)
          formData.append('id',id)
          try{
              await axios.post('http://localhost:8000/std/image-set/',formData,{
                  headers:{
                      'Content-Type':'multipart/form-data',
                  },
              })
              .then((res)=>{
                localStorage.setItem("stdDetails",JSON.stringify(res.data.data))
                setData({...data,image:res.data.data.image})
              })
              setImage(null);
      
          }catch(error){
              console.error("Error Creating Post :",error)
          }
          }
      
      handleSubmitFile();

      }

      handleClose();
    
    })
    toast.success(" Profile-Edits Updated!", {
      position: toast.POSITION.TOP_RIGHT
    });
}

const handleUsernameChange = (e) => {
  setData({ ...data, username: e.target.value });
  dispatch(changeUsername(e.target.value));
};

const handleNameChange = (e) => {
  setData({ ...data, name: e.target.value });
  dispatch(changeName(e.target.value));
};

const handleEmailChange = (e) => {
  setData({ ...data, email: e.target.value });
  dispatch(changeEmail(e.target.value));
};

const handlePhoneChange = (e) => {
  setData({ ...data, phone: e.target.value });
  dispatch(changePhone(e.target.value));
};

const handlePasswordChange = (e) => {
  setData({ ...data, password: e.target.value });
  dispatch(changePassword(e.target.value));
};

const taskHandle=()=>{
  setTask(!task)
}

  return (
    <>

      <div className="profile-card ">
          <Stack >
            <Card sx={{ width: 550 }}>
              <CardContent orientation="horizontal">
                <ImageListItem sx={{ width: 200 }}>
                <img
                    srcSet={data.image}
                    src={data.image}
                    loading="lazy"
                  />
                </ImageListItem>


                <div className="details">
                  <Typography sx={{color:"black"}}>
                  <b>
                  {data.name}
                  </b>
                  </Typography>
                  <Typography sx={{textTransform:"uppercase"}}>
                  {/* {data.course.title} */}
                  </Typography>
                  <Typography >
                    Username - {data.username}
                  </Typography>
                  <Typography >
                    
                    Email - {data.email}
                  </Typography>
                  <Typography>
                    Phone - {data.phone}
                  </Typography>
                  <Typography>
                    Password - {data.password}
                  </Typography>
                  <br />

                  {/* <i className="fa fa-edit icon" onClick={handleOpen}   title='Edit Details'></i>
                  <i class="fa-solid fa-bell icon" onClick={taskHandle}></i> */}

                
                  <span>
                    <i className="fa fa-edit icon" onClick={handleOpen} title="Edit Details"></i>
                  </span>
                  {/* <span className="ml-1 position-relative">
                    <i className="fa-solid fa-bell icon" onClick={taskHandle}  title="ActivityTasks"></i>
                    {taskCount > 0 && (
                      <span className="badge"  onClick={taskHandle} >{taskCount}</span>
                    )}
                  </span> */}
                </div>

                
              </CardContent>
              

              
            </Card>
          </Stack>
        </div>

        {task?<TasksAssigned/>:null}


<Modal open={open} onClose={handleClose} className='edit-modal'>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Edit Profile
          </Typography>
          <br />

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={data.username}
            onChange={handleUsernameChange}
          />
          
            <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={data.name}
            onChange={handleNameChange}
          />

            {/* <TextField
            label="Course"
            variant="outlined"
            fullWidth
            value={(data.course).map((item)=>item.title)}
            InputProps={{
                readOnly: true,
              }}
          /> */}
            <TextField
            label="Score"
            variant="outlined"
            fullWidth
            value={data.score}
            InputProps={{
              readOnly: true,
            }}
          />
            <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={data.email}
            onChange={handleEmailChange}
          />
            <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            value={data.phone}
            onChange={handlePhoneChange}
          />
            
            <TextField
            label="Password"
            variant="outlined"
            fullWidth
            value={data.password}
            onChange={handlePasswordChange}
          />
          <br /><br />

          <input type="file" onChange={imageHandle}/>

          <button className='edit-btn'  onClick={handleSubmit} >
            Save Changes
          </button>
        </Box>
      </Modal>
  


    </>
  )
}

export default StdCard