import { cityActions } from "./city-slice"
import axios from "axios"
import { errorActions } from "./error-slice"
import {loadingActions} from "./loading-slice"
axios.defaults.withCredentials = true

export const addCity=(data)=>{
    return async(dispatch)=>{
        try{
            console.log(data)
            const res=await axios.post('https://melabus.herokuapp.com/registercity',data)
            console.log(res.data)
            dispatch(cityActions.setFetch())
            dispatch(errorActions.Message('city'))
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
export const getCity=()=>{
    return async(dispatch)=>{
        try{
            const res=await axios.get('https://melabus.herokuapp.com/getallorganizationcity')
            console.log(res.data)
            dispatch(cityActions.setTableData(res.data))
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
export const updateCity=(data)=>{
    return async(dispatch)=>{
        try{
            console.log(data)
            const res=await axios.put(`https://melabus.herokuapp.com/updatecityinfo/${data.id}`,data)
            console.log(res.data)
            dispatch(cityActions.setFetch())
            dispatch(errorActions.Message('city'))
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