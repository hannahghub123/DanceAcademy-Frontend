import {createSlice} from "@reduxjs/toolkit"

const INITITALSTATE={
    username:"",
    name:"",
    email:"",
    phone:"",
    password:"",
    editactive:null,
    deleteactive:null,
    searchvalue:""
  
}


const admindashSlice = createSlice(
    {
        name:"adminhome",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            changeEmail:(state,action)=>{
                state.value.email=action.payload
            },
            changeName:(state,action)=>{
                state.value.name=action.payload
            },
            changeUserName:(state,action)=>{
                state.value.username=action.payload
            },
            changePhonenumber:(state,action)=>{
                state.value.phone=action.payload
            },
            changePassword:(state,action)=>{
                state.value.password=action.payload
            },
            changeEditstate:(state,action)=>{
                state.value.editactive=(action.payload)
            },
            changeDeletestate:(state,action)=>{
                state.value.deleteactive=action.payload
            },
            changeSearch:(state,action)=>{
                state.value.searchvalue=action.payload
            }
        
    

        }



    }


)

export const {changeUserName,changeEmail,changeName,changePhonenumber,changePassword,changeEditstate,changeDeletestate,changeSearch} = admindashSlice.actions

export default admindashSlice.reducer