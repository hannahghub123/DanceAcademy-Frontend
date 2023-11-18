import axiosInstance from '../../../axios/tutoraxios';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Back from '../../common/back/Back';
import ReactPlayer from 'react-player';


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

    <Back title='My Uploads' />
    <br />
      <h2 className='text-center mb-4' style={{textTransform:'uppercase'}}>Videos By - {data.name}</h2>
        <Box
      // sx={{
      //   display: 'flex',
      //   flexWrap: 'wrap',
      //   '& > :not(style)': {
      //     m: 1,
      //     width: 330,
      //     height: "fit-content",
      //   },
      // }}
    >

{/* <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" , marginRight:20}}>
  {videos.map((item, index) => (
    <Paper key={item.id} elevation={3}>
       <li key={item.id}>
            <video width="100%" height="200" controls>
              <source src={item.v_upload} type="video/mp4" />
            </video>
            <p style={{textAlign:"center", fontFamily:"sans-serif",fontSize:"15px"}}>{item.desc} </p>
          </li>
          </Paper>
        ))}
      </ul> */}


<ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginRight:20 }}>
  {videos.map((item, index) => (
    <Paper key={item.id} elevation={3}>
      <li>
        <ReactPlayer
          url={item.v_upload}
          width="100%"
          height="200px"
          controls
        />
        <h6 className='text-center mt-3'>Uploaded on - {item.up_time}</h6>
        <p style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "15px"  }}>{item.desc}</p>
      </li>
    </Paper>
  ))}
</ul>

    </Box>

    </>
  )
}

export default VideoList