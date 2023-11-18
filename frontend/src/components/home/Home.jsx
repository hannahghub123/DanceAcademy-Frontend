// import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// import NavComponent from '../navbar/NavComponent';


// const Home = () => {
//     // const navigate = useNavigate();
//     // const loginSubmit=()=>{
//     //     navigate('../login/')
//     // }

//   return (
//     <div>
// <NavComponent/>

//     <div className='first-body'>
//         hi
//     </div>
//     <div className='sec-body'>
//         <h1>DanceAcademy</h1>
//         <h2>helloo</h2>
//         <div className='sub-body mx-auto'>
    
//         </div>
//         <br/>
//         <div className='sub-body mx-auto'>

//         </div>
//     </div>
//     <div className='hey-body'>
//         hi
//     </div>
//     </div>
//   )
// }

// export default Home


import React from 'react'
import Hero from './hero/Hero';
import AboutCard from '../about/AboutCard';


const Home = () => {
  return (
    <>
        <Hero/>
        <AboutCard/>
    </>
  )
}

export default Home