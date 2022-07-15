import * as React from 'react'
import Box from '@mui/material/Box'
export default function SeatStausBox({status}:{status:"Occupied"|"Free"|"Selected"}) {
    return (
        <Box sx={{display:'flex',gap:'6px',pt:1}}>
        <Box>
        <Box sx = {{
            border:'1px solid black',
            width:'30px',height:'30px',
            backgroundColor:()=>{
                if(status==="Occupied") return 'white'
                if(status==="Free") return 'black'
                return "#3a69b5"
            }
            
            }}/>
        </Box>
        <Box>
        <p style={{color:'black'}}>{status}</p>
        </Box>

        </Box>
    )
}