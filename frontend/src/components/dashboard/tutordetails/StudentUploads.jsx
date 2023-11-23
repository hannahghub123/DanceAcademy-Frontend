import axiosInstance from '../../../axios/stdaxios';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Back from '../../common/back/Back';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const StudentUploads = () => {

    const [videos,setVideos] = useState([]);
    const [studentdata,setStudentdata] = useState('');
    const [tutordata,setTutordata] = useState('');
    const [upload,setUpload] = useState('')

    useEffect(()=>{
        const tutorData = localStorage.getItem("tutorDetails")
        const parseData = JSON.parse(tutorData)
        setTutordata(parseData)

        const datas={
          id:parseData.id
        }

        axiosInstance.post("student-uploads/",datas)
        .then((res)=>{
            setVideos(res.data.task_urls)
        })
        .catch((error)=>{
            console.error("error fetching videos - ", error);
        })
    },[])

    const [ addscores,setAddScores] = useState("")
    const [ feedbacks,setFeedbacks] = useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () =>{ 
    //   props.setTask((prev)=> !prev)
        setOpen(false);
    }

    const modalHandle=(studentId,uploadId)=>{
        setStudentdata(studentId);
        setUpload(uploadId)
        handleOpen();
    }

    console.log(videos,"&&&&&77");
    console.log(upload,"&&&&&77");

    const formHandleSubmit=(e)=>{
        e.preventDefault();
        
        const values = {
            score:addscores?addscores:0,
            feedbacks:feedbacks,
            student:studentdata,
            tutor:tutordata.id,
            upload:upload
        }

        axiosInstance.post("add-scores/",values)
        .then((res)=>{
            console.log(res.data);

            toast.success(" Activity Feedback Added Successfully!", {
                position: toast.POSITION.TOP_RIGHT
              });

              handleClose()
        })
    }

  return (
    <div>
        <Back title='Student Uploads' />
        <br />
      
        <Box>

        <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" , marginRight:20}}>
            {videos.map((item, index) => (
              <Paper key={item.id} elevation={3}>
                <li>
                  <video width="100%" height="200" controls>
                    <source src={item.task_upload} type="video/mp4" />
                  </video>
                  <h6 className='text-center'>Uploads From - {item.student.name}</h6>
                  <p style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "15px" }}>{item.description}</p>
                </li>
              </Paper>
            ))}
          </ul> 


    </Box>


    <Modal open={open} onClose={handleClose} className='edit-modal'>
        <Box sx={style}>
            <Typography variant="h6" component="h2">
            Add Scores & Feedbacks 
            </Typography>
            <div className="trsignup-container">
                <form onSubmit={formHandleSubmit}>
                <input
                    label="Add Scores"
                    variant="outlined"
                    fullWidth
                    type='number'
                    className='trsignup-input'
                    placeholder='Add Scores-'
                    onChange={(e)=>setAddScores(e.target.value)}
                />

                <br />
                <input
                    label="Add Feedbacks"
                    variant="outlined"
                    fullWidth
                    type='text'
                    className='trsignup-input'
                    placeholder='Add Feedbacks -'
                    onChange={(e)=>setFeedbacks(e.target.value)}
                />
                <br />

                <button className='edit-btn mt-2'>
                Add
                </button>

                </form>
            </div>
        </Box>
    </Modal>
    </div>
  )
}

export default StudentUploads