import {createSlice} from "@reduxjs/toolkit"

const INITITALSTATE={

    accessT:null,
    accessS:null,

}


const logoutSlice = createSlice(
    {
        name:"logout",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            
            changeaccessT:(state,action)=>{
                state.value.accessT=action.payload
            },
 
            changeaccessS:(state,action)=>{
                state.value.accessS=action.payload
            },


        }

    }

)

export const {changeaccessT,changeaccessS} = logoutSlice.actions

export default logoutSlice.reducer