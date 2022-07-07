import React from 'react'
import Typography from '@mui/material/Typography';

export function RegistrationHeader({description}:{description:string}){
return(
    // <h2 style={{textAlign:"center"}}>{description}</h2>
    <Typography sx = {{textAlign:'center'}} variant="h4" gutterBottom component="div">
    {description}
  </Typography>
)
}