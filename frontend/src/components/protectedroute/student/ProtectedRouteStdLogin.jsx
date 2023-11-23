import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import StdLogin from '../../stdLogin/StdLogin';

const ProtectedRouteStdLogin = () => {
    const [accessS,setAccessS] = useState(localStorage.getItem("stdDetails"))
  return (
    !accessS ? <StdLogin/>: <Navigate to="/std-dashboard" replace/>
  )
}

export default ProtectedRouteStdLogin