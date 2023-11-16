import React from 'react'
import './OptSignup.css'
import { useNavigate } from 'react-router-dom'
import Back from '../common/back/Back'

const OptionSignup = () => {
  const navigate = useNavigate()
  const stdsignupSubmit = ()=>{
    navigate('../std-signup/')
  }
  const trsignupSubmit = ()=>{
    navigate('../tutor-signup/')
  }
  return (
    <>
        <Back title='Select Who You are ?' />

        <section className="signup">
          <div className="signup-btn">
            <button onClick={stdsignupSubmit}>Signup As Student ?</button>
            <button onClick={trsignupSubmit}>Signup As Tutor ?</button>
          </div>
        </section>
    </>
  )
}

export default OptionSignup