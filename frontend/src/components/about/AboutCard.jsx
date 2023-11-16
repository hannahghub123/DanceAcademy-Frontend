import React from 'react'
import Heading from '../common/heading/Heading'
import Awrapper from './Awrapper'
import './About.css';
import {homeAbout} from '../../dummydata';

const AboutCard = () => {
  return (
    <>
        <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='left row mt-5'>
            <img src='./images/about.webp' alt='' />
          </div>
          <div className='right row'>
            <Heading subtitle='LEARN ANYTHING' title='Benefits About Online Learning Expertise' />
            <div className='items'>
              {homeAbout.map((val) => {
                return (
                  <div className='item flexSB'>
                    <div className='img'>
                      <img src={val.cover} alt='' />
                    </div>
                    <div className='text'>
                      <h2 key={val.id}>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  )
}

export default AboutCard