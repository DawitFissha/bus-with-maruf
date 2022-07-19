import { cityActions } from "./city-slice"
import axios_instance from "../services/lib-config"
import { errorActions } from "./error-slice"
import {loadingActions} from "./loading-slice"

export const addCity=(data)=>{
    return async(dispatch)=>{
        try{
            console.log(data)
            const res=await axios_instance.post('registercity',data)
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
            const res=await axios_instance.get('getallorganizationcity')
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
            const res=await axios_instance.put(`updatecityinfo/${data.id}`,data)
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