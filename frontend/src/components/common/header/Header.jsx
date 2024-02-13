import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Head from './Head';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeaccessS, changeaccessT } from '../../../features/logoutSlice'

const Header = () => {

    // const {id} = useParams()
    const [click, setClick] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = useSelector((state)=>state.logout)
    const data = {
      accessT : token.value.accessT,
      accessS : token.value.accessS,
    }

    useEffect(() => {
      
      const accT = localStorage.getItem("accessToken-T");
      const accS = localStorage.getItem("accessToken-S");

      dispatch(changeaccessT(accT))
      dispatch(changeaccessS(accS))
   
  }, []);

  const homeSubmit = (event)=>{
   
    event.preventDefault();

    if (!data.accessS && !data.accessT){
      navigate('../')
    }
    else if(data.accessS){
      const sdata = localStorage.getItem("stdDetails")

      if(sdata){
        const stdDetails = JSON.parse(sdata);
        const studentId = stdDetails.id
  
      }else {
        console.log("std details not found in localStorage");
      }
      navigate(`../std-dashboard/`)
    }
    else{

      const tutordata = localStorage.getItem("tutorDetails")

      if(tutordata){
        const tutorDetails = JSON.parse(tutordata);
        const tutorId = tutorDetails.id
  
        navigate(`../tutor-dashboard/${tutorId}`)
      }else {
        console.log("Tutor details not found in localStorage");
      }
      
    }
      
  }

  const stdProfile =()=>{
    const sdata = localStorage.getItem("stdDetails")

    if(sdata){
      const stdDetails = JSON.parse(sdata);
      const id = stdDetails.id

      navigate(`../std-profile/${id}`)
    }else {
      console.log("Tutor details not found in localStorage");
    }
 
  }
  
  const tutorProfile =()=>{
    const tdata = localStorage.getItem("tutorDetails")

    if(tdata){
      const tutorDetails = JSON.parse(tdata);
      const id = tutorDetails.id

      navigate(`../tutor-profile/${id}`)
    }else {
      console.log("Tutor details not found in localStorage");
    }
  }

  const stdMyNotes=()=>{
    const sdata = localStorage.getItem("stdDetails")

    if(sdata){
      const stdDetails = JSON.parse(sdata);
      const id = stdDetails.id

      navigate(`../Std-MyNotes/${id}`)
    }else {
      console.log("Tutor details not found in localStorage");
    }
  }

  // const tutorMyNotes=()=>{
  //   const tdata = localStorage.getItem("tutorDetails")

  //   if(tdata){
  //     const tutorDetails = JSON.parse(tdata);
  //     const id = tutorDetails.id

  //     console.log("header il id und",id);
  //     navigate(`../Tutor-MyNotes/${id}`)
  //   }else {
  //     console.log("Tutor details not found in localStorage");
  //   }
  // }
  

  return (
    <>
        <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li className='mt-3 ml-3'>

              <Link onClick={homeSubmit}>Home</Link>
            </li>
           <li className='mt-3'>
              <Link to='/courses'>All Courses</Link>
            </li>
            {(data.accessS)&&<li className='mt-3'>
              <Link to='/about'>About</Link>
            </li>}

            {(data.accessS)&&<li className='mt-3'>
              <Link to='/contact'>Contact</Link>
            </li>}
            {(!data.accessT && !data.accessS) && (
              <>
                <li className='mt-3'>
                  <Link to='/opt-login'>Login</Link>
                </li>
                <li className='mt-3'>
                  <Link to='/opt-signup'>SignUp</Link>
                </li>
              </>
            )}
            
             { ( data.accessS) &&   ( 
              <>
             <li className="nav-dropdown-item mt-2" >
             <NavDropdown title="For You" className='custom-dropdown'>
               {data.accessS ? 
               <NavDropdown.Item onClick={stdProfile}>MyProfile</NavDropdown.Item> : ""}
               {data.accessS ? <NavDropdown.Item onClick={stdMyNotes}>MyNotes</NavDropdown.Item> : ""}
               {/* <NavDropdown.Item href="#action/3.3">NewsToday</NavDropdown.Item> */}
               {/* <NavDropdown.Divider /> */}
               {/* <NavDropdown.Item href="#action/3.4">My Favourites</NavDropdown.Item> */}
             </NavDropdown>
           </li>
           </>  )}

           { ( data.accessT) &&   ( 
              <>
              <li className=" mt-2" >
              <NavDropdown title="For You" className='custom-dropdown'>
              <NavDropdown.Item onClick={tutorProfile}>MyProfile</NavDropdown.Item>
             </NavDropdown>
              </li>
           </>  )}

         
          </ul>
         
          <div className='start'>
            <div className='button mt-3'>EXPLORE YOUR INTERESTS</div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header