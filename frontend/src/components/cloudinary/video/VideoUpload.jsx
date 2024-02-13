import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import './Video.css';
import toast, { Toaster } from 'react-hot-toast';

const VideoUpload = (props) => {
    const [videoInput,setVideoInput] = useState(null);
    const [desc,setDesc] = useState(null);
    const {id} = useParams()

    const handleVideoUpload = (e)=>{
        const file = e.target.files[0];
        setVideoInput(file);
    }

    const handleVideoSubmit = async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('video',videoInput)
        formData.append('description',desc)
        const toastid=toast.loading("Uploading..")
        
        try {
            const response = await axios.post(`http://localhost:8000/tutor/video-upload/${id}`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
                params: {
                    resource_type: 'video',
                },
            });
          
            setVideoInput(null);
            setDesc(null);
            toast.dismiss(toastid)
            toast.success("Upload Successful") 
        } catch (error) {
            console.error("Error Uploading Video :",error) 
        }

        // props.setRenderComponent((prev)=>!prev)
    }

  return (
    <>
<div className="flex justify-center mb-4">
<Toaster />
                        <Stack spacing={2} useFlexGap>
                          <Card variant="outlined" sx={{ width: 400 }}>
                            <CardContent orientation="horizontal">
                            <div className="video-upload-container" style={{marginLeft:"25px"}}>
      
                            <h1>Upload Your Video</h1>
                                <form onSubmit={handleVideoSubmit} className="video-upload-form">
                                  <label htmlFor="video-upload-input" className="video-input-label">
                                    Choose a Video :
                                  </label>
                            
                                  <input
                                    type="file"
                                    id="video-upload-input"
                                    accept="video/*"
                                    name="video"
                                    onChange={handleVideoUpload}
                                    className="video-input"
                                  />

                                  <label htmlFor="video-upload-input" className="video-input-label">
                                    Add Your Video Description :
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Video Description"
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="description-input"
                                  />
                                  <button className="video-upload-btn" type="submit">
                                    Upload Video
                                  </button>
                                </form>
                                </div>
                            </CardContent>                           
                          </Card>
                        </Stack>
                      </div>
                      </>
  )
}

export default VideoUpload