import React, { useEffect, useState } from 'react';
import {changeEmail, changeName, changePassword, changePhone,changeRepassword, changeUsername, changeExpertise, changeQualification} from '../../features/tutorsignupSlice';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../axios/tutoraxios'
import { useNavigate } from 'react-router-dom';
import Back from '../common/back/Back';
import Autocomplete from '@mui/joy/Autocomplete';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import axios from 'axios';
import './TutorSignup.css';

const TutorSignup = () => {

  const [cdata,setCdata] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  // const [fileId,setFileId] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state)=>state.tutorsignup)
    const values= {
            
        "username":user.value.username,
        "name":user.value.name,
        "expertise":user.value.expertise,
        "qualification":user.value.qualification,
        "email":user.value.email,
        "phone":user.value.phone,
        "password":user.value.password,
        "courses": selectedCourses,
        "resume": fileInput,
      }


    const handleSignUp = (e)=>{
      e.preventDefault();

        axiosInstance.post("signup/",values).then((res)=>{
          // setFileId(res.data.data.id)
          handleFileSubmit(res.data.data.id);
          if(res.data.message==="success"){
            navigate('../tutor-login/')
          }       
        })
    }

    const handleFileSubmit=async(id)=>{
      // e.preventDefault();

      const formData = new FormData();
      formData.append('resume',fileInput)
      formData.append('id',id)
      try {
          const response = await axios.post("http://localhost:8000/tutor/resume-upload/",formData,{
              headers:{
                  'Content-Type':'multipart/form-data',
              },
              params: {
                  resource_type: 'auto',
              },
          });
        
          setFileInput(null);

      } catch (error) {
          console.error("Error Uploading Video :",error)
      }
  }

    useEffect(()=>{
      axiosInstance.get("courses/")
      .then((res)=>{
        setCdata(res.data)
      })
    },[])
    

    const fileUploadHandle = (e)=>{
      const file = e.target.files[0];
      if(file){
        setFileInput(file);
        // dispatch(changeResume(file))
      }
    }

    const studentSignupHandle=()=>{
      navigate("../std-signup")
    }


  return (
    <>
    
    <Back title='Tutor SignUp'/>
    <br />
    <div className="trsignup-container">
    <form onSubmit={handleSignUp}>
      <>
        <input
          required
          className="trsignup-input"
          type="text"
          placeholder="Username"
          // value={user.value.username}
          onChange={(e) => dispatch(changeUsername(e.target.value)) }
        />
      <span className="text-danger">{user.value.error.username}</span>

        <input
         required
          className="trsignup-input"
          type="text"
          placeholder="Tutor Name"
          // value={user.value.name}
          onChange={(e) => dispatch(changeName(e.target.value)) }
        />
      <span className="text-danger">{user.value.error.name}</span>

        <input
        required
          className="trsignup-input"
          type="number"
          placeholder="Expertise"
          // value={user.value.expertise}
          onChange={(e) => dispatch(changeExpertise(e.target.value))}
        />
            <span className="text-danger">{user.value.error.expertise}</span>


        <input
        required
          className="trsignup-input"
          type="text"
          placeholder="Qualification"
          // value={user.value.qualification}
          onChange={(e) => dispatch(changeQualification(e.target.value))}
        />
        
         <span className="text-danger">{user.value.error.qualification}</span>


       <Autocomplete
          className="trsignup-input"
          placeholder="Choose Your Course of Interest"
          options={cdata.map(item => item.title)}
          multiple={true}
          sx={{ width: "100%" }}
          value={selectedCourses}
          onChange={(event, newValue) => setSelectedCourses(newValue)}
        />

        <input
          className="trsignup-input"
          type="email"
          placeholder="Email"
          // value={user.value.email}
          onChange={(e) => dispatch(changeEmail(e.target.value)) }
        />

        <span className="text-danger">{user.value.error.email}</span>

        <input
          className="trsignup-input"
          type="number"
          placeholder="Phone"
          // value={user.value.phone}
          onChange={(e) => dispatch(changePhone(e.target.value)) }
        />
         <span className="text-danger">{user.value.error.phone}</span>


        <input
          className="trsignup-input"
          type="password"
          placeholder="Password"
          // value={user.value.password}
          onChange={(e) => dispatch( changePassword(e.target.value))}
        />
        <span className="text-danger">{user.value.error.password}</span>

        <input
          className="trsignup-input"
          type="password"
          placeholder="RePassword"
          // value={user.value.repassword}
          onChange={(e) => dispatch( changeRepassword(e.target.value))}
        />
           <span className="text-danger">{user.value.error.repassword}</span>

<Button
      component="label"
      role={undefined}
      tabIndex={-1}
      variant="outlined"
      color="neutral"
      startDecorator={
        <SvgIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        </SvgIcon>
      }
    >
        {!fileInput ? "Upload Your Resume" : <span>{fileInput.name}</span>}
      <input required type="file" className=' hideit' onChange={fileUploadHandle}/>


    </Button>

      </>

        <button className="trsignup-button">Tutor Sign Up</button>

      </form>

      <button 
      className="trsignup-button mt-2" 
      onClick={studentSignupHandle}>
      Are you a Student ?
      </button>

    </div>
   
    </>
  )
}

export default TutorSignup