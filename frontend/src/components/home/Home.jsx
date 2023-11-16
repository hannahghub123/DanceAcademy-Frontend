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
import HAbout from './HAbout';
import Test from './testimonial/Test';
import HBlog from './HBlog';
import HPrice from './HPrice';

const Home = () => {
  return (
    <>
        <Hero/>
        <AboutCard/>
        {/* <HAbout/> */}
        {/* <Test/> */}
        {/* <HBlog/> */}
        {/* <HPrice/> */}
    </>
  )
}

export default Home