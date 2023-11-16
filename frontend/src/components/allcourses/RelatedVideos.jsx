import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import './Courses.css';

const RelatedVideos = (props) => {

    // const {id} = useParams()
    
    const [videos,setVideos] = useState([]);

    useEffect(()=>{
        const datas ={
            id:props.id
        }
        console.log(datas,"$$$$$$$$$$$");
        axios.post("http://localhost:8000/std/video-lists/",datas)
        .then((res)=>{
            console.log(res.data,"related videoss #######");
            setVideos(res.data.video_urls)
        })
        .catch((error)=>{
            console.error("error fetching videos - ", error);
        })
    },[])

  return (
    <>
        <h1><b>Most Popular Tutor Uploads</b></h1>
        <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 330,
          height: "fit-content",
        },
      }}
    >
      {/* <Paper elevation={0} />
      <Paper /> */}
      

    
      <ul style={{display:"flex","flexDirection":"row"}}>
        {videos.map((item) => (
          <Paper elevation={3} sx={{marginLeft:"15px", marginBottom:"20px"}}>
          <li key={item.id}>
            <video width="300" height="200" controls>
              <source src={item.v_upload} type="video/mp4" />
            </video>
            <p style={{textAlign:"center", fontFamily:"sans-serif",fontSize:"15px"}}>{item.desc} </p>
          </li>
          </Paper>
        ))}
      </ul>
    </Box>
    </>
  )
}

export default RelatedVideos