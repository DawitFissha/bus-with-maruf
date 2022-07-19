import { routeActions } from "../views/route/routeSlice"
import axios from "axios"
import { errorActions } from "./error-slice"

axios.defaults.withCredentials = true

export const getRoute=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios.get('https://melabus.herokuapp.com/getorganizationroute')
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
            const res=await axios.get('https://melabus.herokuapp.com/getorganizationactivebus')
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
export const updateRoute=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios.put(`https://melabus.herokuapp.com/updaterouteinfo/${id}`,data)
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
export const deleteRoute=(id,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios.delete(`https://melabus.herokuapp.com/deleteroute/${id}`)
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