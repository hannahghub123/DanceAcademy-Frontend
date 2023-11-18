import axiosInstance from '../../../../axios/stdaxios'
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 30,
  marginTop:3 ,
  p: 4,
};

const AddActivityTask = (props) => {

    const studentId=props.studentId
    const coursePlan = props.coursePlan
    const tutorId = props.tutorId

    console.log(studentId,coursePlan,"????????",tutorId);
    const [ addTask,setAddTask] = useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () =>{ 
      props.setTask((prev)=> !prev)
      setOpen(false);
    }

    useEffect(()=>{
      handleOpen()
    },[])

    const activityTaskHandle=(e)=>{
        e.preventDefault();

        const values={
            studentId:studentId,
            coursePlan:coursePlan,
            tutorId: tutorId,
            task:addTask
        }
        console.log(values,"task values??????");
        axiosInstance.post("add-activityTask/",values)
        .then((res)=>{
            console.log(res.data,"456284521");
            

            toast.success(" Activity Task Added Successfully!", {
                position: toast.POSITION.TOP_RIGHT
              });
        })
        props.setTask((prev)=> !prev)
        handleClose()
    }



  return (
    <>
     <Modal open={open} onClose={handleClose} className='edit-modal'>
        <Box sx={style}>
        <Typography variant="h6" component="h2">
           Add Your Activity Here -
          </Typography>
          <div className="trsignup-container">
            <form onSubmit={activityTaskHandle}>
              <input
                required
                label="Add notes"
                variant="outlined"
                fullWidth
                className='trsignup-input'
                placeholder='Add Activity Task -'
                onChange={(e)=>setAddTask(e.target.value)}
              />

              <br />

              <button className='edit-btn mt-2'>
              Add
              </button>

            </form>
        </div>
    </Box>
      </Modal>
  
    </>
  )
}

export default AddActivityTask