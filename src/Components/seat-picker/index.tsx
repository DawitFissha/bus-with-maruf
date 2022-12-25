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
  completeSeatChoosing:()=>void
  occupiedSeats:number[]
  busPlateNo:string
  selectedSeat:number[],
  canSelectSeat:boolean
}

export default function SeatPicker(props:SeatPickerProps) {
  const {open,canSelectSeat,handleClose,handleSeatChoosing,numberOfSeat,occupiedSeats,busPlateNo,selectedSeat,completeSeatChoosing} = props
  // console.log('rendered again')
    return (
        <DialogRenderer title = "Pick A Seat" open={open} handleClose={handleClose}>
      
            {/* <DialogContent sx = {{backgroundColor:'#F2BDF4'}} dividers> */}
          <InfoBox completeSeatChoosing = {completeSeatChoosing} total={numberOfSeat} availabel={occupiedSeats?numberOfSeat-occupiedSeats.length:numberOfSeat} plateNo = {busPlateNo}/>
        <Grid container sx={{border:'1px solid black',backgroundColor:'black'}} rowSpacing={.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <SeatBoxes disableSelection = {canSelectSeat} selected = {selectedSeat} occupiedSeats = {occupiedSeats} noOfSeat = {numberOfSeat} chooseSeat = {handleSeatChoosing}/>
        </Grid>
        </DialogRenderer>
    );
  }






