import {createSlice} from "@reduxjs/toolkit";


const INITITALSTATE={
    task:"",
}


const taskEditSlice = createSlice(
    {
        name:"taskEdit",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            changeTask:(state,action)=>{
                state.value.task=action.payload
            },
            

        }

    }

)

export const {changeTask} = taskEditSlice.actions

export default taskEditSlice.reducer