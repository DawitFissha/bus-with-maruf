import * as React from 'react'

export default function useError(){
    
    const initalState = {
        error:false,
        errorMessage:''
    }
    const [state,setState] = React.useState(initalState)
    const handleErrorOccured = ()=> setState({...state,error:true})
    const handleErrorMessage = (message:string) => setState({...state,errorMessage:message})
    return [
        state,
        
        {
            setErrorOccured : handleErrorOccured,
            setErrorMessage1 : handleErrorMessage,
        },
    ];
}