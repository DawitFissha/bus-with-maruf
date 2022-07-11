import { createSlice } from "@reduxjs/toolkit";
const busSlice=createSlice({
    name:"buslist",
    initialState:{tableData:[],isEditing:false,updated:false},
    reducers:{
        setTableData(state,action){state.tableData=action.payload},
        setEditing(state,action){state.isEditing=action.payload},
        setFetch(state){state.updated=!state.updated},
    },
})
export default busSlice.reducer;
export const busActions=busSlice.actions;

