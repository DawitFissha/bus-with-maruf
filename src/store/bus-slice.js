import { createSlice } from "@reduxjs/toolkit";
const busSlice=createSlice({
    name:"buslist",
    initialState:{isEditing:false,isModalOpen:false},
    reducers:{
        setEditing(state,action){state.isEditing=action.payload},
        setModal(state,action){state.isModalOpen=action.payload}

    },
})
export default busSlice.reducer;
export const busActions=busSlice.actions;

