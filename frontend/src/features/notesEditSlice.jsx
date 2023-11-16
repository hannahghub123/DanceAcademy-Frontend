import {createSlice} from "@reduxjs/toolkit";


const INITITALSTATE={
    notes:"",
}


const notesEditSlice = createSlice(
    {
        name:"notesEdit",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            changeNotes:(state,action)=>{
                state.value.notes=action.payload
            },
            

        }

    }

)

export const {changeNotes} = notesEditSlice.actions

export default notesEditSlice.reducer