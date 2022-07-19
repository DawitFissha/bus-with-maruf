import UserService from '../../services/user.service'
import AuthService from "../../services/auth.service";
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('users/fetchUsers',async ()=>{

return await (await UserService.getUserList()).data

})

export const addUsers = createAsyncThunk('users/addNewuser',async (user: any) => {
    return await  ( await AuthService.addUser(user)).data
    
  }
)

type initialStateType = {
    users:any[],
    status:'idle' | 'loading' | 'succeeded' | 'failed'
    error:string|undefined
    tableData:any[]
    isEditing:boolean
    updated:boolean
    isModalOpen:boolean
}

const initialState:initialStateType = {
        users:[],
        status:'idle',
        error:"",
        tableData:[],
        isEditing:false,
        updated:false,
        isModalOpen:false
        } as initialStateType

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
      setTableData(state,action){state.tableData=action.payload},
      setEditing(state,action){state.isEditing=action.payload},
      setFetch(state){state.updated=!state.updated},
      setModal(state,action){state.isModalOpen=action.payload},
    },
    extraReducers(builder) {
        builder
          .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            
            state.users = state.users.concat(action.payload)
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
         
          .addCase(addUsers.fulfilled,(state,action)=>{
              state.users.push(action.payload)
            })
          
      }
})
// export const {addUser} = usersSlice.actions
export default usersSlice.reducer
export const userActions = usersSlice.actions;
