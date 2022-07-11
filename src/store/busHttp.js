import { busActions } from "./bus-slice"
import axios from "axios"
import { errorActions } from "./error-slice"
axios.defaults.withCredentials = true

export const getBus=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios.get('https://melabus.herokuapp.com/getdetailorganizationbus')
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
export const updateBus=(id,data,resolve)=>{
    return async(dispatch)=>{
        try{
            const res=await axios.put(`https://melabus.herokuapp.com/updatebusinfo/${id}`,data)
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
            const res=await axios.delete(`https://melabus.herokuapp.com/deletebus/${id}`)
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