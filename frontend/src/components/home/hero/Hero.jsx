import React from 'react';
import './Hero.css';
import Heading from '../../common/heading/Heading';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

  const navigate = useNavigate()

  const getstartedHandle=()=>{
    navigate('../opt-login')
  }

  const courseHandle=()=>{
    console.log("hi");
    navigate('../courses')
  }

  return (
    <>
        <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO Dance-Academy' title='Best Online Dance Education Expertise' />
            <p>Dance into the World of Rhythm and Movement.</p>
            <div className='button'>
              <button className='primary-btn' onClick={getstartedHandle}>
                GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button onClick={courseHandle}>
                VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero