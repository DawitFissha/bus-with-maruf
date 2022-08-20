import * as React from 'react'
import SeatInfo from './seatInfo'
import SeatStausBox from './seatStatusBox'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
interface InfoBoxProps {
    total:number
    availabel:number
    plateNo:string
    completeSeatChoosing:()=>void
  }
export default function InfoBox(props:InfoBoxProps) {
    const {total,availabel,plateNo,completeSeatChoosing} = props
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
            <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <div
            style={{display:'flex',columnGap:'30px',marginLeft:'15px',flexGrow:1}}
            >
                <SeatStausBox status="Occupied"/>
                <SeatStausBox status="Free"/> 
                <SeatStausBox status="Selected"/>        
            </div>
            <Button 
                variant='outlined'
                sx={{
                    maxWidth:"100px",
                    height:'35px',
                    mr:1,
                    
                }}
                onClick = {()=>completeSeatChoosing()}
                >Done</Button> 
            </Box>
            <Box sx={{ml:2}}>
            <Typography sx={{color:'orange'}}>only maximum of two seats can be selected </Typography>
            </Box>
        </Box>
    )
    }