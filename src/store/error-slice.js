import { createSlice } from "@reduxjs/toolkit";
const errorSlice=createSlice({
    name:"errmessage",
    initialState:{errMessage:''},
    reducers:{
        Message(state,action){state.errMessage=action.payload}

    },
})
export default errorSlice.reducer;
export const errorActions=errorSlice.actions;

