import axiosInstance from '../../../axios/stdaxios';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Back from '../../common/back/Back';
import 'react-toastify/dist/ReactToastify.css';

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

const MyUploads = () => {

  const [ uploadsDetails, setUploadsDetails] = useState([]);

  useEffect(()=>{
    const stdData = localStorage.getItem("stdDetails")
    if(stdData){
      const parseData = JSON.parse(stdData);

      const values={
        id:parseData.id
      }

      axiosInstance.post("my-uploads/",values)
      .then((res)=>{
        setUploadsDetails(res.data.task_urls)
      })
    }
  },[])

  return (
    <div>
        <Back title='My Uploads' />
        <br />
      
        <Box>

        <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" , marginRight:20}}>
            {uploadsDetails.map((item, index) => (
              <Paper key={item.id} elevation={3}>
                <li>
                  <video width="100%" height="200" controls>
                    <source src={item.task_upload} type="video/mp4" />
                  </video>
                  <p  className='text-center'>{item.activity_assign.course} / {item.activity_assign.course_struct} Plan</p>
                  <h6 className='text-center'>Task - {item.activity_assign.task}</h6>
                  <p style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "15px" }}>Description: {item.description}</p>
                </li>
              </Paper>
            ))}
          </ul> 


    </Box>
    </div>
  )
}

export default MyUploads