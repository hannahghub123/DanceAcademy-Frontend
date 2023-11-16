import axios from "axios"


const stdaxiosInstance=axios.create(
    {
        baseURL:"https://psykicks.social/std/",
        headers:{
            'Content-Type':'application/json',
            // Authorization:localStorage.getItem("authToken")? "Bearer " + JSON.parse(localStorage.getItem("authToken")):null,
            accept:'application/json'
        }
    }
)

export default stdaxiosInstance 