import React, { useState } from 'react';
import {changePassword, changeUsername} from '../../features/stdloginSlice';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../axios/stdaxios';
import './StdLogin.css';
import { useNavigate } from 'react-router-dom';
import Back from '../common/back/Back';
import { changeaccessS } from '../../features/logoutSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StdLogin = () => {

  const [isInputFocused, setInputFocus] = useState(false);
  const [isPasswordInputFocused, setPasswordInputFocus] = useState(false);


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state)=>state.stdlogin)
    const values={
            
        "username":user.value.username,
        "password":user.value.password,

      }

    const handleLogin = (e)=>{
      e.preventDefault();
      console.log(values,"values here");
        axiosInstance.post("stdlogin/",values).then((res)=>{
          console.log("ivdem ethy njn");
          console.log(res.data);

            const tokenobjs = {

                refresh : res.data.refresh,
                access : res.data.access,
                message : res.data.message

            };

            console.log(tokenobjs);

          if (res.data.message === "success"){
            navigate('../std-dashboard/')
            localStorage.setItem("accessToken-S",JSON.stringify(res.data.access));
            localStorage.setItem("stdDetails",JSON.stringify(res.data.data));
            dispatch(changeaccessS(res.data.access))

            toast.success("Successfully LoggedIn", {
              position: toast.POSITION.TOP_CENTER,
            });            

          }else{
            // alert(res.data.message)

            toast.warning("Invalid Credentials", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
    }

    const tutorLoginHandle=()=>{
      navigate("../tutor-login")
    }

  return (
   <>
<Back title='Student Login'/>
<br />
    <div className="login-container">
    <form onSubmit={handleLogin}>
    
        <input
        className={`login-input ${isInputFocused ? 'focused' : ''}`}
        type="text"
        placeholder="Student UserName !"
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
                onChange={(e) => dispatch(changeUsername(e.target.value)) }
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

          <button onClick={tutorLoginHandle} className='login-button mt-2'>Login As Tutor ?</button>
    </div>
    </>
  )
}


export default StdLogin