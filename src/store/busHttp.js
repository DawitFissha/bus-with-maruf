import { busActions } from "./bus-slice"
import axios_instance from "../services/lib-config"
import { errorActions } from "./error-slice"
import { loadingActions } from "./loading-slice"

export const getBus=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getdetailorganizationbus')
            console.log(res.data)
            dispatch(busActions.setTableData(res.data))
            
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const getUserByRole=(role)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get(`getuserbyrole?role=${role}`)
            console.log(res.data)
            console.log("not assigned")
            role==="driver"&&dispatch(busActions.setDriverData(res.data))
            role==="redat"&&dispatch(busActions.setRedatData(res.data))

        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const getAssignedUserByRole=(role)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get(`getassigneduserbyrole?role=${role}`)
            console.log(res.data)
            role==="driver"&&dispatch(busActions.setDriverData(res.data))
            role==="redat"&&dispatch(busActions.setRedatData(res.data))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const getAssignedUserByRoleWithedit=(role,current)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get(`getuserwithedit?role=${role}&current=${current}`)
            console.log(res.data)
            role==="driver"&&dispatch(busActions.setDriverData(res.data))
            role==="redat"&&dispatch(busActions.setRedatData(res.data))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const updateBus=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`updatebusinfo/${id}`,data)
            dispatch(busActions.setFetch())
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
export const updateBusw=(id,data)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`updatebusinfo/${id}`,data)
            dispatch(busActions.setFetch())
            dispatch(loadingActions.status("done"))
            dispatch(errorActions.Message("buser"))
            console.log(res)
        }
       catch(err)
       {
        console.log(err)
        dispatch(loadingActions.status("done"))
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const deleteBus=(id,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.delete(`deletebus/${id}`)
            dispatch(busActions.setFetch())
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