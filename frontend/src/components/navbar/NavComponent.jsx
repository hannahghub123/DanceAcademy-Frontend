import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavComponent.css';
import { useNavigate, useParams } from 'react-router-dom';

const NavComponent = () => {
  const {id} = useParams()
  const [accessT, setAccessT] = useState(null);
  const [accessS, setAccessS] = useState(null);
  useEffect(() => {
    
    const accT = localStorage.getItem("accessToken-T");
    const accS = localStorage.getItem("accessToken-S");

    setAccessT(accT);
    setAccessS(accS);
}, []);

 
    const navigate = useNavigate()
    const regSubmit = ()=>{
        navigate('../opt-signup/');
    }

    const loginSubmit = ()=>{
        navigate('../opt-login/')
    }

    const homeSubmit = ()=>{
      if (!accessS && !accessT){
        navigate('../')
      }else if(accessS){
        navigate('../std-dashboard')
      }else{
        navigate(`../tutor-dashboard/${id}`)
      }
        
    }
    const stdProfile =()=>{
      navigate('../')
    }
    const tutorProfile =()=>{
      navigate(`../tutor-profile/${id}`)
    }
  return (
    <div>
        <Navbar  className="navbar">
        <Container className='first-nav'>
        {/* <Navbar.Brand href="#home" className='nav-logo'>React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={homeSubmit}>Home</Nav.Link>
            <Nav.Link >About</Nav.Link>
            <Nav.Link href="#home">Contact</Nav.Link>
            <Nav.Link href="#home">Testimonials</Nav.Link>
            <Nav.Link href="#home">Career</Nav.Link>
           { (!accessT && !accessS) &&<Nav.Link onClick={regSubmit}>Register</Nav.Link>}
           { (!accessT && !accessS) &&<Nav.Link onClick={loginSubmit}>Login</Nav.Link>}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <Navbar bg="dark" data-bs-theme="dark">
        <Container className='second-nav'>
          <Navbar.Brand href="#home">DanceAcademy</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">FACULTY</Nav.Link>
            <Nav.Link href="#features">DANCE-CLASSES</Nav.Link>
            <Nav.Link href="#pricing">WORKSHOPS & EVENTS</Nav.Link>
            { (accessS || accessT) &&<NavDropdown title="For You" id="basic-nav-dropdown">
              {accessS?<NavDropdown.Item onClick={stdProfile}>MyProfile</NavDropdown.Item>:<NavDropdown.Item onClick={tutorProfile}>MyProfile</NavDropdown.Item>}
              <NavDropdown.Item href="#action/3.2">
                MyNotes
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">NewsToday</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                My Favourites
              </NavDropdown.Item>
            </NavDropdown>}
            
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavComponent