import {createSlice} from "@reduxjs/toolkit";


const INITITALSTATE={
    username:"",
    name:"",
    course:"",
    score:"",
    email:"",
    phone:"",
    password:"",
    repassword:""
}


const stdEditSlice = createSlice(
    {
        name:"stdEdit",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            changeUsername:(state,action)=>{
                state.value.username=action.payload
            },
            changeName:(state,action)=>{
                state.value.name=action.payload
            },
            // changeCourse:(state,action)=>{
            //     state.value.course=action.payload
            // },
            // changeScore:(state,action)=>{
            //     state.value.score=action.payload
            // },
            changeEmail:(state,action)=>{
                state.value.email=action.payload
            },
            changePhone:(state,action)=>{
                state.value.phone=action.payload
            },
            changePassword:(state,action)=>{
                state.value.password=action.payload
            },
            changeRepassword:(state,action)=>{
                state.value.repassword=action.payload
            },

        }

    }

)

export const {changeUsername,changeName,changeScore,changeCourse,changeEmail,changePhone,changePassword,changeRepassword} = stdEditSlice.actions

export default stdEditSlice.reducer