import React from 'react'
import './Footer.css'
import { blog } from '../../../dummydata'

const Footer = () => {
  return (
    <>
        {/* <section className="newletter">
            <div className="container flexSB">
                <div className="left row">
                    <h1>NewsLetter - Stay tuned and get the latest updates</h1>
                    <span>far far away, behind the word mountains</span>
                </div>
                <div className="right row">
                    <input type="text" placeholder='Enter email address !'/>
                    <i className='fa fa-paper-plane'></i>
                </div>
            </div>
        </section> */}

        {/* <footer>
            <div className="container padding">
                <div className="box logo">
                    <h1>ACADEMIA</h1>
                    <span>online education & learning</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                
                    <i className='fab fa-facebook-f icon'></i>
                    <i className='fab fa-instagram icon'></i>
                    <i className='fab fa-twitter icon'></i>
                    
                </div>
                <div className="box link">
                    <h3>Explore</h3>
                    <ul>
                        <li>About Us</li>
                        <li>About Us</li>
                        <li>About Us</li>
                        <li>About Us</li>
                        <li>About Us</li>
                    </ul>
                </div>
                <div className="box link">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>About Us</li>
                        <li>About Us</li>
                        <li>About Us</li>
                        <li>About Us</li>
                        <li>About Us</li>
                    </ul>
                </div>
                <div className="box">
                    <h3>Recent Posts </h3>
                    {blog.slice(0,3).map((val)=>{
                        return(
                        <div className="items flexSB" key={val.id}>
                            <div className="img">
                                <img src={val.cover} alt="" />
                            </div>
                            <div className="text">
                            <span >
                            <i className='fa fa-user'></i>
                            <label htmlFor="">{val.type}</label>
                            </span>
                            <span>
                                <i className='fa fa-calender-alt'></i>
                                <label htmlFor="">{val.date}</label>
                            </span>
                            <h4>{val.title} </h4>
                            </div>
                        </div>
                    )})}
                </div>
                <div className="box last">
                    <h3>Have Questions ?</h3>
                    <ul>
                        <li>
                            <i className="fa fa-map"></i>
                            Dotspace Business Park, Kazhakootam, Trivandrum
                        </li>
                        <li>
                            <i className="fa fa-phone-alt"></i>
                            +91-8086618998
                        </li>
                        <li>
                            <i className="fa fa-paper-plane"></i>
                            danceacademy@gmail.com
                        </li>
                    </ul>
                </div>
            </div>
        </footer> */}
        <div className="div legal">
            <p>Copyright @2023 All rights reserved</p>
        </div>
    </>
  )
}

export default Footer