import {createSlice} from "@reduxjs/toolkit"

const INITITALSTATE={

    username:"",
    password:"",

}


const stdLoginSlice = createSlice(
    {
        name:"stdLogin",
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

export const {changeUsername,changePassword} = stdLoginSlice.actions

export default stdLoginSlice.reducer