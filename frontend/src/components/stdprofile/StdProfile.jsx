import React from 'react'
import StdCard from './StdCard'
import Back from '../common/back/Back'
import './StdProfile.css';

const StdProfile = () => {
  return (
    <>
        <Back title='Your Profile'/>
        {/* <div className='std-container '> */}
        
        <section className='team padding' style={{marginLeft:400}}>
            <div className="container grid">
                <StdCard/>
            </div>
        </section>
        {/* </div> */}
    </>
  )
}

export default StdProfile