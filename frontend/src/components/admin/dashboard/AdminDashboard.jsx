import React from 'react';
import Sidebar from '../sidebar/Sidebar'
import Head from '../head/Head';
import DashboardData from './DashboardData';

const AdminDashboard = () => {

  return (
    <>
  <Head title="Admin Dashboard"/>
      <Sidebar/>
      <div className='d-flex'>
          <DashboardData/>
      </div>

    </>
  )
}

export default AdminDashboard