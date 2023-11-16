import React, { useEffect, useState } from 'react';
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import ImageListItem from "@mui/material/ImageListItem";
import axiosInstance from '../../axios/stdaxios';
import { useNavigate, useParams } from 'react-router-dom';
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers';
import SessionAssign from './SessionAssign';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Zegocloud from '../zegocloud/Zegocloud';
import AddActivityTask from './AddActivityTask';


const StudentList = () => {

    const [val,setVal]= useState([]);
    const {id} = useParams();
    const [timing,setTiming] = useState(false)
    const [ timingId,setTimingId] = useState(null)
    const [sessionDetails,setSessionDetails] = useState([])
    const [task,setTask] = useState(false)
    const [studentId,setStudentId] = useState(null)
    const [structId,setStructId] = useState(null)
    const [render,setRender] = useState(false)
    const navigate=useNavigate()

    useEffect(()=>{
        const values={
            id:id,
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

        <div className="flex justify-center mb-4">
          <Stack spacing={2} useFlexGap>
              <h1>Assigned Student-Course Details :</h1>
            {val.map((item)=>(
            <Card variant="outlined" sx={{ width: 450 }}>
              <CardContent orientation="horizontal">

              <ImageListItem sx={{ width: 200 }}>
                  <img
                    srcSet={item.studentId.image}
                    src={item.studentId.image}
                    loading="lazy"
                  />

                </ImageListItem>
               

                <div>
                  <Typography sx={{ overflow: "hidden" }}>
                    Assigned Course : <span style={{ textTransform:"uppercase"}}> {item.structId.course.title} </span>
                  </Typography>
                  <Typography sx={{ overflow: "hidden" }}>
                    Course-Plan : {item.structId.title}
                    <hr />
                  </Typography>
                  <Typography sx={{ overflow: "hidden" }}>
                    Student Name : {item.studentId.name}
                    {/* <i className="fa fa-add icon ml-5" onClick={()=>taskHandle(item.studentId.id,item.structId.title)}></i> */}
                  </Typography>

                  <Typography>
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
                   <>
                  <button className='session-btn' onClick={()=>mailHandle(req.video_link)}>Send Session Mail</button>
                  <i className="fa fa-add icon ml-3" onClick={()=>taskHandle(item.studentId.id,item.structId.title)} title='Add ActivityTask !'></i>
                  </>
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
                
                  </Typography>
            
              
                  
                </div>
              </CardContent>
              
              
              {(timing && timingId && (timingId===item.id))?  
                  <SessionAssign student={item.studentId.id} courseplan={item.structId.id}/>
                  :null   
                }
              
            </Card>

            ))}
          </Stack>
        </div>

        {(task) ?
        <div className='tutor-container' style={{display: 'flex',flexDirection:"row" }}>
        <section className='team padding'>
            <div className="container ">

                <AddActivityTask studentId={studentId} coursePlan={structId} tutorId={id} setTask={setTask}/>
                

            </div>
        </section>

        </div>
        
        :null }
      
    </>
  )
}

export default StudentList