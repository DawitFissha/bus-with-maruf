import { scheduleActions } from "./schedule-slice"
import axios_instance from "../services/lib-config"
import { errorActions } from "./error-slice"
import { loadingActions } from "./loading-slice"


export const getSchedule=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getdetailschedule')
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
            const res=await axios_instance.get('getallfilterschedule')
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
            const res=await axios_instance.get(`getschedulebyid/${id}`)
            console.log(res.data)
            dispatch(scheduleActions.setHistoryData(res.data))
            
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
//imported
export const getAllCity=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.get('getcityonly')
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
export const getAllDepPlace=(source)=>{
    return async(dispatch)=>{
        console.log(source)
        try{
            const res=await axios_instance.get('getalldepartureplace',{params:{source}})
            console.log(res)
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

export const updateDepartureDateTime=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`updatedeparturedatetime/${id}`,data)
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
            const res=await axios_instance.put(`updatepassinfo/${id}`,data)
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
export const getOrgRule=()=>{
    return async(dispatch)=>{
        try{
            console.log('http rule')
            const res=await axios_instance.get(`getmyorgrules`)
            console.log(res.data)
            dispatch(scheduleActions.setOrgRule(res.data))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const refundTicket=(data)=>{
    return async(dispatch)=>{
        try{
            await axios_instance.put(`refundrequest/${data.id}`,data)
            dispatch(scheduleActions.setFetch())
            dispatch(errorActions.Message("ticket canceled"))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}
export const updateScheduleBusAndPlace=(id,data)=>{
    return async(dispatch)=>{
        try{
            console.log("statr")
            const res=await axios_instance.put(`assignbustoschedule/${id}`,data)
            console.log(res)
            dispatch(scheduleActions.setFetch())
            dispatch(errorActions.Message("schedule-bus-place"))
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

export const cancelShcedule=(data)=>{
    return async(dispatch)=>{
        try{
            const res=await axios_instance.put(`cancelschedule/${data.id}`)
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