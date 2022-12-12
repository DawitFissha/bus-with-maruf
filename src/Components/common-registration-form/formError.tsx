import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function DisplayFormError(props:{errMess:string}) {
    return (
        
        <Alert sx={{p:1}} severity="error">
            <AlertTitle>Error</AlertTitle>
             <strong>{props.errMess}</strong>
          </Alert>
    )
}