import {createSlice} from "@reduxjs/toolkit";


const INITITALSTATE={
    feedback:"",
}


const feedbackEditSlice = createSlice(
    {
        name:"feedbackEdit",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            changeFeedback:(state,action)=>{
                state.value.feedback=action.payload
            },
            

        }

    }

)

export const {changeFeedback} = feedbackEditSlice.actions

export default feedbackEditSlice.reducer