import * as React from 'react'
type errorState = {
    error:boolean,
    errorMessage:string
}
type errorHandlers = {
    setErrorOccured:()=>void,
    setErrorMessage :(message:string)=>void

}
export default function useError():[errorState,errorHandlers]{
    const [error,setError] = React.useState(false)
    const [errorMessage,setErrorMessage] = React.useState('')
    const handleErrorOccured = () => {setError(true)}
    const handleErrorMessage = (message:string) => {setErrorMessage(message)}
    return [
        {error,errorMessage},
        
        {
            setErrorOccured : handleErrorOccured,
            setErrorMessage : handleErrorMessage,
        },
    ];
}