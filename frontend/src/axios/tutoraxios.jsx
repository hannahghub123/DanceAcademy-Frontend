import axios from "axios"


const tutoraxiosInstance=axios.create(
    {
        // baseURL:"http://127.0.0.1:8000/tutor/",
        // baseURL:"https://psykicks.social/tutor/",
        baseURL:"https://danceacademy-backend.onrender.com/academy-admin/",
        headers:{
            'Content-Type':'application/json',
            // Authorization:localStorage.getItem("authToken")? "Bearer " + JSON.parse(localStorage.getItem("authToken")):null,
            accept:'application/json'
        }
    }
)

export default tutoraxiosInstance 