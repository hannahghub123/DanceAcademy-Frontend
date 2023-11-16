// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../../axios/axios';
// import './AdminLogin.css';
// import { changePassword, changeUsername } from '../../../features/adminloginSlice';

// const AdminLogin = () => {

//     const dispatch = useDispatch();
//     const adminobj = useSelector((state)=>state.adminlogin);
//     const navigate = useNavigate()

//     const handleAdminLoginSubmit=()=>{
//         const adminData = {
//             username: adminobj.value.username,
//             password: adminobj.value.password
//         };
//         console.log(adminData,"ithahn vanne");
//         axiosInstance
//             .post('adminlogin/',adminData).then((response)=>{
//                 console.log("Vannuu aliyaa",response.data);

//                 const tokenobj = {
//                     adminrefresh : response.data.adminrefresh,
//                     adminaccess: response.data.adminaccess,
//                 };

//                 console.log("tokenobjs..",tokenobj);

//                 localStorage.setItem("adminAccessToken",JSON.stringify(response.data.adminaccess));
//                 localStorage.setItem("adminData",JSON.stringify(response.data.adminData));
//                 localStorage.setItem("stdData",JSON.stringify(response.data.stdData));
//                 localStorage.setItem("tutorData",JSON.stringify(response.data.tutorData));
//                 navigate('../admin/admin-dashboard/')

//             })
//     }
    
//   return (
// <div className="vh-100">
//          <div className="card  addusercard">
//       <div className="container mt-5">
//         <h2 className="mb-4">Admin Login Form</h2>

//         <div className="form-group">
//           {/* <label htmlFor="username">Admin Username:</label> */}
//           <input
//           placeholder='Admin Username:'
//             type="username"
//             className="form-control"
//             id="username"
//             name="username"
//             required
//             value={adminobj.value.username}
//             onChange={(e) => dispatch(changeUsername(e.target.value))}
//           />
//         </div>

//         <div className="form-group">
//           {/* <label htmlFor="password">Admin Password:</label> */}
//           <input
//           placeholder='Admin Password:'
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//             required
//             value={adminobj.value.password}
//             onChange={(e) => dispatch(changePassword(e.target.value))}
//           />
//         </div>

//         <button onClick={handleAdminLoginSubmit} className="btn btn-success mt-4 mb-3">
//           Login
//         </button>
//       </div>
//       </div>
//     </div>
//   )
// }

// export default AdminLogin