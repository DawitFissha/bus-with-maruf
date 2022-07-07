import { createSlice } from "@reduxjs/toolkit";
const loadingSlice=createSlice({
    name:"loading",
    initialState:{status:'untouched'},
    reducers:{
        status(state,action){state.status=action.payload},

    },
})

export default loadingSlice.reducer;
export const loadingActions=loadingSlice.actions;
