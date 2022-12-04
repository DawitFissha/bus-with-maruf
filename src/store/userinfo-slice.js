import { createSlice } from "@reduxjs/toolkit";
const userinfoSlice=createSlice({
    name:"userinfo",
    initialState:{username:'',role:'',calender:'gc'},
    reducers:{
        setUser(state,action){
            state.username=action.payload.username
            state.role=action.payload.role
        },
        setCalender(state,action){state.calender=action.payload},

    },
})

export default userinfoSlice.reducer;
export const userinfoActions=userinfoSlice.actions;
