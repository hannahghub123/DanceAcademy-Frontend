import React from 'react'
import { useNavigate } from 'react-router-dom'
import Back from '../common/back/Back'
import './OptLogin.css'

const OptLogin = () => {
    const navigate = useNavigate()
    const stdloginSubmit = ()=>{
      navigate('../std-login')
    }
    const trloginSubmit = ()=>{
      navigate('../tutor-login/')
    }
    return (
      <>
          <Back title='Select Who You Are?' />
  
          <section className="login ">
            <div className="login-btn">
              <button onClick={stdloginSubmit}>Login As Student ?</button>
              <button onClick={trloginSubmit}>Login As Tutor ?</button>      
            </div>
        </section>
      </>
    )
}

export default OptLogin