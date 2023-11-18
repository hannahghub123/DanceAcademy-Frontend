import React, {  useState } from "react";
// import dayjs from "dayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import  axiosInstance from "../../../../axios/stdaxios";
import TextField from '@mui/material/TextField';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  marginTop: 5,
  p: 4,
};

const SessionAssign = (props) => {

  const [open, setOpen] = useState(true);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [notes,setNotes] = useState("")
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDateTimeChange = (newDateTime) => {
    setSelectedDateTime(newDateTime);
  };

  const navigate=useNavigate()

  const sessionAssignSubmit=()=>{

    const tutorData = localStorage.getItem("tutorDetails")
    if (tutorData){
      const parseData = JSON.parse(tutorData)  

      const values = {
        tutor:parseData.id,
        date_time:selectedDateTime.$d,
        student:props.student,
        course_struct:props.courseplan,
        notes:notes,
    }

    console.log(values,"values_valuesss");

    axiosInstance.post("session-assign/",values)
    .then((res)=>{
        console.log(res.data,"heyy");
        toast.success("Session Successfully added !") 
        // navigate(`../tutor-dashboard/${parseData.id}`)
    })
    }
    handleClose();
  }

  return (
    <>
    <Toaster/>
      <Modal open={open} onClose={handleClose} className="edit-modal">
        <Box sx={style}>
        <h1>Assign Session:</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']} >
            <DateTimePicker
              label="Choose Your Date & Time"
            //   value={selectedDateTime} // Set the selected value
              onChange={handleDateTimeChange} // Handle the date and time change
            />
            </DemoContainer>
        </LocalizationProvider>
        <TextField
            label="Add Notes If Needed"
            variant="outlined"
            fullWidth
            // value={data.name}
            onChange={(e)=>setNotes(e.target.value)}
          />
        <button onClick={sessionAssignSubmit}>Assign</button>
        
        </Box>
      </Modal>

      {console.log(selectedDateTime.$d, "DATETETEETTE",notes)} 
    </>
  );
};


export default SessionAssign;
