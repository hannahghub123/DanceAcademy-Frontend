import axios from "axios"


const axiosInstance=axios.create(
    {
        // baseURL:"http://127.0.0.1:8000/academy-admin/",
        baseURL:"http://psykicks.social/academy-admin/",
        headers:{
            'Content-Type':'application/json',
            // Authorization:localStorage.getItem("authToken")? "Bearer " + JSON.parse(localStorage.getItem("authToken")):null,
            accept:'application/json'
        }
    }
)

export default axiosInstance 