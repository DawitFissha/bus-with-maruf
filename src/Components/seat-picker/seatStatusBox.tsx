import * as React from 'react'
import Box from '@mui/material/Box'
export default function SeatStausBox({status}:{status:"Occupied"|"Free"}) {
    return (
        <Box sx={{display:'flex',gap:'6px',pt:1}}>
        <Box>
        <div style={{border:'1px solid black',width:'30px',height:'30px',backgroundColor:status==="Occupied"?'white':'black'}}/>
        </Box>
        <Box>
        <p style={{color:'black'}}>{status}</p>
        </Box>

        </Box>
    )
}