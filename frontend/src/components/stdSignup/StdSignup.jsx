import React, { useState } from 'react';
import { changeEmail, changeName, changePassword, changePhone, changeRepassword, changeUsername } from '../../features/stdsignupSlice';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../axios/stdaxios';
import './StdSignup.css';
import { useNavigate } from 'react-router-dom';
import Back from '../common/back/Back';

const StdSignup = () => {
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.stdsignup);
  const values = {
    "username": user.value.username,
    "name": user.value.name,
    "email": user.value.email,
    "phone": user.value.phone,
    "password": user.value.password,
    "repassword": user.value.repassword,
  };

  const handleSignUp = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    axiosInstance.post("stdsignup/", values).then((res) => {
      console.log("ivde etheetund");
      console.log(res.data);
      if (res.data.message === "success") {
        navigate('../std-login/');
      } else {
        alert(res.data.error);
      }
    });
  };

  const tutorSignupHandle = () => {
    navigate("../tutor-signup");
  };

  return (
    <>
      <Back title="Student SignUp" />
      <br />
      <div className="stdsignup-container">
        <form onSubmit={handleSignUp}>
          <input
            required
            className="stdsignup-input"
            type="text"
            placeholder="Username"
            onChange={(e) => dispatch(changeUsername(e.target.value))}
          />
          <span className="text-danger">{user.value.error.username}</span>

          <input
            required
            className="stdsignup-input"
            type="text"
            placeholder="Student Name"
            onChange={(e) => dispatch(changeName(e.target.value))}
          />
          <span className="text-danger">{user.value.error.name}</span>

          <input
            required
            className="stdsignup-input"
            type="email"
            placeholder="Email"
            onChange={(e) => dispatch(changeEmail(e.target.value))}
          />
          <span className="text-danger">{user.value.error.email}</span>

          <input
            required
            className="stdsignup-input"
            type="number"
            placeholder="Phone"
            onChange={(e) => dispatch(changePhone(e.target.value))}
          />
          <span className="text-danger">{user.value.error.phone}</span>

          <input
            required
            className="stdsignup-input"
            type="password"
            placeholder="Password"
            onChange={(e) => dispatch(changePassword(e.target.value))}
          />
          <span className="text-danger">{user.value.error.password}</span>

          <input
            required
            className="stdsignup-input"
            type="password"
            placeholder="RePassword"
            onChange={(e) => dispatch(changeRepassword(e.target.value))}
          />
          <span className="text-danger">{user.value.error.repassword}</span>

          <button type="submit" className="stdsignup-button">
            Sign Up
          </button>
        </form>

        <button className="stdsignup-button mt-2" onClick={tutorSignupHandle}>
          Are you a Tutor ?
        </button>
      </div>
    </>
  );
};

export default StdSignup;
