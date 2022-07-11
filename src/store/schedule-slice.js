import { createSlice } from "@reduxjs/toolkit";
const scheduleSlice=createSlice({
    name:"schedulelist",
    initialState:{tableData:[],isEditing:false,updated:false,busData:[],depData:[]},
    reducers:{
        setTableData(state,action){state.tableData=action.payload},
        setBusData(state,action){state.busData=action.payload},
        setDepData(state,action){state.depData=action.payload},
        setEditing(state,action){state.isEditing=action.payload},
        setFetch(state){state.updated=!state.updated},
    },
})
export default scheduleSlice.reducer;
export const scheduleActions=scheduleSlice.actions;

