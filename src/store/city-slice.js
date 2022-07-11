import { createSlice } from "@reduxjs/toolkit";
const citySlice=createSlice({
    name:"citylist",
    initialState:{tableData:[],isEditing:false,updated:false,isModalOpen:false,updateData:{}},
    reducers:{
        setTableData(state,action){state.tableData=action.payload},
        setBusData(state,action){state.busData=action.payload},
        setUpdateData(state,action){state.updateData=action.payload},
        setFetch(state){state.updated=!state.updated},
        setModal(state,action){state.isModalOpen=action.payload}
    },
})
export default citySlice.reducer;
export const cityActions=citySlice.actions;

