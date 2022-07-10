import * as React from 'react'
interface errorTypes {
    error:boolean
    errorMessage:string
    setErrorOccured:(value:boolean)=>void,
    setErrorMessage :(message:string)=>void

}

export default function useError():[errorTypes['error'],errorTypes['errorMessage'],errorTypes['setErrorOccured'],errorTypes['setErrorMessage']]{
    const [error,setError] = React.useState(false)
    const [errorMessage,setErrorMessage] = React.useState('')
    const handleErrorOccured = (value:boolean) => {setError(value)}
    const handleErrorMessage = (message:string) => {setErrorMessage(message)}
    return [
        error,
        errorMessage,
        handleErrorOccured,
        handleErrorMessage
        
    ];
}