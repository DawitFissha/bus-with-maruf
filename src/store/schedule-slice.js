import { createSlice } from "@reduxjs/toolkit";
const scheduleSlice=createSlice({
    name:"schedulelist",
    initialState:{tableData:[],historyData:[],isEditing:false,updated:false,scheduleData:[],busData:[],cityData:[],depData:[],isBusModalOpen:false,isModalOpen:false,modalData:{}},
    reducers:{
        setTableData(state,action){state.tableData=action.payload},
        setHistoryData(state,action){state.historyData=action.payload},
        setBusData(state,action){state.busData=action.payload},
        setScheudleData(state,action){state.scheduleData=action.payload},
        setDepData(state,action){state.depData=action.payload},
        setCityData(state,action){state.cityData=action.payload},
        setEditing(state,action){state.isEditing=action.payload},
        setFetch(state){state.updated=!state.updated},
        setModal(state,action){state.isModalOpen=action.payload},
        setBusModal(state,action){state.isBusModalOpen=action.payload},
        setModalData(state,action){state.modalData=action.payload}

    },
})
export default scheduleSlice.reducer;
export const scheduleActions=scheduleSlice.actions;

