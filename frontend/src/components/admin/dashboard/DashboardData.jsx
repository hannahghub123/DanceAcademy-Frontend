import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import axiosInstance from '../../../axios/axios';
import Button from '@mui/joy/Button';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';

const DashboardData = () => {

    const navigate = useNavigate()

    const [studentsCount,setstudentsCount] = useState(null)
    const [tutorsCount,setTutorsCount] = useState(null)
    const [coursesCount,setCoursesCount] = useState(null)
    // const [tutorUploadsCount,setTutorUploadsCount] = useState(null)
    // const [stdUploadsCount,setStudentUploadsCount] = useState(null)
    // const [taskCount,setTaskCount] = useState(null)
    // const [feedbackCount,setFeedbackCount] = useState(null)

    useEffect(()=>{
        axiosInstance.post("count/")
        .then((res)=>{
            console.log(res.data);
            setstudentsCount(res.data.stdCount)
            setTutorsCount(res.data.tutorCount)
            setCoursesCount(res.data.courseCount)
            // setStudentUploadsCount(res.data.stdUploadcount)
            // setTutorUploadsCount(res.data.tutorUploadcount)
            // setTaskCount(res.data.taskCount)
            // setFeedbackCount(res.data.feedbackCount)
        })
    },[])

    const studentlistHandle=()=>{
        navigate('../admin/student/')
    }

    const tutorlistHandle=()=>{
        navigate('../admin/tutor/')
    }

    const courselistHandle=()=>{
      navigate('../admin/courses/')
    }



  return (
    <div>
        <br />
      <Box
        sx={{
          display: 'flex',
          flexDirection:'row',
          flexWrap:'wrap',
        //   justifyContent:'center',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Adjust the minmax values for width
          gap: 5, // Adjust the gap between cards
          marginTop: 10,
          marginLeft: 30,
        //   marginRight:30
        }}
      >
        <Card variant="soft" sx={{ height: '200px', width:'350px' ,backgroundColor:'lightgrey'  }}>
          <CardContent>
            <Typography level="title-md">NUMBER OF STUDENTS</Typography>
            <Typography sx={{ fontSize: '50px' }}>{studentsCount}</Typography>
          </CardContent>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            onClick={studentlistHandle}
          >
            View in Detail
          </Button>
        </Card>

        <Card variant="soft" sx={{ height: '200px', width:'350px',backgroundColor:'lightgrey' }}>
          <CardContent>
            <Typography level="title-md">NUMBER OF TUTORS</Typography>
            <Typography sx={{ fontSize: '50px' }}>{tutorsCount}</Typography>
          </CardContent>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            onClick={tutorlistHandle}
          >
            View in Detail
          </Button>
        </Card>

        <Card variant="soft" sx={{ height: '200px', width:'350px' ,backgroundColor:'lightgrey'}}>
          <CardContent>
            <Typography level="title-md">NUMBER OF COURSES</Typography>
            <Typography sx={{ fontSize: '50px' }}>{coursesCount}</Typography>
          </CardContent>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            onClick={courselistHandle}
          >
            View in Detail
          </Button>
        </Card>

        {/* <Card variant="soft" sx={{ height: '200px', width:'350px',backgroundColor:'lightgrey' }}>
          <CardContent>
            <Typography level="title-md">TUTOR UPLOADS</Typography>
            <Typography sx={{ fontSize: '50px' }}>{tutorUploadsCount}</Typography>
          </CardContent>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            // onClick={tutorUploadtHandle}
          >
            View in Detail
          </Button>
        </Card>

        <Card variant="soft" sx={{ height: '200px', width:'350px',backgroundColor:'lightgrey' }}>
          <CardContent>
            <Typography level="title-md">STUDENT UPLOADS</Typography>
            <Typography sx={{ fontSize: '50px' }}>{stdUploadsCount}</Typography>
          </CardContent>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            // onClick={stdUploadHandle}
          >
            View in Detail
          </Button>
        </Card>

        <Card variant="soft" sx={{ height: '200px', width:'350px',backgroundColor:'lightgrey' }}>
          <CardContent>
            <Typography level="title-md">TASKS ASSIGNED</Typography>
            <Typography sx={{ fontSize: '50px' }}>{taskCount}</Typography>
          </CardContent>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            // onClick={tasksAssignedHandle}
          >
            View in Detail
          </Button>
        </Card>

        <Card variant="soft" sx={{ height: '200px', width:'350px',backgroundColor:'lightgrey' }}>
          <CardContent>
            <Typography level="title-md">FEEDBACKS GIVEN</Typography>
            <Typography sx={{ fontSize: '50px' }}>{feedbackCount}</Typography>
          </CardContent>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            // onClick={feedbacksgivenHandle}
          >
            View in Detail
          </Button>
        </Card> */}
      </Box>
      <br />
      <br />
    </div>
  );
};

export default DashboardData;
