import * as React from 'react'
import {getSeatList} from '../../utils/getSeatList'
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import SeatBox from './seatBox'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
interface SeatBoxesProps {
    chooseSeat:(seat:number)=>void
    noOfSeat?:number
    occupiedSeats:number[]
    selected:number[]
    disableSelection:boolean
  }
const SeatBoxes = (props:SeatBoxesProps)=> {
    const {chooseSeat,noOfSeat,occupiedSeats,selected,disableSelection} = props
      return (
          <>
          {
              getSeatList(noOfSeat?noOfSeat:49).map((value:number)=>(
                  <Grid key = {value} item xs={2}>
                  <Tooltip title={`Seat - ${value}`}>
                  <SeatBox  variant='outlined'
                            sx = {{color:occupiedSeats.includes(value)?'black':'white',
                            textAlign:selected?.includes(value)?'left':'center',
                            border:'1px solid white', position:'relative',
                            backgroundColor:()=>{
                              if(occupiedSeats.includes(value)) return 'white'
                              if(selected?.includes(value)) return '#3a69b5'
                              return 'black'
                            },
                            pointerEvents:()=>{
                              if(!disableSelection){
                                if(selected.includes(value)) return 'auto'
                                else return 'none'
                              }
                              if(occupiedSeats.includes(value)) return 'none'
                              return 'auto'
                            }
                                  }}
                            onClick={()=>chooseSeat(value)}>
                    {value}
                    {
                    selected?.includes(value) &&
                    (
                      <div style={{
                        position:'absolute',
                        top:'0px',
                        right:'0px',
                      }}>
                        <CheckCircleOutlineIcon  fontSize='small'/>
                      </div>
                    )}
                  </SeatBox>
                  </Tooltip>
                </Grid>
              ))
          }
          </>
      )
  }
  export default SeatBoxes