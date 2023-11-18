import React, { useEffect, useState } from 'react';
import { changeTask } from '../../../../features/taskeditSlice';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axiosInstance from '../../../../axios/tutoraxios';
import { useDispatch, useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    marginTop:5 ,
    p: 4,
  };

const EditTasksModal = (props) => {

    const [tasks,setTasks] = useState([]); 
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()

    const taskvalue = useSelector((state)=>state.taskEdit)


    useEffect(()=>{
        const values={
            id:props.id
        }
        axiosInstance.post("get-task/",values)
        .then((res)=>{
            console.log(res.data);
            setTasks(res.data)
        })
    },[])

    const notesEditHandle=(e)=>{
        setTasks({...tasks,task:e.target.value})
        dispatch(changeTask(e.target.value))
    }

    const handleSubmit=()=>{
        const values={
            id:tasks.id,
            task:tasks.task
        }
        axiosInstance.post("task-edit/",values)
        .then((res)=>{
            console.log(res.data);
            props.setRender((prev)=> !prev)
        })
        handleClose()
    }

  return (
    <div>
         <Modal open={open} onClose={handleClose} className='edit-modal'>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Edit Tasks
          </Typography>
          <br />

          <TextField
            label="Edit notes"
            variant="outlined"
            fullWidth
            multiline
            rows={4} 
            value={tasks.task}
            onChange={notesEditHandle}  
          />

          <br /><br />

          <button className='edit-btn'  onClick={handleSubmit}>
           Edit Notes
          </button>
        </Box>
      </Modal>
    </div>
  )
}

export default EditTasksModal