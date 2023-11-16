import axiosInstance from '../../../axios/tutoraxios';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const VideoList = () => {
    const [videos,setVideos] = useState([]);
    const [data,setData] = useState('');

    useEffect(()=>{
        const tutorData = localStorage.getItem("tutorDetails")
        const parseData = JSON.parse(tutorData)
        setData(parseData)
        console.log("tdata in videolist",tutorData,"?????",parseData);
        const datas={
          id:parseData.id
        }

        console.log("dataa",datas);
        axiosInstance.post("video-lists/",datas)
        .then((res)=>{
            // console.log(res.data,"Videosssss");
            // console.log("videourlss",res.data.video_urls);
            setVideos(res.data.video_urls)
        })
        .catch((error)=>{
            console.error("error fetching videos - ", error);
        })
    },[])

     console.log("video state",videos);
  return (
    <>
      <h2 style={{textAlign:"center", textTransform:"uppercase",marginBottom:"25px"}}>Videos By - {data.name} </h2>
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

export default VideoList