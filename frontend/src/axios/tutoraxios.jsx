import axios from "axios"


const tutoraxiosInstance=axios.create(
    {
        baseURL:"https://psykicks.social/tutor/",
        headers:{
            'Content-Type':'application/json',
            // Authorization:localStorage.getItem("authToken")? "Bearer " + JSON.parse(localStorage.getItem("authToken")):null,
            accept:'application/json'
        }
    }
)

export default tutoraxiosInstance 