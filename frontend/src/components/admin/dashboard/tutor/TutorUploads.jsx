// import axiosInstance from '../../../../axios/axios';
// import React, { useEffect, useState } from 'react';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import ReactPlayer from 'react-player';
// import Heading from '../../../common/heading/Heading';
// import Sidebar from '../../sidebar/Sidebar';
// import Head from '../../head/Head';

// const TutorUploads = () => {
//     const [videos,setVideos] = useState([]);

//     useEffect(()=>{
//         axiosInstance.post("tutor-uploads/")
//         .then((res)=>{
//             console.log(res.data);
//             setVideos(res.data)
//         })
//         .catch((error)=>{
//             console.error("error fetching videos - ", error);
//         })
//     },[])

//   return (
//     <div>
        
//         <Head title="Tutor Uploads" />
//       <Sidebar />
     
//         <Box>
//             <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginRight:20 }}>
//             {videos.map((item) => (
//                 <Paper key={item.id} elevation={3}>
//                 <li>
//                     <ReactPlayer
//                     url={item.v_upload}
//                     width="100%"
//                     height="200px"
//                     controls
//                     />
//                     <div>Uploaded by - {item.tutors.name}</div>
//                     <h6 className='text-center mt-3'>Uploaded on - {item.up_time}</h6>
//                     <p style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "15px"  }}>{item.desc}</p>
//                 </li>
//                 </Paper>
//             ))}
//             </ul>

//         </Box>
//         </div>
   
//   )
// }

// export default TutorUploads