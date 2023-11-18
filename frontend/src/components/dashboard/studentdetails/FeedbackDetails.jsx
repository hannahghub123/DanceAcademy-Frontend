import React, { useEffect, useState } from 'react';
import { styled } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import axiosInstance from '../../../axios/stdaxios';
import Back from '../../common/back/Back';

const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(2.5),
    textAlign: 'center',
    borderRadius: 5,
    color: theme.vars.palette.text.secondary,
  }));

const FeedbackDetails = () => {

    const [tutordetails,setTutorDetails] = useState([])
    const [feedDetails,setFeedDetails] = useState([])
    const [studentDetails,setStudentDetails] = useState([])

    useEffect(()=>{
        const stdData = localStorage.getItem("stdDetails")
        if(stdData){
            const parseData = JSON.parse(stdData)
            setStudentDetails(parseData)

            const values = {
                id:parseData.id
            }

            axiosInstance.post("feed-details/",values)
            .then((res)=>{
                console.log(res.data,"hey");
                setTutorDetails(res.data.tutors)
                setFeedDetails(res.data.feedbacks)

            })
        }
    },[])

  return (
    <div>
         <Back title='Given Scores & Feedbacks' />
        <br />

        <div className='container' style={{marginLeft:450}}>
        <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ width: '100%' }}
    >
   
      <Grid xs={6}>
        <Item>
          <div >
            <h1 className='notes-text'> {studentDetails.name}</h1>
            <b>SCORE : {studentDetails.score} </b>


        {    tutordetails
        .map((item)=>(
            <>
            <div>Tutor Name : {item.name}</div>
            <div className='feedback-container mt-3' style={{display:"flex",flexDirection:"column"}}>
              {
                feedDetails
                .filter((val)=>val.tutor===item.id)
                .map((feed) => (
                  <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between"}}>
                  <div key={feed.id} className='feedback-item'>
                    <span className='mr-2'>
                      <i className="fa fa-check" aria-hidden="true"></i>
                    </span>
                    {feed.feedback}
                  </div>
                  </div>
               
                ))
              }
            
            </div>
            </>
        ))
            }
          </div>
        </Item>
      </Grid>


    </Grid>
    </div>
    </div>
  )
}

export default FeedbackDetails