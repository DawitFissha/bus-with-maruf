import * as React from 'react'
import DialogRenderer from '../dialog/dialogRenderer'
import Grid from '@mui/material/Grid';
import InfoBox from './seatInfoBox'
import SeatBoxes from './seatBoxes'

interface SeatPickerProps {
  numberOfSeat:number,
  open:boolean,
  handleClose:()=>void,
  handleSeatChoosing:(seat:number)=>void
  occupiedSeats:number[]
  busPlateNo:string
}

export default function SeatPicker(props:SeatPickerProps) {
  const {open,handleClose,handleSeatChoosing,numberOfSeat,occupiedSeats,busPlateNo} = props
  // console.log('rendered again')
    return (
        <DialogRenderer title = "Pick A Seat" open={open} handleClose={handleClose}>
      
            {/* <DialogContent sx = {{backgroundColor:'#F2BDF4'}} dividers> */}
          <InfoBox total={numberOfSeat} availabel={occupiedSeats?numberOfSeat-occupiedSeats.length:numberOfSeat} plateNo = {busPlateNo}/>
        <Grid sx={{m:.6,marginTop:'10px',border:'1px solid black'}} container rowSpacing={.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <SeatBoxes occupiedSeats = {occupiedSeats} noOfSeat = {numberOfSeat} chooseSeat = {handleSeatChoosing}/>
        </Grid>
        </DialogRenderer>
    );
  }






