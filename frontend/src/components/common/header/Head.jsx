import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { changeaccessT, changeaccessS } from '../../../features/logoutSlice'
import { useDispatch, useSelector } from 'react-redux';


const Head = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    
    const accT = localStorage.getItem("accessToken-T");
    const accS = localStorage.getItem("accessToken-S");
   
}, []);

  const token = useSelector((state)=>state.logout)
  const data = {
      accessT : token.value.accessT,
      accessS : token.value.accessS
    }

const logout = (e) => {
  e.preventDefault();
  
localStorage.removeItem("accessToken-T");
localStorage.removeItem("tutorDetails");

localStorage.removeItem("accessToken-S");
localStorage.removeItem("stdDetails");

dispatch(changeaccessT(null))
dispatch(changeaccessS(null))

 navigate('../');
}
  return (
    <>
         <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1>DanceAcademy</h1>
            <span>ONLINE DANCE EDUCATION & LEARNING</span>
          </div>

          <div className='social'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-youtube icon'></i>
            {
              (data.accessS||data.accessT)&&(
                <i className='fa fa-power-off icon' onClick={logout} title='LogOut'>
                  {/* <Link to='../'>Logout</Link> */}
                </i>
              )
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Head