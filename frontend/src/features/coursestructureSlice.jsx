import {createSlice} from "@reduxjs/toolkit";


const INITITALSTATE={
    title:"",
    duration:"",
    price:"",
    description:"",
    num_of_classes:"",
    levels:"",
    price_per:"",
}


const courseStructureEditSlice = createSlice(
    {
        name:"courseStructureEdit",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            changeTitle:(state,action)=>{
                state.value.title=action.payload
            },
            changeDuration:(state,action)=>{
                state.value.duration = action.payload
            },
            changePrice:(state,action)=>{
                state.value.price=action.payload
            },
            changeDescription:(state,action)=>{
                state.value.description=action.payload
            },
            changeNumofClasses:(state,action)=>{
                state.value.num_of_classes=action.payload
            },
            changeLevels:(state,action)=>{
                state.value.levels=action.payload
            },
            changePriceper:(state,action)=>{
                state.value.price_per=action.payload
            },
            

        }

    }

)

export const {changeTitle,changeDescription,changeDuration,changeLevels,changeNumofClasses,changePrice,changePriceper} = courseStructureEditSlice.actions

export default courseStructureEditSlice.reducer