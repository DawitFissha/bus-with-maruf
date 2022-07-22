import { userActions } from "./user-slice"
import axios from "axios"
import { errorActions } from "./error-slice"
import { loadingActions } from "./loading-slice"
axios.defaults.withCredentials = true

export const getUser=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios.get('https://melabus.herokuapp.com/getallorganizationuser')
            console.log(res.data)
            dispatch(userActions.setTableData(res.data))
            
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}

export const updateUser=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            console.log("send request")
            const res=await axios.put(`https://melabus.herokuapp.com/updateorganizationuser/${id}`,data)
            dispatch(userActions.setFetch())
            console.log(res)
            resolve()
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))
     resolve()
       }

    }
}

export const resetPassword=(data)=>{
    return async(dispatch)=>{
        try{
            console.log(data)
            await axios.put(`https://melabus.herokuapp.com/resetpassword/${data.id}`,data)
            dispatch(userActions.setFetch())
            dispatch(errorActions.Message('password reset'))
            dispatch(loadingActions.status("done"))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))
     dispatch(loadingActions.status("done"))
    }

    }
}

export const deleteRoute=(id,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios.delete(`https://melabus.herokuapp.com/deleteroute/${id}`)
            dispatch(userActions.setFetch())
            console.log(res)
            resolve()
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))
     resolve()

       }

    }
}