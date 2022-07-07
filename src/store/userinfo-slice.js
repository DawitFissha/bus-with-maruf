import { createSlice } from "@reduxjs/toolkit";
const userinfoSlice=createSlice({
    name:"userinfo",
    initialState:{username:'',role:''},
    reducers:{
        setUser(state,action){
            state.username=action.payload.username
            state.role=action.payload.role
        },

    },
})

export default userinfoSlice.reducer;
export const userinfoActions=userinfoSlice.actions;
