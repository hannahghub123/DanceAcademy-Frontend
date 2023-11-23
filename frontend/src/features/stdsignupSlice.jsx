import {createSlice} from "@reduxjs/toolkit"

const INITITALSTATE={
    username:"",
    name:"",
    email:"",
    phone:"",
    // score:"",
    password:"",
    repassword:"",
    error:{
        username:null,
        name:null,
        email:null,
        phone:null,
        password:null,
        repassword:null,
        submiterror:null,   
    },
    errorcheck:false,
}


const stdSignupSlice = createSlice(
    {
        name:"stdSignup",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            changeUsername:(state,action)=>{
                if (!/^[a-zA-Z0-9]+$/
                .test(action.payload)){
                    state.value.error.username="Enter valid username!"
                    state.value.error.submiterror=null
                    state.value.errorcheck=true
                }
                else{
                    state.value.error.username=null
                    state.value.username=action.payload
                    state.value.errorcheck=false
                }
            },
            changeName:(state,action)=>{
                // state.value.name=action.payload

                if (!/^[a-zA-Z][a-zA-Z ]*$/.test(action.payload)){
                    state.value.error.name="Name can only have alphabets!"
                    state.value.error.submiterror=null
                    state.value.errorcheck=true
                }
                else{
                    state.value.error.name=null
                    state.value.name=action.payload
                    state.value.errorcheck=false
                }
            },
            changeEmail:(state,action)=>{
                // state.value.email=action.payload
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(action.payload)){
                    state.value.error.email="Invalid Email!"
                    state.value.error.submiterror=null
                    state.value.errorcheck=true
                }
                else{
                    state.value.email=action.payload
                    state.value.error.email=null
                    state.value.errorcheck=false
                }
            },
            changePhone:(state,action)=>{
                // state.value.phone=action.payload
                if(!/^(?!([0-9])\1{9})[0-9]{10}$/.test(action.payload)){
                    state.value.error.phone="Invalid Phonenumber"
                    state.value.error.submiterror=null
                    state.value.errorcheck=true
                    
                }
                else{
                    state.value.phone=action.payload
                    state.value.error.phone=null
                    state.value.errorcheck=false
                }
            },
            // changeScore:(state,action)=>{
            //     state.value.score=action.payload
            // },
            changePassword:(state,action)=>{
                if (!/^[a-zA-Z0-9]+$/
                .test(action.payload)) {
                    state.value.error.password = "Enter valid password";
                    state.value.error.submiterror = null;
                    state.value.errorcheck = true;
                } else {
                    state.value.password = action.payload;
                    state.value.error.password = null;
                    state.value.errorcheck = false;
                }
            },
            changeRepassword:(state,action)=>{
                // state.value.repassword=action.payload
                if(action.payload!==state.value.password){
                    state.value.error.repassword="Password doesnt match!"
                    state.value.error.submiterror=null
                    state.value.errorcheck=true
                }
                else{
                    state.value.repassword=action.payload
                    state.value.error.repassword=null
                    state.value.errorcheck=false

                }
            },
            submitForm:(state,action)=>{
                if (state.value.username===""|| state.value.name==="" || state.value.email==="" || state.value.phone===""|| state.value.password==="" || state.value.repassword===""){
                    state.value.error.submiterror="Please Fill All The Fields!"
                    
                }
                else{
                    state.value.error.submiterror=null
                    

                }
                
                
            },

        }

    }

)

export const {changeUsername,changeName,changeScore,changeEmail,changePhone,changePassword,changeRepassword,submitForm} = stdSignupSlice.actions

export default stdSignupSlice.reducer