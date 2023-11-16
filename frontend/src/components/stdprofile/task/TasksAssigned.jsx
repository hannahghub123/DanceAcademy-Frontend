import React, { useEffect, useState } from 'react';
import { styled } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import axiosInstance from "../../../axios/stdaxios";
import { useNavigate, useParams } from 'react-router-dom';
import './taskstyle.css';

const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(3),
    textAlign: 'center',
    borderRadius: 5,
    color: theme.vars.palette.text.secondary,
    height: '100%',
    width: '100%', 
  }));


const TasksAssigned = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [taskDetails,setTaskDetails] = useState([]);
    const [isClosed, setIsClosed] = useState(false);

    useEffect(()=>{
        const values={
            id:id
        }
        axiosInstance.post("task-details/",values)
        .then((res)=>{
            console.log(res.data);
            setTaskDetails(res.data.data);
        })
    },[])

    const handleClose = () => {
        // Set the state to close the component
        setIsClosed(true);
      };
    
      if (isClosed) {
        // Return null or any other component when the component is closed
        return null;
      }

      const taskUploadHandle=(id)=>{
        navigate(`../task-upload/${id}`)
      }

  return (
    <>
   <div>

      <span className='close-span' onClick={handleClose}>close
      <i class="fa fa-times" aria-hidden="true"></i>
      </span>

     <div className='task-container' style={{backgroundColor:"#a8d3d0"}}>

        <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ width: '100%',
        marginTop:'7px',
        marginBottom:'7px'}}
        >
          
    {taskDetails.map((item) => (
      <Grid key={item.id} item xs={6} style={{ height: 'auto', width: '400px' }}>
        <Item>
          <div className='d-flex flex-column'>
          <div className='tasknotes-text' >
                <b>Course :   </b>
                <b style={{textTransform:"uppercase"}}>{item.session_assign.course_struct.course.title}</b>
            </div>
            <div className='tasknotes-text'>
                <b>Course-structure :   </b>
                {item.session_assign.course_struct.title}
            </div>
            <div className='tasknotes-text'>
                <b>From :   </b>
                {item.session_assign.tutor.name}
            </div>
            <br />
            <div className='tasknotes-text'>
                <b>Task :   </b>
                {item.task}
              
            </div>

            <button className='task-btn' onClick={()=>taskUploadHandle(item.id)}  style={{position: 'relative', bottom: '5px' }}>  
                <b>{item.status}</b>
            </button>
            
            {/* <div className='tasknotes-text'>
              <span className='ml-4 '><i className="fas fa-edit icon"></i></span>

              <span className='ml-1 '><i className="fas fa-trash icon"></i></span>
            </div> */}
            
          </div>
        </Item>
      </Grid>
    ))}

    </Grid>
    </div>
    </div>
    </>
  )
}

export default TasksAssigned