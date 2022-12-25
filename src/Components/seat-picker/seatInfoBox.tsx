import * as React from 'react'
import SeatStausBox from './seatStatusBox'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import GlobalStyles from '@mui/material/GlobalStyles';
import TaskIcon from '@mui/icons-material/Task';
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
interface InfoBoxProps {
    total:number
    availabel:number
    plateNo:string
    completeSeatChoosing:()=>void
  }

const H5 = (props:{children:React.ReactNode})=>{
    return(
        <>
        <GlobalStyles styles={{ h5: { 

fontFamily:" -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
fontSize: '1rem',
lineHeight: 1.5,
letterSpacing: '0.1px',
color: "rgb(33, 33, 33)",
fontWeight: 700,
// scroll-margin-top: calc(var(--MuiDocs-header-height) + 32px);

        } }} />
      <h5>
        {props.children}
      </h5>
        </>
    )
}
export default function InfoBox(props:InfoBoxProps) {
    const {total,availabel,plateNo,completeSeatChoosing} = props
    return (
        <>
        <Grid
        sx={{ml:1}}
        container
        >
            <Grid item md={4} xs={12}>
            <H5>Total Seats - <strong>{total}</strong></H5>
            <SeatStausBox status="Occupied"/>

            </Grid>
            <Grid item md={4} xs={12}>
            <H5>Available Seats - <strong>{availabel}</strong></H5>
            <SeatStausBox status="Free"/> 
            </Grid>
            <Grid item md={4} xs={12}>
            <H5>PlateNo - <strong>{plateNo}</strong></H5>
            <SeatStausBox status="Selected"/>       
            </Grid>
        </Grid>
        <Box sx={{display:'flex',alignItems:'end',mb:1,ml:1}}>
            <Box sx={{flexGrow:1}}>
            <Typography sx={{color:'orange'}}>Only maximum of two seats can be selected </Typography>
            </Box>
               <Tooltip title="Done">
               <IconButton 
                onClick = {()=>completeSeatChoosing()}
                >
                    <TaskIcon color='primary' fontSize='large'/>
                </IconButton>
                
               </Tooltip>
            
                </Box>
        </>
    )
    }