import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../../axios/tutoraxios';
import Table from 'react-bootstrap/Table';
import Sidebar from '../../sidebar/Sidebar';
import TextField from '@mui/material/TextField';
import Head from '../../head/Head';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {changeDescription,changeTitle} from '../../../../features/admincourseEditSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Course = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const coursedata = useSelector((state)=>state.admincourseEdit)

    const cstructSubmit = (id) =>{
        navigate(`../admin/course-struct/${id}`)
      }

      console.log(coursedata,"hiii");

      const [values,setValues] = useState([]);
      const [courseDetails,setCourseDetails] = useState(false); 
      const [editcourse,setEditCourse] = useState([]); 
      const [image,setImage] = useState('');

      useEffect(()=>{
        axiosInstance.get('courses/')
        .then((res)=>{
            console.log(res.data,"course data ahn ithu")
            setValues(res.data)
        })
      },[editcourse])

      const courseEditHandle = (id)=>{
        const filtered=values.filter((item)=>{
          return(item.id===id)
        })
        setEditCourse(filtered[0])
        setCourseDetails(!courseDetails)
      }

      const handleTitleChange = (e) => {
        console.log(e.target.value,"?????");
        setEditCourse({...editcourse,  title: e.target.value })
        dispatch(changeTitle(e.target.value));
      };
      
      const handleDescriptionChange = (e) => {
        setEditCourse({...editcourse,   description: e.target.value })
        dispatch(changeDescription(e.target.value));
        
      };

      console.log("valuesss",values);

      const imageHandle =(e)=>{
        setImage(e.target.files[0]);
      }

  const handleSubmit = ()=>{

    const coursedatas={
        id:editcourse.id,
        title:editcourse.title,
        description:editcourse.description,
    }

    console.log(coursedatas,"ji");

    axiosInstance.post("admincourse-edit/",coursedatas).then((res)=>{
      console.log(res.data," hi res.data heyy ahn ith");

          if (image){
            const handleSubmitFile = async(e)=>{
              console.log("submitting...");
      
              const formData = new FormData();
              formData.append('image',image)
              formData.append('id',editcourse.id)
              console.log(formData,"Formdataaa");
              try{
                  await axios.post('http://localhost:8000/tutor/courseImage-set/',formData,{
                      headers:{
                          'Content-Type':'multipart/form-data',
                      },
                  })
                  .then((res)=>{
                    console.log(res.data,"??????????");

                    const updatedData = res.data.data;

                    const updatedValues = values.map((value) => {
                      if (value.id === updatedData.id) {
                    console.log(value,"?heee");
                        return {
                          ...value,
                          image: updatedData.image,

                        };
                      } else {

                        return value;
                      }

                      
                    });
                    setValues(updatedValues)
                  })
                  setImage(null);
          
              }catch(error){
                  console.error("Error Creating Post :",error)
              }
              }
          
              handleSubmitFile();

            }
              

    const updatedData = res.data;


    const updatedValues = values.map((value) => {
      if (value.id === updatedData.id) {
    console.log(value,"?/");
        return {
          ...value,
          title: updatedData.title,
          description: updatedData.description,

        };
      } else {

        return value;
      }

      
    });

    setValues(updatedValues)
    setCourseDetails(!courseDetails)

        })

        toast.success("Edits Updated!", {
          position: toast.POSITION.TOP_RIGHT
        });
    }

    console.log(values,"after update");


      
  return (

    <>
    <Head title="Course Details"/>
      <Sidebar/>
       
        <br />
         
        <br />
<br />

<div className='container' style={{maxWidth:"1300px",marginLeft:"200px"}}>
           <Table >
        <thead>
          <tr>
            <th>ID</th>
            <th>IMAGE</th>
            <th>TITLE</th>
            <th></th>
            <th>DESCRIPTION</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
        {values.map((item) => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <img src={item.image} alt="" style={{width:"60px",maxHeight:"70px"}} />
            </td>
            <td>{item.title}</td>
            <td>
            <span className='ml-4' onClick={()=>courseEditHandle(item.id)}><i class="fa-solid fa-pen"></i></span>
            </td>
            <td style={{maxWidth:"400px"}}>{item.description}</td>
    
            <td><button onClick={()=>cstructSubmit(item.id)}>Course Structure</button></td>
          </tr> ))}
        </tbody>
      </Table>

      </div>
      {courseDetails?
          <div
          className="modal"
          style={{ display: 'block', position: 'fixed', marginTop:"20px" }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton onClick={courseEditHandle}>
              <Modal.Title>Edit Course Details </Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              {/* <input 
              type="text" 
              placeholder='Title' 
              // value={}
              style={{width:"100%",height:"40px",marginBottom: "10px"}}/>
              <br /> 
              <input type="text" placeholder='Description' style={{width:"100%",height:"40px",marginBottom: "10px"}}/> */}

            <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={editcourse.title}
            onChange={handleTitleChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={editcourse.description}
            onChange={handleDescriptionChange}
            multiline
            rows={4} 
          />
          <label htmlFor="Change Image"></label>
          <input type="file" onChange={imageHandle}/>
            </Modal.Body>
    
            <Modal.Footer>
              <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      :null}
    </>
  )
}

export default Course