import {createSlice} from "@reduxjs/toolkit";

const INITITALSTATE={
    username:"",
    name:"",
    qualification:"",
    expertise:"",
    email:"",
    phone:"",
    password:"",
    repassword:""
}


const tutorprofileEditSlice = createSlice(
    {
        name:"tutorprofileEdit",
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
            changeQualification:(state,action)=>{
                state.value.qualification=action.payload
            },
            changeExpertise:(state,action)=>{
                state.value.expertise=action.payload
            },
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

export const {changeUsername,changeName,changeExpertise,changeQualification,changeEmail,changePhone,changePassword,changeRepassword} = tutorprofileEditSlice.actions

export default tutorprofileEditSlice.reducer