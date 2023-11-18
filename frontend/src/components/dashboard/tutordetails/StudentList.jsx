import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axios/stdaxios';
import { useNavigate, useParams } from 'react-router-dom';
import SessionAssign from './session/SessionAssign';
import { Link } from 'react-router-dom';
import AddActivityTask from './session/AddActivityTask';
import Heading from '../../common/heading/Heading';
import Back from '../../common/back/Back';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentList = () => {

    const [val,setVal]= useState([]);
    
    const [timing,setTiming] = useState(false)
    const [ timingId,setTimingId] = useState(null)
    const [sessionDetails,setSessionDetails] = useState([])
    const [task,setTask] = useState(false)
    const [studentId,setStudentId] = useState(null)
    const [structId,setStructId] = useState(null)

    const navigate=useNavigate();

    const tutorData = localStorage.getItem("tutorDetails")

    const parseData = JSON.parse(tutorData)
    const tutorId = parseData.id


    useEffect(()=>{
      const tutorData = localStorage.getItem("tutorDetails")
          if (tutorData){
              const parseData = JSON.parse(tutorData)
              const values ={
                  id:parseData.id
              }
        axiosInstance.post("pay-details/",values)
        .then((res)=>{
            console.log(res.data);
            setVal(res.data.paydata)
        })

        axiosInstance.post("session-details/",values)
        .then((res)=>{
          console.log(res.data,"session details");
          setSessionDetails(res.data)
        })
      }
    },[])

    console.log(val,"val");

    const courses = val.map(item => item.structId.course);

    console.log(courses,"courses");

    const timingHandle=(id)=>{
      setTimingId(id)
      setTiming(!timing)
    }

    const mailHandle=(id)=>{
      const values={
        roomId:id,
       
      }
      axiosInstance.post("send-sessionMail/",values)
      .then((res)=>{
        console.log(res.data);
        toast.success(" Mail SuccessFully Send!", {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }

    const taskHandle=(id,plan)=>{
      console.log("clicked!!");
      setStudentId(id)
      setStructId(plan)
      setTask(!task)
    }


  return (
    <>
     <Back title="Students Assigned"/>

        <section className='online ml-1'>
            <div className="container" >
                <Heading title='Assigned Students List'/>

                <div className="content grid3" style={{height:"100%",width:"1500px"}}>
                    {val.map((item)=>(
                        <div className="box" style={{width:'300px', height:'500px'}}>
                            <div className="img">
                                <img src={item.studentId.image} alt="" />
                            </div>
                            <div style={{textTransform:"uppercase",marginTop:10, marginBottom:5, textTransform:"uppercase"}}> 
                            <b>{item.studentId.name} </b> 
                            </div>                         
                            <div>Course - {item.structId.course.title}  </div>
                            <div>{item.structId.title} Plan</div>
                            <div>{item.studentId.email} </div>
                            <div>{item.studentId.phone} </div>

                            <p >
                            {  sessionDetails.filter((detail)=>{
                  return(
                    detail.student.id===item.studentId.id,
                    detail.tutor.id===item.tutorId.id,
                    detail.course_struct.id===item.structId.id
                  )
                }).filter((v)=>{
                  return(
                    
                    v.student.id===item.studentId.id
                  )
                }).map((req)=>{
                  return(
                    <>
                       <Link to={`../zego`} onClick={()=>{
                      localStorage.setItem("vid-link",req.video_link)
                    }}>
                     <button className='edit-btn'>Join Session</button>
                    </Link>


                   {req.video_link?
                   <div className='d-flex flex-row'>
                  <button className='session-btn' onClick={()=>mailHandle(req.video_link)}>Send Session Mail</button>
                  <i className="fa fa-add icon ml-3" onClick={()=>taskHandle(item.studentId.id,item.structId.title)} title='Add ActivityTask !'></i>
                  </div>
                   :
                  null
                   }
                      
                    </>
                 
                  )

                })
                
                } 

                  {
                    sessionDetails.filter((detail)=>{
                      return(
                        detail.student.id===item.studentId.id,
                        detail.tutor.id===item.tutorId.id,
                        detail.course_struct.id===item.structId.id
                      )
                    }).filter((v)=>{
                      return(
                        
                        v.student.id===item.studentId.id
                      )
                    }).length!=0 ? 
                    ""
                    : <button className='edit-btn' onClick={()=>timingHandle(item.id)}>Add Session Timing</button>
                  }
                
                            </p>
                            {(timing && timingId && (timingId===item.id))?  
                  <SessionAssign student={item.studentId.id} courseplan={item.structId.id}/>
                  :null   
                }
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {(task) ?


                <AddActivityTask studentId={studentId} coursePlan={structId} tutorId={tutorId} setTask={setTask}/>
                

        
        :null }
    </>
  )
}

export default StudentList