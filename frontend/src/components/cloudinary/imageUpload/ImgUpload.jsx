import React, { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ImgUpload = () => {

    const [image, setImage] = useState(null);
    const {id} = useParams()

    const handleFileInputChange = (e)=>{
        const file = e.target.files[0];
        setImage(file);
    }

    const handleSubmitFile = async(e)=>{
        e.preventDefault();

    const formData = new FormData();
    formData.append('image',image)
    formData.append('id',id)
    try{
        await axios.post('http://localhost:8000/tutor/image-set/',formData,{
            headers:{
                'Content-Type':'multipart/form-data',
            },
        })
        setImage(null);
        // setDescription('')

    }catch(error){
        console.error("Error Creating Post :",error)
    }
    // onClose();
    }

    
  return (
    <>
    <h1>Upload Here</h1>
        <form onSubmit={handleSubmitFile} className='form'>
            <input 
            type="file"
            name="image"
            onChange={handleFileInputChange}
            // value={image}
            className='form-input' 
            />
            <button className="btn" type='submit'>Submit</button>
        </form>
        {/* {image && (
            <img src={image} alt="chosen"
            style={{height:'300px'}} />
        )} */}
    </>
  )
}

export default ImgUpload