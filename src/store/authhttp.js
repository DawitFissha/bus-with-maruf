import { loginActions } from "./login-slice"
import { loadingActions } from "./loading-slice"
import axios from "axios"
import { errorActions } from "./error-slice"
import { userinfoActions } from "./userinfo-slice"
export const addUser=(data)=>{
    return async(dispatch)=>{
        try{
            alert(data.code)
            console.log(data)
            const res=await axios.post('https://sultan-lm2.herokuapp.com/register',data,{ withCredentials: true })
            console.log(res)
            dispatch(loadingActions.status("done"))
            dispatch(errorActions.Message('added'))
            
        }
       catch(err)
       {
           console.log(err)
           console.log(err.response)
        !!err.response&&dispatch(errorActions.Message(err.response.data.message))
        !err.response&&dispatch(errorActions.Message('connection error please try again'))
        dispatch(loadingActions.status('done'))

       }

    }
}

export const Organization=(data)=>{
    return async(dispatch)=>{
        try{
            console.log(data)
            const res=await axios.post('https://melabus.herokuapp.com/getorganizationbycode',data,{ withCredentials: true })
            console.log(res)
            dispatch(loginActions.organization(res.data.organizationName))
            dispatch(loginActions.organizationCode(res.data.organizationCode))
            dispatch(loginActions.isOrgCodeValid(true))
            dispatch(loadingActions.status('done'))
        }
       catch(err)
       {
        alert(err.response.data.message)
     !!err.response&&dispatch(loginActions.isLoged(false))
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))
     dispatch(loadingActions.status('done'))
     
       }

    }
}
export const loginUser=(data)=>{
    console.log(data)
    return async(dispatch)=>{
        try{
            const res=await axios.post('https://melabus.herokuapp.com/loginorganizationuser',data,{ withCredentials: true })
            console.log(res)
            dispatch(loginActions.isLoged(true))
            dispatch(loginActions.setCookie(res.data.token))
            console.log(res.data.token)
            dispatch(loadingActions.status('done'))
            dispatch(userinfoActions.setUser({username:res.data.username,role:res.data.role}))
        }
       catch(err)
       {
        console.log(err)
     !!err.response&&dispatch(loginActions.isLoged(false))
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))
     dispatch(loadingActions.status('done'))
     
       }

    }
}