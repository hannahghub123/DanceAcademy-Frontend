import React, { useEffect, useState } from 'react'
import Back from '../../common/back/Back';
import axiosInstance from '../../../axios/stdaxios';


const CoursesPurchased = () => {

    const [courses,setCourses] = useState([]);
    const [totalAmount,setTotalAmount] = useState(null);

    useEffect(()=>{

        const stdData = localStorage.getItem("stdDetails")

        if (stdData){

            const parseData = JSON.parse(stdData)

            const values={
                id:parseData.id
            }

            axiosInstance.post("coursepay-details/",values)
            .then((res)=>{
                setCourses(res.data.paydata)
                setTotalAmount(res.data.totalAmount)
            })
        }
    },[])


  return (
    <>
    <Back title='Courses-Purchased'/>
       <h3 className='text container shadow p-4 ' style={{width:'fit-content',height:'80px'}}>Total Amount : Rs. <b>{totalAmount}</b></h3>

    <section className='coursesCard '>
            <div className="container grid2">
                {courses.map((item)=>{
                   return (
                   <div className="items">
                        <div className="content flex">
                            <div className="left">
                                <div className="img">
                                    <img src={item.structId.course.image} alt="" />
                                </div>
                            </div>
                            <div className="text">
                                <h3 key={item.structId.id}>{item.structId.title} PLAN</h3>
                                <div className="rate">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <label htmlFor="">(5.0)</label>
                                </div>
                                <h6><i class='fas fa-hand-point-right icon'></i> {item.structId.levels} </h6>
                                <h6><i class='fas fa-hand-point-right icon'></i> {item.structId.duration} min/Class </h6>
                                <h6><i class='fas fa-hand-point-right icon'></i> {item.structId.num_of_classes} Online Classes</h6>
                            
                            </div>
                        </div>
                        <div className="price">
                            <h3>Rs. {item.structId.price} / {item.structId.price_per} </h3>
                        </div>

                    
                    </div>
                    )
                })}
            </div>
        </section>
    </>
  )
}

export default CoursesPurchased