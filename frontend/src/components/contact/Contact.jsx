import React from 'react'
import Back from '../common/back/Back'
import './Contact.css'

const Contact = () => {

    const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31562.569197807796!2d76.8679304!3d8.565085949999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05be54c4adee2d%3A0x6367a27de8baa463!2sKazhakkoottam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1696844868701!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"'


  return (
    <>
        <Back title='Contact Us' />
        <section className="contact padding" >
            <div className="container shadow flexSB">
                <div className="left row">
                    <iframe src={map} ></iframe>
                </div>
                <div className="right row">
                    <h1>Contact Us</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                    <div className="items grid2">
                        <div className="box">
                            <h4>ADDRESS: </h4>
                            <p>Dotspace Business Park, Near Al Uthuman School, Kazhakootam - 689522</p>
                        {/* </div>
                        <div className="box"> */}
                            <h4>
                                Email: 
                            </h4>
                            <p>danceacademy@gmail.com</p>
                        </div>
                        <div className="box">
                            <h4>
                                Phone: 
                            </h4>
                            <p>8086618998</p>
                        </div>
                    </div>
                    <form action="">
                        <div className="flexSB">
                            <input type="text" placeholder='Name'/>
                            <input type="email" placeholder='Email'/>
                        </div>
                        <input type="text" placeholder='Subject'/>
                        <textarea name="" id="" cols="30" rows="10">Create a message here...</textarea>
                        <button className="primary-btn">SEND MESSAGE</button>
                    </form>

                    <h3>Follow us here</h3>
                    <span>FACEBOOK TWITTER INSTAGRAM DRIBBLE</span>
                </div>
            </div>
        </section>
    </>
  )
}

export default Contact