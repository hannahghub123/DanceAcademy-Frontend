import React, { useEffect, useState } from 'react'
import Back from '../common/back/Back';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import axiosInstance from '../../axios/tutoraxios'
import './dashboardStyle.css';
import { useNavigate } from 'react-router-dom';

const TutorDashboard = () => {

    const navigate = useNavigate()

    const [myuploads,setMyuploads] = useState([]);
    const [uploadCount,setUploadCount] = useState(null);
    const [payDetails,setPayDetails] = useState([]);
    const [totalCount,setTotalCount] = useState(null);
  
    useEffect(()=>{
      const tutorData = localStorage.getItem("tutorDetails")
      if (tutorData){
        const parseData = JSON.parse(tutorData)
  
        const values={
          id:parseData.id
        }
  
        axiosInstance.post("video-lists/",values)
        .then((res)=>{
          console.log(res.data);
          setMyuploads(res.data.video_urls) 
          setUploadCount(res.data.uploadCount)
        })

        axiosInstance.post("pay-details/",values)
        .then((res)=>{
            console.log(res.data.paydata);
            setPayDetails(res.data.paydata);
            setTotalCount(res.data.totalCount)
        })
  
      }
    },[])
  
    const coursePurchasedHandle=()=>{
      navigate('../course-purchased')
    }
  
    const completedActivityHandle=()=>{
      navigate("../completed-activities")
    }
  
    const pendingActivityHandle=()=>{
      navigate('../pending-activities')
    }

    const studentAssignedHandle=()=>{
        navigate('../students-assigned/')
    }
  
  return (
    <>
        <Back title="Tutor's Dashboard"/>

        <h1> </h1>
    
    <div className='dashboard-container'>
        <Box
        sx={{
          display:'flex',
          flexDirection:'row',
          gap:5,
          marginLeft:3,
        }}
    >
        <Card size="lg" variant="outlined" sx={{width:350}}>
        {/* <Chip size="sm" variant="outlined" color="neutral">
          BASIC
        </Chip> */}
        <Typography level="h2">My Uploads</Typography>
        <Divider inset="none" />
        <List size="sm" >
         { myuploads.map((item)=>(<ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Uploaded on - {item.up_time}
          </ListItem>
          ))}
         
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: 'auto' }}>
            {uploadCount}{' '}
            <Typography fontSize="sm" textColor="text.tertiary">
             Uploads
            </Typography>
          </Typography>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
          >
            View in Detail
          </Button>
        </CardActions>
      </Card>
      <Card size="lg" variant="outlined" sx={{width:400}}>
        {/* <Chip size="sm" variant="outlined" color="neutral">
          BASIC
        </Chip> */}
        <Typography level="h2">Students Assigned</Typography>
        <Divider inset="none" />
        <List size="sm" >
         { payDetails.map((item)=>(
            <>
              <ListItem sx={{textTransform:'uppercase'}}>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              {item.studentId.name} 
              </ListItem>
              <Typography>
                <b>Course</b> - {item.structId.course.title} / {item.structId.title} 
              </Typography>
            </>
         ))}
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: 'auto' }}>
            {totalCount}{' '}
            <Typography fontSize="sm" textColor="text.tertiary">
              Students
            </Typography>
          </Typography>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            onClick={studentAssignedHandle}
          >
            View in Detail
          </Button>
        </CardActions>
      </Card>

      <Card size="lg" variant="outlined" sx={{width:400}}>
        {/* <Chip size="sm" variant="outlined" color="neutral">
          BASIC
        </Chip> */}
        <Typography level="h2">Student Uploads</Typography>
        <Divider inset="none" />
        <List size="sm" >
         { payDetails.map((item)=>(
            <>
              <ListItem sx={{textTransform:'uppercase'}}>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              {item.studentId.name} 
              </ListItem>
              <Typography>
                <b>Course</b> - {item.structId.course.title} / {item.structId.title} 
              </Typography>
            </>
         ))}
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: 'auto' }}>
            {/* {pendingCount}{' '} */}
            <Typography fontSize="sm" textColor="text.tertiary">
              {/* / {taskCount} */}
            </Typography>
          </Typography>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            onClick={pendingActivityHandle}
          >
            See More
          </Button>
        </CardActions>
      </Card>

      <Card size="lg" variant="outlined" sx={{width:420}}>
        {/* <Chip size="sm" variant="outlined" color="neutral">
          BASIC
        </Chip> */}
        <Typography level="h2">Scores & Feedbacks Given </Typography>
        <Divider inset="none" />
        <List size="sm" >
        {/* { activityDetails.map((item)=>( */}
        <> <ListItem>
              <ListItemDecorator>
              <Check />
            </ListItemDecorator>
           {/* Task from - {item.session_assign.tutor.name} */}
          </ListItem>
          <Typography 
              sx={{overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1
              }}>
            <b>Task : </b>
            {/* {item.task} */}
          </Typography>
          </>
            {/* ))} */}
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: 'auto' }}>
            {/* {completedCount}{' '} */}
            <Typography fontSize="sm" textColor="text.tertiary">
              {/* / {taskCount}  */}
            </Typography>
          </Typography>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            onClick={completedActivityHandle}
          >
            See More
          </Button>
        </CardActions>
      </Card>
      
    </Box>
    </div>
    </>
  )
}

export default TutorDashboard