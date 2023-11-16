import React, { useEffect, useState } from 'react'
import Back from '../../common/back/Back';
import { styled } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import axiosInstance from '../../../axios/stdaxios';
import { useNavigate } from 'react-router-dom';
// import Check from '@mui/icons-material/Check';

const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(2.5),
    textAlign: 'center',
    borderRadius: 5,
    color: theme.vars.palette.text.secondary,
  }));

const PendingActivities = () => {

    const [notes,setNotes] = useState([]);
    const navigate=useNavigate()

    useEffect(()=>{

        const stdData = localStorage.getItem("stdDetails")
        if (stdData){

            const parseData = JSON.parse(stdData)
            const values={
                id:parseData.id
            }
            axiosInstance.post("task-details/",values)
            .then((res)=>{
                console.log(res.data.pendingTasks);
                setNotes(res.data.pendingTasks)
            })
        }

    },[])

    const notesEditHandle=(id)=>{
        navigate(`../task-upload/${id}`)
    }

  return (
    <>
        <Back title='Pending Activities'/>
        <br />
        <div className='container'>
        <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ width: '100%' }}
    >
    {notes.map((item) => (
      <Grid xs={6}>
        <Item>
          <div className='d-flex flex-column justify-content-between '>
          <div className='notes-text' style={{textTransform:"uppercase"}}> 
           <b> {item.session_assign.course_struct.course.title} /  {item.session_assign.course_struct.title}</b> Plan 
           <span className='ml-4 ' onClick={()=>notesEditHandle(item.id)}><i className="fas fa-edit icon"></i></span>
           </div>
          <div className='notes-text mt-3'> </div>
            <div className='notes-text'> {item.task}</div>
          </div>
        </Item>
      </Grid>
    ))}

    </Grid>
    </div>
    <br />
    </>
  )
}

export default PendingActivities