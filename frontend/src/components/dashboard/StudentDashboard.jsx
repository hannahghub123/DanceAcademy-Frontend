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
import axiosInstance from '../../axios/stdaxios'
import './dashboardStyle.css';
import { useNavigate } from 'react-router-dom';


const StudentDashboard = () => {

  const navigate = useNavigate()

  const [courseDetails,setCourseDetails] = useState([]);
  const [activityDetails,setActivityDetails] = useState([]);
  const [taskCount,setTaskCount] = useState(null);
  const [completedCount,setCompletedCount] = useState(null)
  // const pendingCount = taskCount-completedCount
  const [pendingCount,setPendingCount] = useState(null);
  const [ pendingDetails, setPendingDetails] = useState([]);

  useEffect(()=>{
    const stdData = localStorage.getItem("stdDetails")
    if (stdData){
      const parseData = JSON.parse(stdData)

      const values={
        id:parseData.id
      }

      axiosInstance.post("courseStruct-details/",values)
      .then((res)=>{
        console.log(res.data);
        setCourseDetails(res.data) 
      })

      axiosInstance.post("task-details/",values)
      .then((res)=>{
        console.log(res.data);
        setTaskCount(res.data.taskCount)
        setActivityDetails(res.data.completed_tasks)
        setCompletedCount(res.data.completedCount)

        setPendingCount(res.data.pendingCount)
        setPendingDetails(res.data.pendingTasks)
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



  return (
    <>
      <Back title='Student Dashboard'/>
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
      <Card size="lg" variant="outlined" sx={{width:400}}>
        {/* <Chip size="sm" variant="outlined" color="neutral">
          BASIC
        </Chip> */}
        <Typography level="h2">Courses Purchased</Typography>
        <Divider inset="none" />
        <List size="sm" >
         { courseDetails.map((item)=>(
              <ListItem>
              <ListItemDecorator>
                <Check />
              </ListItemDecorator>
              {item.structId.course.title} - {item.structId.title} Plan
              </ListItem>
         ))}
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
            See More
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
        { activityDetails.map((item)=>(
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
            ))}
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
            See More
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
          { pendingDetails.map((item)=>(
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
          ))}
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
            See More
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
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Virtual Credit Cards
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Financial Analytics
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Checking Account
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            API Integration
          </ListItem>
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: 'auto' }}>
            3.990€{' '}
            <Typography fontSize="sm" textColor="text.tertiary">
              / month
            </Typography>
          </Typography>
          <Button
            variant="soft"
            color="neutral"
            endDecorator={<KeyboardArrowRight />}
          >
            Start now
          </Button>
        </CardActions>
      </Card>
    </Box>
    </div>
    </>
  )
}

export default StudentDashboard