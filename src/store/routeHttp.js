import { routeActions } from "./route-slice"
import axios_instance from "../services/lib-config"
import { errorActions } from "./error-slice"
import { loadingActions } from "./loading-slice"
export const getRoute=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getorganizationdetailroute')
            console.log(res.data)
            dispatch(routeActions.setTableData(res.data))
            
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const getActiveBus=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getorganizationactivebus')
            console.log(res.data)
            dispatch(routeActions.setBusData(res.data))
            
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const getAllOrgBus=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getallorganizationbus')
            console.log(res.data)
            dispatch(routeActions.setAllBusData(res.data))
            
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const updateRoute=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`updaterouteinfo/${id}`,data)
            dispatch(routeActions.setFetch())
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
export const updateRouteBusAndPlace=(id,data)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`updateroutebusandplace/${id}`,data)
            dispatch(routeActions.setFetch())
            dispatch(errorActions.Message("route-bus-place"))
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
            const res=await axios_instance.delete(`deleteroute/${id}`)
            dispatch(routeActions.setFetch())
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
export const getAllDepPlace=(source)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getalldepartureplace',{params:{source}})
            console.log(res.data)
            dispatch(routeActions.setDepData(res.data))
            
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}