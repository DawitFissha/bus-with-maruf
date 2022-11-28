import { userActions } from "./user-slice"
import axios_instance from "../services/lib-config"
import { errorActions } from "./error-slice"
import { loadingActions } from "./loading-slice"

export const getUser=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getallorganizationuser')
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
            const res=await axios_instance.put(`updateorganizationuser/${id}`,data)
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
            console.log("send request")
            const res=await axios_instance.put(`resetpassword/${data.id}`,data)
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

//not imlemented
export const deleteRoute=(id,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.delete(`deleteroute/${id}`)
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