import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Modal, Button, Pagination } from 'react-bootstrap';
import axiosInstance from '../../../../axios/tutoraxios';
import { useDispatch, useSelector } from 'react-redux';
import { changeDescription, changeTitle, changeStatus } from '../../../../features/admincourseEditSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Head from '../../head/Head';
import Sidebar from '../../sidebar/Sidebar';
import { AddDescription, AddTitle } from '../../../../features/addCourseSlice';

const Course = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const coursedata = useSelector((state) => state.admincourseEdit);
  const newcourse = useSelector((state) => state.newCourse);

  const cstructSubmit = (id) => {
    navigate(`../admin/course-struct/${id}`);
  };

  console.log(coursedata, 'hiii');

  const [allValues, setAllValues] = useState([]);
  const [values, setValues] = useState([]);
  const [courseDetails, setCourseDetails] = useState(false);
  const [editcourse, setEditCourse] = useState([]);
  const [image, setImage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [addcourseDetails,setAddcourseDetails] = useState(false)
  const [addcourse,setAddcourse] = useState('')

  useEffect(() => {
    axiosInstance.get('courses/').then((res) => {
      console.log(res.data, 'course data ahn ithu');
      setAllValues(res.data);
      setValues(res.data.slice(0, perPage));
    });
  }, [editcourse, perPage,addcourse]);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return allValues.slice(startIndex, endIndex);
  };

  const courseEditHandle = (id) => {
    const filtered = values.filter((item) => {
      return item.id === id;
    });
    setEditCourse(filtered[0]);
    setCourseDetails(!courseDetails);
  };

  const handleTitleChange = (e) => {
    setEditCourse({ ...editcourse, title: e.target.value });
    dispatch(changeTitle(e.target.value));
  };

  const handleStatusChange = (e) => {
    setEditCourse({ ...editcourse, status: e.target.value });
    dispatch(changeStatus(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    setEditCourse({ ...editcourse, description: e.target.value });
    dispatch(changeDescription(e.target.value));
  };

  const imageHandle = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    const coursedatas = {
      id: editcourse.id,
      title: editcourse.title,
      description: editcourse.description,
      status: editcourse.status
    };

    console.log(coursedatas, 'ji');

    axiosInstance.post('admincourse-edit/', coursedatas).then((res) => {
      console.log(res.data, ' hi res.data heyy ahn ith');

      if (image) {
        const handleSubmitFile = async (e) => {
          console.log('submitting...');

          const formData = new FormData();
          formData.append('image', image);
          formData.append('id', editcourse.id);
          console.log(formData, 'Formdataaa');
          try {
            await axios.post('http://localhost:8000/tutor/courseImage-set/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }).then((res) => {
              console.log(res.data, '??????????');

              const updatedData = res.data.data;

              const updatedValues = values.map((value) => {
                if (value.id === updatedData.id) {
                  console.log(value, '?heee');
                  return {
                    ...value,
                    image: updatedData.image,
                  };
                } else {
                  return value;
                }
              });
              setValues(updatedValues);
            });
            setImage(null);
          } catch (error) {
            console.error('Error Creating Post :', error);
          }
        };

        handleSubmitFile();
      }

      const updatedData = res.data;

      const updatedValues = values.map((value) => {
        if (value.id === updatedData.id) {
          console.log(value, '?/');
          return {
            ...value,
            title: updatedData.title,
            description: updatedData.description,
            status: updatedData.status
          };
        } else {
          return value;
        }
      });

      setValues(updatedValues);
      setCourseDetails(!courseDetails);
    });

    toast.success('Edits Updated!', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const closeHandle=()=>{
    setAddcourseDetails(!addcourseDetails)
  }

  const addcourseHandle=()=>{
    setAddcourseDetails(!addcourseDetails)
  }

  const handleAddTitle=(e)=>{
    setAddcourse({ ...addcourse, title: e.target.value });
    dispatch(AddTitle(e.target.value));
  }

  const handleAddDescription=(e)=>{
    setAddcourse({ ...addcourse, description: e.target.value });
    dispatch(AddDescription(e.target.value));
  }

  const AddCourseSubmit=()=>{
    const values = {
      title : addcourse.title,
      description:addcourse.description
    }
    axiosInstance.post('add-course/',values)
    .then((res)=>{
      console.log(res.data);
      if(res.data.message === "success"){
        setAddcourseDetails(!addcourseDetails)
        toast.success(" New Course Added!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    })
  }

  return (
    <>
      <Head title="Course Details" />
      <Sidebar />

      <br />
<br />

      <button style={{marginLeft:1200}} onClick={addcourseHandle}>Add New Course</button>
      <br />
      <br />

      <div className="container" style={{ maxWidth: '1300px', marginLeft: '200px' }}>
        <Table>
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
            {getCurrentPageData().map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img src={item.image} alt="" style={{ width: '60px', maxHeight: '70px' }} />
                  <div>[{item.status}] </div>
                </td>
                <td>{item.title}</td>
                <td>
                  <span className="ml-4" onClick={() => courseEditHandle(item.id)}>
                    <i className="fa-solid fa-pen"></i>
                  </span>
                </td>
                <td style={{ maxWidth: '400px' }}>{item.description}</td>

                <td>
                  <button onClick={() => cstructSubmit(item.id)}>Course Structure</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          {[...Array(Math.ceil(allValues.length / perPage))].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>


      {courseDetails ? (
        <div className="modal" style={{ display: 'block', position: 'fixed', marginTop: '20px' }}>
          <Modal.Dialog>
            <Modal.Header closeButton onClick={courseEditHandle}>
              <Modal.Title>Edit Course Details </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={editcourse.title}
                onChange={handleTitleChange}
              />
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                value={editcourse.status}
                onChange={handleStatusChange}
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
              <input type="file" onChange={imageHandle} />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={handleSubmit}>
                Save changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      ) : null}



{addcourseDetails ? (
        <div className="modal" style={{ display: 'block', position: 'fixed', marginTop: '20px' }}>
          <Modal.Dialog>
            <Modal.Header closeButton onClick={closeHandle}>
              <Modal.Title>Add New Course : </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                // value={editcourse.title}
                onChange={handleAddTitle}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={editcourse.description}
                onChange={handleAddDescription}
                multiline
                rows={4}
              />
              <label htmlFor="Change Image"></label>
              {/* <input type="file" onChange={imageHandle} /> */}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={AddCourseSubmit}>
                Save changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      ) : null}
    </>
  );
};

export default Course;
