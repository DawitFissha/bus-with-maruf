import { createSlice } from "@reduxjs/toolkit";
const loginSlice=createSlice({
    name:"login",
    initialState:{isAuthenticated:false,organizationName:'',organizationCode:'',isOrgCodeValid:false,token:''},
    reducers:{
        isLoged(state,action){state.isAuthenticated=action.payload},
        organization(state,action){state.organizationName=action.payload},
        organizationCode(state,action){state.organizationCode=action.payload},
        isOrgCodeValid(state,action){state.isOrgCodeValid=action.payload},
        setCookie(state,action){state.token=action.payload}

    },
})

export default loginSlice.reducer;
export const loginActions=loginSlice.actions;
