import React from 'react';
import './Hero.css';
import Heading from '../../common/heading/Heading';

const Hero = () => {
  return (
    <>
        <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO Dance-Academy' title='Best Online Dance Education Expertise' />
            <p>Far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. -Hannah</p>
            <div className='button'>
              <button className='primary-btn'>
                GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button>
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