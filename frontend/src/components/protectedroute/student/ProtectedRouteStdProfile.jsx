import React, { useState } from 'react'
import StdProfile from '../../stdprofile/StdProfile'
import { Navigate } from 'react-router-dom'

const ProtectedRouteStdProfile = () => {
    const [accessS,setAccessS] = useState(localStorage.getItem("stdDetails"))
  return (
    accessS ? <StdProfile/>: <Navigate to="/opt-login" replace/>
  )
}

export default ProtectedRouteStdProfile