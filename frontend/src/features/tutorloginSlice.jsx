import {createSlice} from "@reduxjs/toolkit"

const INITITALSTATE={

    email:"",
    password:"",

}


const tutorLoginSlice = createSlice(
    {
        name:"tutorLogin",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            
            changeEmail:(state,action)=>{
                state.value.email=action.payload
            },
 
            changePassword:(state,action)=>{
                state.value.password=action.payload
            },


        }

    }

)

export const {changeEmail,changePassword} = tutorLoginSlice.actions

export default tutorLoginSlice.reducer