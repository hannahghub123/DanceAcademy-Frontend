import React from 'react';
import './Head.css'

const Head = ({title}) => {
  return (
    <>
         <section className='admin-head'>
 
          <div className='admin-logo' style={{color:"white"}}>
            <h1 style={{padding:"17px"}}>{title}</h1>


        </div>
      </section>
    </>
  )
}

export default Head