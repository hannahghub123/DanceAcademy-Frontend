import axios from "axios"


const stdaxiosInstance=axios.create(
    {
        baseURL:"http://psykicks.social/std/",
        headers:{
            'Content-Type':'application/json',
            // Authorization:localStorage.getItem("authToken")? "Bearer " + JSON.parse(localStorage.getItem("authToken")):null,
            accept:'application/json'
        }
    }
)

export default stdaxiosInstance 