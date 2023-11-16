import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../../../axios/tutoraxios';
import Table from 'react-bootstrap/Table';
import Sidebar from '../../sidebar/Sidebar';
import TextField from '@mui/material/TextField';
import Head from '../../head/Head';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {changeDescription,changeDuration,changeLevels,changeNumofClasses,changePrice,changePriceper,changeTitle} from '../../../../features/coursestructureSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseStruct = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [values,setValues] = useState([]);
    const [coursestructDetails,setCourseStructDetails] = useState(false); 
    const [editcourseStruct,setEditCourseStruct] = useState([]); 

    useEffect(()=>{
        axiosInstance.get(`course-struct/${id}`)
        .then((res)=>{
            console.log(res.data,"course struct data ahn")
            setValues(res.data)
        })
    },[])

    const courseStructEditHandle = (id)=>{
      const filtered = values.filter((item)=>{
        return(item.id===id)
      })
      setEditCourseStruct(filtered[0])
      setCourseStructDetails(!coursestructDetails)
    }

    const handleTitleChange = (e) => {
      console.log(e.target.value,"?????");
      setEditCourseStruct({...editcourseStruct,  title: e.target.value })
      dispatch(changeTitle(e.target.value));
    };
    const handleDurationChange = (e) => {
      console.log(e.target.value,"?????");
      setEditCourseStruct({...editcourseStruct,  duration: e.target.value })
      dispatch(changeDuration(e.target.value));
    };
    const handlePriceChange = (e) => {
      console.log(e.target.value,"?????");
      setEditCourseStruct({...editcourseStruct,  price: e.target.value })
      dispatch(changePrice(e.target.value));
    };
    const handleDescChange = (e) => {
      console.log(e.target.value,"?????");
      setEditCourseStruct({...editcourseStruct,  description: e.target.value })
      dispatch(changeDescription(e.target.value));
    };
    const handleClassesChange = (e) => {
      console.log(e.target.value,"?????");
      setEditCourseStruct({...editcourseStruct,  num_of_classes: e.target.value })
      dispatch(changeNumofClasses(e.target.value));
    };
    const handleLevelsChange = (e) => {
      console.log(e.target.value,"?????");
      setEditCourseStruct({...editcourseStruct,  levels: e.target.value })
      dispatch(changeLevels(e.target.value));
    };
    const handlePriceperChange = (e) => {
      console.log(e.target.value,"?????");
      setEditCourseStruct({...editcourseStruct,  price_per: e.target.value })
      dispatch(changePriceper(e.target.value));
    };

    const handleSubmit = ()=>{
      const coursevalues = {
        id:editcourseStruct.id,
        title:editcourseStruct.title,
        duration:editcourseStruct.duration,
        price:editcourseStruct.price,
        description:editcourseStruct.description,
        num_of_classes:editcourseStruct.num_of_classes,
        levels:editcourseStruct.levels,
        price_per:editcourseStruct.price_per,
      }

      console.log(coursevalues);

      axiosInstance.post("course-structedit/",coursevalues)
      .then((res)=>{
        console.log(res.data);

        const updatedData = res.data;


        const updatedValues = values.map((value) => {
          if (value.id === updatedData.id) {
        console.log(value,"?/");
            return {
              ...value,
              title: updatedData.title,
              duration:updatedData.duration,
              price:updatedData.price,
              description: updatedData.description,
              num_of_classes:updatedData.num_of_classes,
              levels:updatedData.levels,
              price_per:updatedData.price_per
    
            };
          } else {
    
            return value;
          }
        });
    
        setValues(updatedValues)
        setCourseStructDetails(!coursestructDetails)
    
      })

      toast.success("Edits Updated!", {
        position: toast.POSITION.TOP_RIGHT
      });
    }

  return (
    <>
      <Head title="Course-Structure Details"/>
      <Sidebar/>
       
        <br />
      <br /> <br />
      <div className='container' style={{maxWidth:"1320px",marginLeft:"200px"}}>
                <Table responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th></th>
            <th>LEVEL</th>
            <th>DESCRIPTION</th>
            <th>DURATION</th>
            <th>NO. OF CLASSES</th>
            <th>PRICE</th>
           
    
          </tr>
        </thead>
        <tbody>
        {values.map((item) => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>
            <span className='ml-1 mr-2' onClick={()=>courseStructEditHandle(item.id)} ><i class="fa-solid fa-pen"></i></span>
            </td>
            <td>{item.levels}</td>
            <td>{item.description}</td>
            <td>{item.duration} Min</td>
            <td>{item.num_of_classes}</td>
            <td>{item.price}/{item.price_per}</td>
           
          </tr> ))}
        </tbody>
      </Table>
      </div>

      {coursestructDetails?
          <div
          className="modal"
          style={{ display: 'block', position: 'fixed', marginTop:"20px" }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton onClick={courseStructEditHandle}>
              <Modal.Title>Edit Course Details </Modal.Title>
            </Modal.Header>
    
            <Modal.Body>

            <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={editcourseStruct.title}
            onChange={handleTitleChange}
          />
          <TextField
            label="Duration"
            variant="outlined"
            fullWidth
            value={editcourseStruct.duration}
            onChange={handleDurationChange}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={editcourseStruct.price}
            onChange={handlePriceChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={editcourseStruct.description}
            onChange={handleDescChange}
            multiline
            rows={4} 
          />
          <TextField
            label="No. of Classes"
            variant="outlined"
            fullWidth
            value={editcourseStruct.num_of_classes}
            onChange={handleClassesChange}
          />
          <TextField
            label="Level"
            variant="outlined"
            fullWidth
            value={editcourseStruct.levels}
            onChange={handleLevelsChange}
          />
          <TextField
            label="Price-Per"
            variant="outlined"
            fullWidth
            value={editcourseStruct.price_per}
            onChange={handlePriceperChange}
          />
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

export default CourseStruct