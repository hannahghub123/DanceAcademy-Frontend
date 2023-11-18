import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './TutorProfile.css'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {changeEmail, changeName, changePassword, changePhone, changeUsername, changeExpertise, changeQualification} from '../../features/tutorprofileEditSlice';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../axios/tutoraxios';
import axios from 'axios';
import VideoUpload from '../cloudinary/video/VideoUpload';

const style = {
    position: 'absolute',
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

const TutorCard = () => {
    const {id} = useParams(); 

    const dispatch = useDispatch();
    const user = useSelector((state)=>state.tprofedit);

    const [data,setData] = useState(
        {
          id:id,
          username: '',
          name: '',
          course: '',
          expertise: '',
          email: '',
          qualification: '',
          phone: '',
          password: '',
          image:''
        }
      )
    useEffect((data)=>{
        const tutorDetails = localStorage.getItem("tutorDetails");
        console.log(tutorDetails,"tutorDetailssssssss");
        if (tutorDetails) {
          const parseData = JSON.parse(tutorDetails);
  
          setData({...data,id:parseData.id,username:parseData.username,course:parseData.course, name:parseData.name, email:parseData.email, phone:parseData.phone, expertise:parseData.expertise, qualification:parseData.qualification, password:parseData.password, image:parseData.image});
  
          console.log("Parsedata",parseData)
        }
  
      },[])

      const handleUsernameChange = (e) => {
        setData({ ...data, username: e.target.value });
        dispatch(changeUsername(e.target.value));
        console.log(data.username,"edited username",user.value.username);
      };
  
      const handleNameChange = (e) => {
        setData({ ...data, name: e.target.value });
        dispatch(changeName(e.target.value));
        console.log(data.name,"edited name");
      };
  
      const handleExpertiseChange = (e) => {
        setData({ ...data, expertise: e.target.value });
        dispatch(changeExpertise(e.target.value));
        console.log(data.expertise,"edited exp");
      };
  
      const handleEmailChange = (e) => {
        setData({ ...data, email: e.target.value });
        dispatch(changeEmail(e.target.value));
        console.log(data.email,"edited email");
      };
  
      const handleQualificationeChange = (e) => {
        setData({ ...data, qualification: e.target.value });
        dispatch(changeQualification(e.target.value));
        console.log(data.qualification,"edited qualification");
      };
      const handlePhoneChange = (e) => {
        setData({ ...data, phone: e.target.value });
        dispatch(changePhone(e.target.value));
        console.log(data.phone,"edited phone");
      };
      const handlePasswordChange = (e) => {
        setData({ ...data, password: e.target.value });
        dispatch(changePassword(e.target.value));
        console.log(data.password,"edited password");
      };
  
  

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    const [image,setImage] = useState('')

    const imageHandle =(e)=>{
      setImage(e.target.files[0]);
    }

    console.log(image,"set imageee");

    
    const handleSubmit = ()=>{
        console.log("id ivde kittunund",id)

        console.log("pass chyunna data",data,"???????????????????????????");
       
        
        axiosInstance.post("tprofedit/",data).then((res)=>{
          console.log(res.data," hi res.data ahn ith",res.data.name);
          localStorage.setItem("tutorDetails",JSON.stringify(res.data))
          console.log(res.data.image,"imggggg");        
          setData({...data,id:res.data.id,username:res.data.username,course:res.data.course, name:res.data.name, email:res.data.email, phone:res.data.phone, expertise:res.data.expertise, qualification:res.data.qualification, password:res.data.password});

          if (image){
            const handleSubmitFile = async(e)=>{
              console.log("submitting...");
      
              const formData = new FormData();
              formData.append('image',image)
              formData.append('id',id)
              console.log(formData,"Formdataaa");
              try{
                  await axios.post('http://localhost:8000/tutor/image-set/',formData,{
                      headers:{
                          'Content-Type':'multipart/form-data',
                      },
                  })
                  .then((res)=>{
                    localStorage.setItem("tutorDetails",JSON.stringify(res.data.data))
                    setData({...data,image:res.data.data.image})
                  })
                  setImage(null);
          
              }catch(error){
                  console.error("Error Creating Post :",error)
              }
              // onClose();
              }
          
          handleSubmitFile();
    
          }

          handleClose();
        })
    }
    const [isUploadComponentVisible, setIsUploadComponentVisible] = useState(false);
   
    const toggleUploadComponent = () => {
      setIsUploadComponentVisible(!isUploadComponentVisible);
    };

    

  return (
    <>
            <div className="items shadow"  >
                <div className="img" style={{width:"30px"}}>
                    <img src={data.image} alt="" style={{width:"228px"}} />
                    <div >  
                    <i className="fa fa-edit icon"  onClick={handleOpen} title='Edit Details'></i>
                    <i className="fa fa-add icon" title='Upload Videos' onClick={toggleUploadComponent}></i>
                    {/* <i class="fa fa-list icon" title='List Video Uploads' onClick={toggleViewComponent}></i> */}
                    </div>
                </div>
                <div className="details">
                    <h2 key={data.id}>{data.name}</h2>
                    <h2  className="all-caps"><b>{data.course.title}</b></h2> 
        
                    <p className="details-text">
                
                        Username - {data.username} <br />
                        Qualification - {data.qualification} <br />
                        Expertise - {data.expertise} Years<br />
                        Email - {data.email} <br />
                        Phone - {data.phone} <br /> 
                    </p> 
                </div>
            </div>

            <>
            {isUploadComponentVisible ? (
                      <><VideoUpload /></>  
                      ) : null}
            </>

        
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

            <TextField
            label="Course"
            variant="outlined"
            fullWidth
            value={data.course.title}
            InputProps={{
                readOnly: true,
              }}
          />
            <TextField
            label="Expertise"
            variant="outlined"
            fullWidth
            value={data.expertise}
            onChange={handleExpertiseChange}
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
            label="Qualification"
            variant="outlined"
            fullWidth
            value={data.qualification}
            onChange={handleQualificationeChange}
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

export default TutorCard