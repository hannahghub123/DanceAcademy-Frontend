import {createSlice} from "@reduxjs/toolkit";


const INITITALSTATE={
    title:"",
    description:"",
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
            

        }

    }

)

export const {changeTitle,changeDescription} = admincourseEditSlice.actions

export default admincourseEditSlice.reducer