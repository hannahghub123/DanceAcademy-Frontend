import React, { useState } from 'react'
import StudentDashboard from '../../dashboard/StudentDashboard'
import { Navigate } from 'react-router-dom'

const ProtectedRouteStdDashboard = () => {
    const [accessS,setAccessS] = useState(localStorage.getItem("stdDetails"))
  return (
    accessS ? <StudentDashboard/>: <Navigate to="/opt-login" replace/>
  )
}

export default ProtectedRouteStdDashboard