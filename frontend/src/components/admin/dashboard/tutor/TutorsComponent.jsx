import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Sidebar from '../../sidebar/Sidebar';
import Head from '../../head/Head';
import axiosInstance from '../../../../axios/tutoraxios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TutorsComponent = () => {

    const [tutordetails,setTutordetails] = useState([])
    const [ approveStatus, setApproveStatus] = useState(false)
  
    useEffect(() => {
      axiosInstance.get("tutor-details/")
      .then((response)=>{
        setTutordetails(response.data)
      })
    }, [approveStatus]);

    const HandleApprove=(id)=>{
      showApproveConfirmation(id);
    }

    const HandleRestrict=(id)=>{
      showRestrictConfirmation(id);
    }

    const approveHandle = (id)=>{
      const values = {
        id:id,
      }
      axiosInstance.post("status-edit/",values)
      .then((res)=>{
        console.log(res.data);
        setApproveStatus(!approveStatus)

        if (res.data.message==="restricted"){
          toast.success("Tutor signup restricted!", {
            position: toast.POSITION.TOP_RIGHT
          });
        }else{
          toast.success("Tutor signup approved!", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      })
    }

    const showApproveConfirmation = (id) => {
      toast.info(
        <div>
          <p>Are you sure you want to approve this tutor signup?</p>
          <button className='ml-5 mr-5' onClick={() => approveHandle(id)}>Approve</button>
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

    const showRestrictConfirmation = (id) => {
      toast.info(
        <div>
          <p>Are you sure you want to restrict this tutor signup?</p>
          <button className='ml-5 mr-5' onClick={() => approveHandle(id)}>Restrict</button>
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


  return (
    <>
     <Head title="Tutors Details"/>
      <Sidebar/>
        <br /> <br />
       <br />
       <div className='container'  style={{maxWidth:"1300px",marginLeft:"160px"}}>
      <Table responsive="sm" style={{marginLeft:"40px",marginTop:"10px"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>IMAGE</th>
            <th>USERNAME</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>EXPERTISE</th>
            <th>QUALIFICATION</th>
            <th>COURSE ASSIGNED</th>
            <th>IS APPROVED</th>
        
          </tr>
        </thead>
        <tbody>
        {tutordetails.map((item) => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <img src={item.image} alt="" style={{width:60,maxHeight:60}}/>
            </td>
            <td>{item.username}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.expertise}</td>
            <td>{item.qualification}</td>
            <td>{(item.course).map((val)=>{
              return(<>
              {val.title}
              <br />
              </>)
            })}</td>
            <td>
              {/* approval confirmation ? */}
              {!(item.is_approved) && <Link onClick={()=>HandleApprove(item.id)}>Approve</Link>}
              {(item.is_approved) && <Link onClick={()=>HandleRestrict(item.id)} style={{color:"red"}}>Restrict</Link>}
            </td>
            {/* <td>{item.resume}</td> */}
          </tr>))}
        </tbody>
      </Table>
      </div>
      
    </>
  )
}

export default TutorsComponent