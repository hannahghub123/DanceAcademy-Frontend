import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axios/tutoraxios'
import Heading from '../common/heading/Heading'
import RelatedVideos from './RelatedVideos'

// component displaying the related tutor details

const DetailsCard = () => {

    const [details,setDetails] = useState([])

    const navigate = useNavigate()

    const {id} = useParams()
    

    useEffect(()=>{
        axiosInstance.get(`tdetails/${id}`)
        .then((res)=>{
            console.log(res.data,"hi t data")
            setDetails(res.data)
        })
    },[]) 

    const [isUploadComponentVisible, setIsUploadComponentVisible] = useState(false);
    const [tid,setTid] = useState("")
    const videoDisplayHandle = (id) => {
        setIsUploadComponentVisible(!isUploadComponentVisible);
        setTid(id)
      };

  return (
    <>
        <section className='online'>
            <div className="container">
            <Heading subtitle='RELATED TUTOR-DETAILS' title='Browse Our tutor Details'/>
                {/* <p>{details.course.description}</p> */}
                <div className="content grid3" style={{ height: "100%", width: "100%", display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
                    {details.map((val)=>(
                        <div className="box">
                            <div className="img" style={{width:100,height:100 }}>
                                <img src={val.image} alt="" />
                            </div>
                            {/* <br />
                            <i class="fa fa-heart icon" title='Add To Favorites'></i>  */}
                            <h1>{val.name}</h1>
                            <p>{val.qualification}/{val.expertise} yr expertise</p>
                         
                        <span className='ml-5 mr-5' onClick={()=>videoDisplayHandle(val.id)} style={{width:"130px",padding:8,backgroundColor:"#fff"}}>Top Uploads</span>
                         
                        </div>
                    ))}
                </div>
                <>
                {isUploadComponentVisible ? (
                        <><RelatedVideos id={tid} /></>  
                        ) : null}
                </>
                </div>
        </section>
    </>
  )
}

export default DetailsCard