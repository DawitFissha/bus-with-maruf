import * as React from 'react'
import {getSeatList} from '../../utils/getSeatList'
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import SeatBox from './seatBox'
interface SeatBoxesProps {
    chooseSeat:(seat:number)=>void
    noOfSeat?:number
    occupiedSeats:number[]
    selected:number[]
  }
const SeatBoxes = (props:SeatBoxesProps)=> {
    const {chooseSeat,noOfSeat,occupiedSeats,selected} = props
      return (
          <>
          {
              getSeatList(noOfSeat?noOfSeat:49).map((value:number)=>(
                  <Grid key = {value} item xs={2}>
                  <Tooltip title={`Seat - ${value}`}>
                  <SeatBox  variant='outlined'
                            sx = {{color:occupiedSeats.includes(value)?'black':'white',
                            border:'1px solid white',
                            backgroundColor:()=>{
                              if(occupiedSeats.includes(value)) return 'white'
                              if(selected?.includes(value)) return '#3a69b5'
                              return 'black'
                            },
                            pointerEvents:occupiedSeats.includes(value)?'none':'auto'
                                  }}
                            onClick={()=>chooseSeat(value)}>
                    {value}
                  </SeatBox>
                  </Tooltip>
                </Grid>
              ))
          }
          </>
      )
  }
  export default SeatBoxes