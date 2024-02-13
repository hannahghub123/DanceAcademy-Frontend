import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axiosInstance from '../../axios/stdaxios';
import { useDispatch, useSelector } from 'react-redux';
import {changeNotes} from '../../features/notesEditSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    marginTop:5 ,
    p: 4,
  };


const EditNotesModal = (props) => {

    const [notes,setNotes] = useState([]); 
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    // const [editnotes,setEditNotes] = useState("")
    const dispatch = useDispatch()

    const notesvalue = useSelector((state)=>state.notesEdit)

    useEffect(()=>{
        const values={
            id:props.id
        }
        axiosInstance.post("getnotes-data/",values)
        .then((res)=>{
            setNotes(res.data)
        })
    },[])

    const notesEditHandle=(e)=>{
        setNotes({...notes,notes:e.target.value})
        dispatch(changeNotes(e.target.value))
    }

    const handleSubmit=()=>{
        const values={
            id:notes.id,
            notes:notes.notes
        }
        axiosInstance.post("edit-notes/",values)
        .then((res)=>{
            props.setRender((prev)=> !prev)
        })
        handleClose()
    }

  return (
    <>
        {/* <h1>EditNotesModal</h1> */}

        <Modal open={open} onClose={handleClose} className='edit-modal'>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Edit Notes
          </Typography>
          <br />

          <TextField
            label="Edit notes"
            variant="outlined"
            fullWidth
            multiline
            rows={4} 
            value={notes.notes}
            onChange={notesEditHandle}  
          />

          <br /><br />

          <button className='edit-btn'  onClick={handleSubmit}>
           Edit Notes
          </button>
        </Box>
      </Modal>
    </>
  )
}

export default EditNotesModal