import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TutorProfile.css'
import Back from '../common/back/Back';
import TutorCard from './TutorCard';


const TutorProfile = () => {


    const {id} = useParams();
 
    const [data,setData] = useState(
      {
        id:id,
        username: '',
        name: '',
        expertise: '',
        email: '',
        qualification: '',
        phone: '',
        password: '',
        image:''
      }
    )

    useEffect((data)=>{
      const tutorDetails = localStorage.getItem("tutorDetails");
      
      if (tutorDetails) {
        const parseData = JSON.parse(tutorDetails);

        setData({...data,id:parseData.id,username:parseData.username, name:parseData.name, email:parseData.email, phone:parseData.phone, expertise:parseData.expertise, qualification:parseData.qualification, password:parseData.password, image:parseData.image});

      }

    },[])

  return (   
    
    
    <>

        <Back title='Your Profile'/>
        <div className='tutor-container' style={{display: 'flex',flexDirection:"row" }}>
        
        <section className='team padding'>
            <div className="container grid">
                <TutorCard/>
                {/* <StudentList/> */}
            </div>
        </section>

        </div>

        
    </>

    
  )
}




export default TutorProfile