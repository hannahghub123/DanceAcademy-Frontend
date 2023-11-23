import React, { useEffect, useState } from 'react'
import Heading from '../common/heading/Heading'
import axiosInstance from '../../axios/tutoraxios'
import { useNavigate } from 'react-router-dom';
import './Courses.css'

// to show the courses available 

const OnlineCourses = () => {

    const [courses,setCourses] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        axiosInstance.get('courses/')
        .then((res)=>{
            console.log(res.data,"hi courses data")
            setCourses(res.data)
        })
    },[]) 

    const courseHandle=(id)=>{
        navigate(`../course-details/${id}`)
    }


  return (
    <>
       <section className='online'>
    <div className="container">
        <Heading subtitle='COURSES' title='Browse Our Online Courses'/>

        <div className="content grid3" style={{ height: "100%", width: "100%", display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
            {courses.map((val) => (
                <div className="box" onClick={() => courseHandle(val.id)} style={{ height: "400px", width: "100%" }}>
                    <div className="img" style={{ height: "60px", width: "80px" }}>
                        <img src={val.image} alt="" />
                    </div>
                    <div className="info">
                        <b>
                            <h1 style={{ textTransform: 'uppercase' }}>{val.title}</h1>
                        </b>
                        <p className="description">{val.description}</p>
                        <span>{val.status}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>

    </>
  )
}

export default OnlineCourses