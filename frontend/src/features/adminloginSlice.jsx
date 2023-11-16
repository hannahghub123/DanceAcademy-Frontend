import {createSlice} from "@reduxjs/toolkit"

const INITITALSTATE={
    username:"",
    password:"",  
}

const adminloginSlice = createSlice(
    {
        name:"adminlogin",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            changeUsername:(state,action)=>{
                state.value.username=action.payload
            },
            changePassword:(state,action)=>{
                state.value.password=action.payload
            },
        
        }

    }


)

export const {changeUsername,changePassword} = adminloginSlice.actions

export default adminloginSlice.reducer