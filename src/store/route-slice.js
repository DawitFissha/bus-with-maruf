import { createSlice } from "@reduxjs/toolkit";
const routeSlice=createSlice({
    name:"routelist",
    initialState:{tableData:[],isEditing:false,updated:false,busData:[]},
    reducers:{
        setTableData(state,action){state.tableData=action.payload},
        setBusData(state,action){state.busData=action.payload},
        setEditing(state,action){state.isEditing=action.payload},
        setFetch(state){state.updated=!state.updated},
    },
})
export default routeSlice.reducer;
export const routeActions=routeSlice.actions;

