import { busActions } from "./bus-slice"
import axios_instance from "../services/lib-config"
import { errorActions } from "./error-slice"

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