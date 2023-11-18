import {createSlice} from "@reduxjs/toolkit";


const INITITALSTATE={
    title:"",
    description:"",
}


const addCourseSlice = createSlice(
    {
        name:"addCourse",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            AddTitle:(state,action)=>{
                state.value.title=action.payload
            },
            AddDescription:(state,action)=>{
                state.value.description=action.payload
            },
            

        }

    }

)

export const {AddTitle,AddDescription} = addCourseSlice.actions

export default addCourseSlice.reducer