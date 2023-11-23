import React, { useEffect, useState } from 'react'
import './Courses.css'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios/tutoraxios'
import CourseModal from './CourseModal';

// displaying course plans - the big cards 

const CoursesCard = () => {

    const {id} = useParams()
    const [cdata,setCdata] = useState([]);
    const [acc,setAcc] = useState(false)


    useEffect(()=>{

        const stdData = localStorage.getItem("stdDetails")
        if (stdData){
            setAcc(true)
        }


        const datas = {
            id:id
        }
        axiosInstance.post("course-structure/",datas)
        .then((res)=>{
            console.log(res.data,"hi hey you");
            setCdata(res.data)
        })
    },[])


  
    console.log(acc,"accvvvhhhkjkl");


      

  return (
    <>
        <section className='coursesCard'>
            <div className="container grid2">
              {console.log(cdata,"cdata")}
                {cdata.map((val)=>{
                   return (
                   <div className="items">
                        <div className="content flex">
                            <div className="left">
                                <div className="img">
                                    <img src={val.course.image} alt="" />
                                </div>
                            </div>
                            <div className="text">
                                <h3 key={val.id}>{val.title}</h3>
                                <div className="rate">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <label htmlFor="">(5.0)</label>
                                </div>
                                <h6><i class='fas fa-hand-point-right icon'></i> {val.levels} </h6>
                                <h6><i class='fas fa-hand-point-right icon'></i> {val.duration} min/Class </h6>
                                <h6><i class='fas fa-hand-point-right icon'></i> {val.num_of_classes} Online Classes</h6>
                            
                            </div>
                        </div>
                        <div className="price">
                            <h3>{val.price} / {val.price_per} </h3>
                        </div>

                        {/* <button className='outline-btn' onClick={modalHandle}>ENROLL NOW !</button> */}
                        { acc && (val.course.status === "Course Available") && <CourseModal id={val.id}/>}
                        
                    
                    </div>
                    )
                })}
            </div>
        </section>
    </>
  )
}

export default CoursesCard