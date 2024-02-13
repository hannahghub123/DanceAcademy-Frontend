import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../axios/tutoraxios';
import './TutorLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import { changeEmail,changePassword } from '../../features/tutorloginSlice';
import Back from '../common/back/Back';
import { changeaccessT } from '../../features/logoutSlice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TutorLogin = () => {

  const [click, setClick] = useState(false);

  const [isInputFocused, setInputFocus] = useState(false);
  const [isPasswordInputFocused, setPasswordInputFocus] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tutor = useSelector((state)=>state.tutorlogin)
    const data={
          
        "email":tutor.value.email,
        "password":tutor.value.password,

      }

    const handleLogin = (e)=>{
      e.preventDefault();

        axiosInstance.post("login/",data).then((res)=>{
          const tutorId = res.data.id
            const tokenobjs = {

                refresh : res.data.refresh,
                access : res.data.access,
                message : res.data.message

            };

            localStorage.setItem("accessToken-T",JSON.stringify(res.data.access));
            localStorage.setItem("tutorDetails",JSON.stringify(res.data.data));
            dispatch(changeaccessT(res.data.access))
            

          if (res.data.message === "success"){
            navigate(`../tutor-dashboard/${tutorId}`)
            toast.success("Successfully LoggedIn", {
              position: toast.POSITION.TOP_CENTER,
            });

          }else if(res.data.message === "not approved"){
            // alert("Login not approved")
            toast.warning("Login not approved", {
              position: toast.POSITION.TOP_CENTER,
            });

          }else{
            // alert("invalid")
            toast.warning("Invalid Credentials", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
          
        })
        
    }

    const studentLoginHandle=()=>{
      navigate("../std-login")
    }

  return (
   <>
<Back title='Tutor Login'/>
<br />
    <div className="login-container">
        <form onSubmit={handleLogin}>

    <input
      className={`login-input ${isInputFocused ? 'focused' : ''}`}
      type="text"
      placeholder="Tutor Email !"
      onFocus={() => setInputFocus(true)}
      onBlur={() => setInputFocus(false)}
      onChange={(e) => dispatch(changeEmail(e.target.value))}
    />


    <input
      className={`login-input ${isPasswordInputFocused ? 'focused' : ''}`}
      type="password"
      placeholder="Password !"
      onFocus={() => setPasswordInputFocus(true)}
      onBlur={() => setPasswordInputFocus(false)}
      onChange={(e) => dispatch(changePassword(e.target.value))}
    />

    <button className="login-button">Login</button>

        </form>

        <button className="login-button mt-2" onClick={studentLoginHandle}>Login As Student ?</button>
    </div>
    </>
  )
}


export default TutorLogin