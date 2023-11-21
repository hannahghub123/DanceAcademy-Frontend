import axios from "axios"


const tutoraxiosInstance=axios.create(
    {
        // baseURL:"http://127.0.0.1:8000/tutor/",
        baseURL:"http://psykicks.social/tutor/",
        headers:{
            'Content-Type':'application/json',
            // Authorization:localStorage.getItem("authToken")? "Bearer " + JSON.parse(localStorage.getItem("authToken")):null,
            accept:'application/json'
        }
    }
)

export default tutoraxiosInstance 