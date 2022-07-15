import { createSlice } from "@reduxjs/toolkit";
const userSlice=createSlice({
    name:"userlist",
    initialState:{tableData:[],isEditing:false,updated:false,isModalOpen:false},
    reducers:{
        setTableData(state,action){state.tableData=action.payload},
        setEditing(state,action){state.isEditing=action.payload},
        setFetch(state){state.updated=!state.updated},
        setModal(state,action){state.isModalOpen=action.payload},
    },
})
export default userSlice.reducer;
export const userActions=userSlice.actions;

