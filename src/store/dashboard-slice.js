import { createSlice } from "@reduxjs/toolkit";
const dashboardSlice=createSlice({
    name:"modal",
    initialState:{sort:"day",show:false,active:1},
    reducers:{
        toggleShow(state){state.show=!state.show},
        setSideNav(state,action){state.show=action.payload},
        setFiltering(state,action){state.sort=action.payload},
        setActive(state,action){state.active=action.payload},
        
    },
})
export default dashboardSlice.reducer;
export const dashboardActions=dashboardSlice.actions;

