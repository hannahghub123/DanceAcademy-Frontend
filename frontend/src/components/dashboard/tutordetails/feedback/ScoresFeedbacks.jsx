import React, { useEffect, useState } from 'react'
import Back from '../../../common/back/Back';
import axiosInstance from '../../../../axios/stdaxios';
import { styled } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import EditFeedbackModal from './EditFeedbackModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(2.5),
    textAlign: 'center',
    borderRadius: 5,
    color: theme.vars.palette.text.secondary,
  }));

const ScoresFeedbacks = () => {

    const [stdDetails,setStdDetails] = useState([]);
    const [feedbackDetails,setFeedbackDetails] = useState([]);
    const [feed,setEditFeed] = useState(false)
    const [ feedId, setFeedId] = useState(null)
    const [render,setRender] = useState(false);
    

    useEffect(()=>{
        
        axiosInstance.get("std-details/")
        .then((res)=>{
          console.log(res.data);
          setStdDetails(res.data)
        })

        axiosInstance.get("feedback-details/")
        .then((res)=>{
          console.log(res.data,"8888");
          setFeedbackDetails(res.data.data)
        })

    },[render])

    const taskeditHandle=(id)=>{
      setEditFeed(!feed);
      setFeedId(id)
  }

  const DeleteHandle=(id)=>{
    showDeleteConfirmation(id);
  }

  const showDeleteConfirmation = (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this feedback ?</p>
        <button className='ml-5 mr-5' onClick={() => FeedbackdeleteHandle(id)}>Delete</button>
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

  const FeedbackdeleteHandle=(id)=>{
        
    const values = {
        id:id
    }

    axiosInstance.post("feedback-delete/",values)
    .then((res)=>{
        console.log(res.data);
        setRender(!render)

    toast.success("Feedback Deleted !!", {
      position: toast.POSITION.TOP_CENTER,
    });
    })
}

  return (
    <div>
        <Back title='Scores & Feedbacks' />
        <br />

        <div className='container'>
        <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ width: '100%' }}
    >
    {stdDetails.map((item) => (
      <Grid xs={6}>
        <Item>
          <div >
            <div className='notes-text'>{item.name}</div>
            <b>SCORE : {item.score} </b>

            {console.log(item.id,"*****")}

            
            <div className='feedback-container mt-3' style={{display:"flex",flexDirection:"column"}}>
              {
                feedbackDetails
                .filter((val) => val.student === item.id)
                .map((feed) => (
                  <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between"}}>
                  <div key={feed.id} className='feedback-item'>
                    <span className='mr-2'>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>
                    {feed.feedback}
                  </div>
                    <div className='icon-container'>
                    <span className='ml-4' onClick={()=>taskeditHandle(item.id)} ><i className="fas fa-edit icon"></i></span>
                    <span className='ml-1' onClick={()=>DeleteHandle(item.id)} ><i className="fas fa-trash icon"></i></span>
                  </div>
                  </div>
                ))
              }
            
            </div>
          </div>
        </Item>
      </Grid>
    ))}

    </Grid>
    </div>

    {feed ? <EditFeedbackModal id={feedId} setRender={setRender}/> : null}
   
    </div>
  )
}

export default ScoresFeedbacks