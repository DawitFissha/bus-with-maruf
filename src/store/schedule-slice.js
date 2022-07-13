import { createSlice } from "@reduxjs/toolkit";
const scheduleSlice=createSlice({
    name:"schedulelist",
    initialState:{tableData:[],isEditing:false,updated:false,scheduleData:[],busData:[],depData:[],isModalOpen:false,modalData:{}},
    reducers:{
        setTableData(state,action){state.tableData=action.payload},
        setBusData(state,action){state.busData=action.payload},
        setScheudleData(state,action){state.scheduleData=action.payload},
        setDepData(state,action){state.depData=action.payload},
        setEditing(state,action){state.isEditing=action.payload},
        setFetch(state){state.updated=!state.updated},
        setModal(state,action){state.isModalOpen=action.payload},
        setModalData(state,action){state.modalData=action.payload}

    },
})
export default scheduleSlice.reducer;
export const scheduleActions=scheduleSlice.actions;

