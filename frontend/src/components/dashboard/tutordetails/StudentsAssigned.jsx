import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axios/tutoraxios'
import { useParams } from 'react-router-dom';
import Back from '../../common/back/Back';


const StudentsAssigned = () => {

    const {id} = useParams()

    const [payDetails,setPayDetails] = useState([])

    useEffect(()=>{
        const values ={
            id:id
        }
        axiosInstance.post("pay-details/",values)
        .then((res)=>{
            console.log(res.data.paydata);
            setPayDetails(res.data.paydata);
            // setTotalCount(res.data.totalCount)
        })
    },[])

  return (
    <>
    <Back/>
        {payDetails.map((val)=>(
            <div className="items shadow">
                <div className="img">
                    <img src={val.image} alt="" />
                    <div className="overlay">
                        <i className='fab fa-facebook-f icon'></i>
                        <i className='fab fa-instagram icon'></i>
                        <i className='fab fa-twitter icon'></i>
                        <i className='fab fa-tiktok icon'></i>
                    </div>
                </div>
                <div className="details">
                    <h2 key={val.id}>{val.name}</h2>
                    {/* <p>{val.work} </p> */}
                </div>
            </div>
        ))}
    </>
  )
}

export default StudentsAssigned