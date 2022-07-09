import * as React from 'react'
import Box from '@mui/material/Box'
export default function SeatInfo({total,available,plateNo}:{total?:number,available?:number,plateNo?:string}){
    return(
        <Box sx={{display:'flex',gap:'50px',marginLeft:'15px',pt:1}}>
        <h5>Total Seats - <strong>{total}</strong></h5>
         <h5>Available Seats - <strong>{available}</strong></h5>
         <h5>PlateNo - <strong>{plateNo}</strong></h5>
        </Box>
    )
}