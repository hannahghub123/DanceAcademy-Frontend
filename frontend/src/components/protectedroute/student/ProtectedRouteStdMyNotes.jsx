import React, { useState } from 'react'
import StudentMyNotes from '../../mynotes/StudentMyNotes'
import { Navigate } from 'react-router-dom'

const ProtectedRouteStdMyNotes = () => {
    const [accessS,setAccessS] = useState(localStorage.getItem("stdDetails"))
  return (
    accessS ? <StudentMyNotes/>: <Navigate to="/opt-login" replace/>
  )
}

export default ProtectedRouteStdMyNotes