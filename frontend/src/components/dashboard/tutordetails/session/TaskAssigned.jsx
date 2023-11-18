import React, { useEffect, useState } from 'react';
import { styled } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import axiosInstance from "../../../../axios/tutoraxios";
import { useNavigate } from 'react-router-dom';
import '../../../mynotes/style.css';
import Back from '../../../common/back/Back';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditTasksModal from './EditTasksModal';

const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(2.5),
    textAlign: 'center',
    borderRadius: 5,
    color: theme.vars.palette.text.secondary,
  }));

const TaskAssigned = () => {

    const navigate = useNavigate()

    const [taskDetails,setTaskDetails] = useState([]);
    const [render,setRender] = useState(false);
    const [editnotes,setEditNotes] = useState(false);
    const [notesId,setNotesId] = useState(null)


    useEffect(()=>{
        const tutorData = localStorage.getItem("tutorDetails")
        if(tutorData){

            const parseData = JSON.parse(tutorData)

            const values={
                tutor:parseData.id
            }

            axiosInstance.post("task-details/",values)
            .then((res)=>{
                console.log(res.data);
                setTaskDetails(res.data.data);
            })
        }

    },[render])

    const taskeditHandle=(id)=>{
        setEditNotes(!editnotes);
        setNotesId(id)
    }

    const taskdeleteHandle=(id)=>{
        
        const values = {
            id:id
        }
        console.log(values,"000");
        axiosInstance.post("task-delete/",values)
        .then((res)=>{
            console.log(res.data);
            setRender(!render)

        toast.success("Note Deleted !!", {
          position: toast.POSITION.TOP_CENTER,
        });
        })
    }

    const DeleteHandle=(id)=>{
        showDeleteConfirmation(id);
      }
  
      const showDeleteConfirmation = (id) => {
        toast.info(
          <div>
            <p>Are you sure you want to delete this note ?</p>
            <button className='ml-5 mr-5' onClick={() => taskdeleteHandle(id)}>Delete</button>
            <button className='ml-3' onClick={toast.dismiss}>Cancel</button>
          </div>,
          {
            position: 'top-center',
            autoClose: false,
            closeOnClick: true,
            closeButton: false,
          }
        );
      };


  return (
    <>
        <Back title='Tasks Assigned' />
<br />
        <div className='container'>
        <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ width: '100%' }}
    >
    {taskDetails.map((item) => (
      <Grid xs={6}>
        <Item>
          <div className='d-flex flex-column justify-content-between '>
          <div className='tasknotes-text' >
                <b>Course :   </b>
                <b style={{textTransform:"uppercase"}}>{item.session_assign.course_struct.course.title}</b>
            </div>
            <div className='tasknotes-text'>
                <b>Course-structure :   </b>
                {item.session_assign.course_struct.title}
            </div>
            <div className='tasknotes-text'>
                <b>Assigned To :   </b>
                {item.session_assign.student.name}
            </div>
            <br />
            <>
                <b>Task :   </b>
              <div  className='tasknotes-text d-flex flex-row center'> {item.task}
           
           
           
            <div className='icon-container' style={{marginLeft:'auto', display:'flex', gap:'8px'}}>
              <span className='ml-4 ' onClick={()=>taskeditHandle(item.id)} style={{cursor:'pointer'}}><i className="fas fa-edit icon"></i></span>

              <span className='ml-1 'onClick={()=>DeleteHandle(item.id)} ><i className="fas fa-trash icon"></i></span>
            </div>
            </div> 
            </>
          </div>
        </Item>
      </Grid>
    ))}

    </Grid>
    </div>
    {editnotes? <EditTasksModal id={notesId} setRender={setRender}/> : null}
    </>
  )
}

export default TaskAssigned