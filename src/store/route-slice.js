import { createSlice } from "@reduxjs/toolkit";
const routeSlice=createSlice({
    name:"routelist",
    initialState:{tableData:[],isEditing:false,updated:false,depData:[],busData:[],isModalOpen:false},
    reducers:{
        setTableData(state,action){state.tableData=action.payload},
        setBusData(state,action){state.busData=action.payload},
        setDepData(state,action){state.depData=action.payload},
        setEditing(state,action){state.isEditing=action.payload},
        setFetch(state){state.updated=!state.updated},
        setModal(state,action){state.isModalOpen=action.payload}

    },
})
export default routeSlice.reducer;
export const routeActions=routeSlice.actions;

