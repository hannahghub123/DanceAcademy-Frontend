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
        <Link to="../admin/tutor">Tutor</Link>
        <Link to="../admin/student/">Student</Link>
        <Link to="../admin/courses">Courses</Link>
        {/* <Link to="../admin/tutor-uploads">Tutor-Uploads</Link> */}
        {/* <Link to="../admin/student-uploads">Student-Uploads</Link> */}
        {/* <Link to="../admin/tasks-assigned">Tasks-Assigned</Link> */}
        {/* <Link to="../admin/feedbacks-given">Feedbacks-Given</Link> */}
        <Button className='mt-3 ml-2' onClick={logoutSubmit}>Logout</Button>
      </div>
    </>
  )
}

export default Sidebar