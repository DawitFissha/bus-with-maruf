import { loginActions } from "./login-slice"
import { loadingActions } from "./loading-slice"
import axios_instance from "../services/lib-config"
import { errorActions } from "./error-slice"
import { userinfoActions } from "./userinfo-slice"
export const checkSession=()=>{
    return async(dispatch)=>{
        try{
            console.log("check vaidity")
            const res= await axios_instance.get('checkauth')
            console.log(res)
        }
       catch(err)
       {
        console.log( err.response.data.message)
        err.response.data.message==="no token"&&dispatch(loginActions.isLoged(false))
        err.response.data.message==="no token"&&dispatch(errorActions.Message(''))
       }

    }
}
export const Organization=(data)=>{
    return async(dispatch)=>{
        try{
            console.log(data)
            const res=await axios_instance.post('getorganizationbycode',data)
            console.log(res)
            dispatch(loginActions.organization(res.data?.organizationName))
            dispatch(loginActions.organizationCode(res.data?.organizationCode))
            dispatch(loginActions.isOrgCodeValid(true))
            dispatch(loadingActions.status('done'))
        }
       catch(err)
       {
        alert(err.response.data.message)
     !!err.response&&dispatch(loginActions.isLoged(false))
     !!err.response&&dispatch(errorActions.Message(err.response?.data?.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))
     dispatch(loadingActions.status('done'))
     
       }

    }
}
export const loginUser=(data)=>{
    console.log(data)
    return async(dispatch)=>{
        try{
            const res=await axios_instance.post('loginorganizationuser',data)
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

export const changePassword=(data)=>{
    return async(dispatch)=>{
        try{
            await axios_instance.put(`changepassword`,data)
            dispatch(errorActions.Message(''))
            dispatch(loadingActions.status('done'))
            dispatch(errorActions.Message('changed'))
            
        }
       catch(err)
       {
        console.log(err)
       dispatch(loadingActions.status('done'))
     !!err.response&&dispatch(errorActions.Message(err.response.data.message))
     !err.response&&dispatch(errorActions.Message('connection error please try again'))

       }

    }
}

