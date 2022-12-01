import { createSlice } from "@reduxjs/toolkit";
const scheduleSlice=createSlice({
    name:"schedulelist",
    initialState:{orgRule:{},isBusModalOpen:false,isModalOpen:false,modalData:{}},
    reducers:{
        setModal(state,action){state.isModalOpen=action.payload},
        setBusModal(state,action){state.isBusModalOpen=action.payload},
        setModalData(state,action){state.modalData=action.payload},
        setOrgRule(state,action){state.orgRule=action.payload}
    },
})
export default scheduleSlice.reducer;
export const scheduleActions=scheduleSlice.actions;

