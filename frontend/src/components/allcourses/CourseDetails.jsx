import React, { useEffect, useState } from 'react'
import Back from '../common/back/Back'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axios/tutoraxios'
import DetailsCard from './DetailsCard'
import Heading from '../common/heading/Heading'
import CoursesCard from './CoursesCard'

// to show the related tutor details of a particular course - routing "DetailsCard" for displaying the details

const CourseDetails = () => {
    const {id} = useParams()
    const [data,setData] = useState("")
    const [acc,setAcc] = useState(false)

    useEffect(()=>{
      const stdData = localStorage.getItem("stdDetails")
      if (stdData){
        setAcc(true)
      }

        axiosInstance.get(`course-details/${id}`)
        .then((res)=>{
            setData(res.data)
        })
    },[]) 


  return (
    <>
    <Back title={data.title} />
    <div className="container">
    <Heading subtitle='COURSE-DETAILS' title='Browse Our Course Details'/>
    <p>{data.description} </p>
    </div>
        <CoursesCard/>
        { acc && <DetailsCard/>}
        
        <br />   <br />
   
    </>
  )
}

export default CourseDetails