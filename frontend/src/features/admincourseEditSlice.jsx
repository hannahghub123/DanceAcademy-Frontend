import {createSlice} from "@reduxjs/toolkit";


const INITITALSTATE={
    title:"",
    description:"",
    status:""
}


const admincourseEditSlice = createSlice(
    {
        name:"admincourseEdit",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            changeTitle:(state,action)=>{
                state.value.title=action.payload
            },
            changeDescription:(state,action)=>{
                state.value.description=action.payload
            },
            changeStatus:(state,action)=>{
                state.value.status = action.payload
            }

        }

    }

)

export const {changeTitle,changeDescription,changeStatus} = admincourseEditSlice.actions

export default admincourseEditSlice.reducer