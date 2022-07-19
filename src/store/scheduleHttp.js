import { scheduleActions } from "../views/schedule/scheduleSlice"
import axios from "axios"
import { errorActions } from "./error-slice"
axios.defaults.withCredentials = true

export const getSchedule=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios.get('https://melabus.herokuapp.com/getdetailschedule')
            console.log(res.data)
            dispatch(scheduleActions.setTableData(res.data))
            
        }
       catch(err)
       {
    console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}

export const getSalesSchedule=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios.get('https://melabus.herokuapp.com/getallfilterschedule')
            console.log(res.data)
            dispatch(scheduleActions.setScheudleData(res.data))
            
        }
       catch(err)
       {
    console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const getOneSchedule=(id)=>{
    return async(dispatch)=>{
        try{
            const res=await axios.get(`https://melabus.herokuapp.com/getschedulebyid/${id}`)
            console.log(res.data)
            dispatch(scheduleActions.setTableData(res.data))
            
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
            dispatch(scheduleActions.setBusData(res.data))
            
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const getAllCity=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios.get('https://melabus.herokuapp.com/getcityonly')
            console.log(res.data)
            dispatch(scheduleActions.setCityData(res.data))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const getAllDepPlace=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios.get('https://melabus.herokuapp.com/getalldepartureplace')
            console.log(res.data)
            dispatch(scheduleActions.setDepData(res.data))
            
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}

export const assignBus=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios.put(`https://melabus.herokuapp.com/assignbustoschedule/${id}`,data)
            console.log(res.data)
            dispatch(scheduleActions.setFetch())  
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

export const updatePassInfo=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios.put(`https://melabus.herokuapp.com/updatepassinfo/${id}`,data)
            console.log(res.data)
            dispatch(scheduleActions.setFetch())  
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
export const refundTicket=(data)=>{
    return async(dispatch)=>{
        try{
            const res=await axios.put(`https://melabus.herokuapp.com/refundrequest/${data.id}`)
            dispatch(scheduleActions.setFetch())
            dispatch(errorActions.Message("schedule canceled"))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}

export const cancelShcedule=(data)=>{
    return async(dispatch)=>{
        try{
            const res=await axios.put(`https://melabus.herokuapp.com/cancelschedule/${data.id}`)
            dispatch(scheduleActions.setFetch())
            dispatch(errorActions.Message("schedule canceled"))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}