import { createSlice } from "@reduxjs/toolkit";
const ModalSlice=createSlice({
    name:"modallist",
    initialState:{isUserModalOpen:false,
        isRouteModalOpen:false,
        isCashModalOpen:false,
        isRefundModalOpen:false,
        refundModalData:{}
    },
    reducers:{
        setUserModal(state,action){state.isUserModalOpen=action.payload},
        setRouteModal(state,action){state.isRouteModalOpen=action.payload},
        setCashModal(state,action){state.isCashModalOpen=action.payload},
        setRefundModal(state,action){state.isRefundModalOpen=action.payload},
        setRefundModalData(state,action){state.refundModalData=action.payload},


    },
})
export default ModalSlice.reducer;
export const modalActions=ModalSlice.actions;

