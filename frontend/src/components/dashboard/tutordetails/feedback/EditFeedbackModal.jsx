import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeFeedback } from '../../../../features/feedbackEditSlice';
import axiosInstance from '../../../../axios/stdaxios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';


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


const EditFeedbackModal = (props) => {

    const [feedbacks,setFeedbacks] = useState([]); 
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()

    const taskvalue = useSelector((state)=>state.feedbackEdit)


    useEffect(()=>{
        const values={
            id:props.id
        }
        axiosInstance.post("get-feedback/",values)
        .then((res)=>{
            console.log(res.data);
            setFeedbacks(res.data)
        })
    },[])

    const feedbackEditHandle=(e)=>{
        setFeedbacks({...feedbacks,feedback:e.target.value})
        dispatch(changeFeedback(e.target.value))
    }

    const handleSubmit=()=>{
        const values={
            id:feedbacks.id,
            feedback:feedbacks.feedback
        }
        axiosInstance.post("feedback-edit/",values)
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
            value={feedbacks.feedback}
            onChange={feedbackEditHandle}  
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

export default EditFeedbackModal