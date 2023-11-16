import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { Button } from '@mui/material';

const Sidebar = () => {

  const navigate = useNavigate()
  const logoutSubmit = ()=>{
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminData");
    localStorage.removeItem("stdData");
    localStorage.removeItem("tutorData");
    navigate('../admin/adminlogin/')
  }
   
  return (
    <>
      <div class="sidebar">
        <Link to="../admin/admin-dashboard">Home</Link>
        <Link to="../admin/student/">Student</Link>
        <Link to="../admin/tutor">Tutor</Link>
        <Link to="../admin/courses">Courses</Link>
        <Button onClick={logoutSubmit}>Logout</Button>
      </div>
    </>
  )
}

export default Sidebar