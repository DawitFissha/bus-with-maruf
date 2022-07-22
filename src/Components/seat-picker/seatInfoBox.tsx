import * as React from 'react'
import SeatInfo from './seatInfo'
import SeatStausBox from './seatStatusBox'
import Box from '@mui/material/Box'
interface InfoBoxProps {
    total:number
    availabel:number
    plateNo:string
  }
export default function InfoBox(props:InfoBoxProps) {
    const {total,availabel,plateNo} = props
    return (
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            width:'100%',
            border:'1px solid black',
            color:'white',
            m:.6
        }}
        >
         <SeatInfo total={total} available={availabel} plateNo={plateNo}/>
        
            <div
            style={{display:'flex',columnGap:'30px',marginLeft:'15px'}}
            >
                <SeatStausBox status="Occupied"/>
                <SeatStausBox status="Free"/> 
                <SeatStausBox status="Selected"/>           
            </div>
        </Box>
    )
    }