import { createSlice } from "@reduxjs/toolkit";
const citySlice=createSlice({
    name:"citylist",
    initialState:{isModalOpen:false,updateData:{}},
    reducers:{
        setUpdateData(state,action){state.updateData=action.payload},
        setModal(state,action){state.isModalOpen=action.payload}
    },
})
export default citySlice.reducer;
export const cityActions=citySlice.actions;

