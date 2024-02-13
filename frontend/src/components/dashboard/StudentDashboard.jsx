import React, { useEffect, useState } from 'react'
import Back from '../common/back/Back';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import axiosInstance from '../../axios/stdaxios'
import './dashboardStyle.css';
import { useNavigate } from 'react-router-dom';
import './dashboardStyle.css'

const StudentDashboard = () => {

  const navigate = useNavigate()

  const [courseDetails,setCourseDetails] = useState([]);
  const [activityDetails,setActivityDetails] = useState([]);
  const [taskCount,setTaskCount] = useState(null);
  const [completedCount,setCompletedCount] = useState(null)
  // const pendingCount = taskCount-completedCount
  const [pendingCount,setPendingCount] = useState(null);
  const [ pendingDetails, setPendingDetails] = useState([]);
  const [ feedbackDetails, setFeedbackDetails] = useState([]);
  const [ uploadsDetails, setUploadsDetails] = useState([]);

  useEffect(()=>{
    const stdData = localStorage.getItem("stdDetails")
    if (stdData){
      const parseData = JSON.parse(stdData)

      const values={
        id:parseData.id
      }

      axiosInstance.post("courseStruct-details/",values)
      .then((res)=>{
        setCourseDetails(res.data) 
      })

      axiosInstance.post("task-details/",values)
      .then((res)=>{
        setTaskCount(res.data.taskCount)
        setActivityDetails(res.data.completed_tasks)
        setCompletedCount(res.data.completedCount)

        setPendingCount(res.data.pendingCount)
        setPendingDetails(res.data.pendingTasks)
      })

      
      axiosInstance.post("feed-details/",values)
      .then((res)=>{
        setFeedbackDetails(res.data.tutors)
      })

      axiosInstance.post("my-uploads/",values)
      .then((res)=>{
          setUploadsDetails(res.data.task_urls)
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

  const feedbackDetailsHandle=()=>{
    navigate('../feedback-details')
  }

  const myuploadsHandle=()=>{
    navigate('../student-my-uploads')
  }



  return (
    <>
      <Back title='Student Dashboard'/>
        <h1> </h1>
    
    <div className='dashboard-container'>

    <Card size="lg" variant="outlined" sx={{width:400}}>
        {/* <Chip size="sm" variant="outlined" color="neutral">
          BASIC
        </Chip> */}
        <Typography level="h2">My Uploads</Typography>
        <Divider inset="none" />
        <List size="sm" >
         {uploadsDetails? uploadsDetails.map((item)=>(
          <>
              <ListItem>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              Uploaded on - {item.up_time}
              </ListItem>
          </>
         )):""}
        </List>
        <Divider inset="none" />
        <CardActions>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            onClick={myuploadsHandle}
          >
            View More
          </Button>
        </CardActions>
      </Card>


      <Card size="lg" variant="outlined" sx={{width:400}}>
        {/* <Chip size="sm" variant="outlined" color="neutral">
          BASIC
        </Chip> */}
        <Typography level="h2">Courses Purchased</Typography>
        <Divider inset="none" />
        <List size="sm" >
         {courseDetails? courseDetails.map((item)=>(
              <ListItem>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              {item.structId.course.title} - {item.structId.title} Plan
              </ListItem>
         )):" "}
        </List>
        <Divider inset="none" />
        <CardActions>
          {/* <Typography level="title-lg" sx={{ mr: 'auto' }}>
            3.990€{' '}
            <Typography fontSize="sm" textColor="text.tertiary">
              / month
            </Typography>
          </Typography> */}
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            onClick={coursePurchasedHandle}
          >
            View More
          </Button>
        </CardActions>
      </Card>

      <Card size="lg" variant="outlined" sx={{width:420}}>
        {/* <Chip size="sm" variant="outlined" color="neutral">
          BASIC
        </Chip> */}
        <Typography level="h2">Completed Activities </Typography>
        <Divider inset="none" />
        <List size="sm" >
        {activityDetails? activityDetails.map((item)=>(
        <> <ListItem>
              <ListItemDecorator>
              <Check />
            </ListItemDecorator>
           Task from - {item.session_assign.tutor.name}
          </ListItem>
          <Typography 
              sx={{overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1
              }}>
            <b>Task : </b>
            {item.task}
          </Typography>
          </>
            )):""}
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: 'auto' }}>
            {completedCount}{' '}
            <Typography fontSize="sm" textColor="text.tertiary">
              / {taskCount} 
            </Typography>
          </Typography>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            onClick={completedActivityHandle}
          >
            View More
          </Button>
        </CardActions>
      </Card>

      <Card size="lg" variant="outlined" sx={{width:400}}>
        {/* <Chip size="sm" variant="outlined" color="neutral">
          BASIC
        </Chip> */}
        <Typography level="h2">Pending Activities</Typography>
        <Divider inset="none" />
        <List size="sm" >
          {pendingDetails? pendingDetails.map((item)=>(
             <>
             <ListItem>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              Task from - {item.session_assign.tutor.name}
            </ListItem>
            <Typography
            sx={{overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1
            }}>
              <b>Task : </b>
                {item.task}
            </Typography>
            </>
          )):""}
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: 'auto' }}>
            {pendingCount}{' '}
            <Typography fontSize="sm" textColor="text.tertiary">
              / {taskCount}
            </Typography>
          </Typography>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            onClick={pendingActivityHandle}
          >
            View More
          </Button>
        </CardActions>
      </Card>
      <Card size="lg" variant="outlined" sx={{width:400}}>
        {/* <Chip size="sm" variant="outlined" color="neutral">
          BASIC
        </Chip> */}
        <Typography level="h2">Scores & Feedbacks</Typography>
        <Divider inset="none" />
        <List size="sm" >
         {feedbackDetails?feedbackDetails.map((item)=>(
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Feedback From - {item.name}
          </ListItem>
         )):" " }
        </List>
        <Divider inset="none" />
        <CardActions>
          {/* <Typography level="title-lg" sx={{ mr: 'auto' }}>
            3.990€{' '}
            <Typography fontSize="sm" textColor="text.tertiary">
              / month
            </Typography>
          </Typography> */}
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
            onClick={feedbackDetailsHandle}
          >
            View More
          </Button>
        </CardActions>
      </Card>
    {/* </Box> */}
    </div>
    </>
  )
}

export default StudentDashboard