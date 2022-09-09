import * as React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import zemen from './zemen.jfif'
import Typography from '@mui/material/Typography'
import QRCode from "react-qr-code";
import PriceChange from '@mui/icons-material/PriceChange';
interface TicketProps { 
    ticketNo:string
    passengerFullName:string
    seatNo:number
    sourceCity:string
    price:number
    departureDate:string
    departureTime:string
    destinationCity:string
    phoneNumber:string
    departurePlace:string
}
const TicketPreview = React.forwardRef((props:TicketProps,ref)=>{
    const {
        ticketNo ,
        passengerFullName ,
        seatNo ,
        sourceCity,
        price ,
        departureDate,
        departureTime,
        destinationCity ,
        phoneNumber ,
        departurePlace ,
    } = props
    return (
        <div ref={ref as React.RefObject<HTMLDivElement>}>
            <style>
                {
                     `
                     @page {
                       size: 220.5mm 120mm;
                       margin-top:0;
                     }
                   @media print {
                     html,body {
                       font-size:14px;
                     }
                   }
                   `
                }
            </style>
            <Box sx={{display:'flex',flexDirection:'column'}}>
            <Box sx={{display:'flex',flexDirection:'column',mb:1}}>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <Box>
                    <Avatar 
                    alt="company logo" src={zemen}
                    sx={{ width: 76, height: 76 }}
                    />
                </Box>
                <Box>
                    <Typography variant="h6">Zemen Bus Transportaion Service PLC</Typography>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Box sx={{display:'flex',alignItems:'center'}}>
                    <Box sx={{marginRight:'10px'}}>Ticket issue date. </Box>
                    <Box sx={{
                        textDecoration:'underline' 
                        }}>
                        {new Date().toDateString()}
                    </Box>
                    </Box>
                
        <Box>
            {/* for ticket number */}
        </Box>
        <Box sx={{display:'flex',alignItems:"center",marginTop:'5px'}}>
            <Box sx={{marginRight:'10px'}}>
                Ticket No.
            </Box>
            <Box sx={{textDecoration:'underline'}}>
                {ticketNo}
            </Box>
        </Box>
                </Box>
            </Box>
            <Box sx={{
                marginLeft:'auto',
                marginRight:'auto',
            }}>
                <Typography sx={{textDecoration:'underline'}} variant='h6'>Passenger's Ticket</Typography>
            </Box>
            </Box>
            <Grid container spacing={2}>
                
                <Grid item xs={4}>
                <Box sx={{display:'flex',flexDirection:'column'}}>
                <Box sx={{display:'flex',alignItems:'flex-start'}}>
                <Box sx={{marginRight:'10px'}}>
                <Box>የ ደንበኛዉ ስም</Box>
                <Box>Passenger's Name</Box>
                
            </Box>
            <Box sx={{textDecoration:'underline'}}>
                {passengerFullName}
            </Box>
                </Box>
                <Box sx={{display:'flex',alignItems:'flex-start',gap:"37px"}}>
                <Box sx={{marginRight:'10px'}}>
                
                <Box>የ ወንበር ቁጥር</Box>
                <Box>Seat Number</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            {seatNo}
            </Box>
                </Box>
                <Box sx={{display:'flex',alignItems:'center',gap:'40px'}}>
                <Box sx={{marginRight:'10px'}}>
                
                <Box>መነሻ ከተማ</Box>
                <Box>Source City</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            {sourceCity}
            </Box>
                </Box>
                </Box>
                <Box sx={{display:'flex',alignItems:'flex-start',mt:1}}>
                <Box sx={{marginRight:'10px'}}>
                <Box>የ ከፈሉት ብር በ እሃዝ</Box>
                <Box>Amount Paid in figures</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            {price}
            </Box>
                </Box>
                
                </Grid>
                <Grid item xs={4}>
                <Box sx={{display:'flex',flexDirection:'column'}}>
                <Box sx={{display:'flex',alignItems:'flex-start',gap:'35px'}}>
                <Box sx={{marginRight:'10px'}}>
                <Box>የ ጉዞ ቀን</Box>
                <Box>Departure Date</Box>
                
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            {departureDate}
            </Box>
                </Box>
                <Box sx={{display:'flex',alignItems:'flex-start',gap:"38px"}}>
                <Box sx={{marginRight:'10px'}}>
                
                <Box>የ ጉዞ ሰእት</Box>
                <Box>Departure Time</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            {departureTime}
            </Box>
                </Box>
                <Box sx={{display:'flex',alignItems:'center',gap:'65px'}}>
                <Box sx={{marginRight:'10px'}}>
                
                <Box>መድረሻ ከተማ</Box>
                <Box>Destination</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            {destinationCity}
            </Box>
                </Box>
                </Box>
                <Box sx={{display:'flex',alignItems:'flex-start',mt:1,gap:'10px'}}>
                <Box sx={{marginRight:'10px'}}>
                <Box>የ ከፈሉት ብር በ ፊደል</Box>
                <Box>Amount Paid in Words</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            six Hundred Birr
            </Box>
                </Box>
                </Grid>
                <Grid item xs={4}>
                <Box sx={{display:'flex',flexDirection:'column'}}>
                <Box sx={{display:'flex',alignItems:'flex-start',gap:'20px'}}>
                <Box sx={{marginRight:'10px'}}>
                <Box>ስልክ ቁጥር</Box>
                <Box>Phone Number</Box>     
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            {phoneNumber}
            </Box>
                </Box>
                <Box sx={{display:'flex',alignItems:'flex-start',gap:'20px'}}>
                <Box sx={{marginRight:'10px'}}>
                
                <Box>መነሻ ቦታ</Box>
                <Box>Departure Place</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            {departurePlace}
            </Box>
                </Box>
                </Box>
                </Grid>
            </Grid>
            <Box sx={{display:'flex',alignItems:'flex-start',mt:1}}>
                
                <Box>
                   <Box>
                   የ ገንዘብ ተቀባይ ስም እና ፊርማ
                   </Box>
                <Box>
                   Reciver's Name and Signature
               </Box>
                </Box>
               <Box sx={{marginLeft:'30px',marginTop:'7px'}}>
                       <hr  style={{
               color: 'red',
               backgroundColor: '#000000',
               height: .4,
               borderColor : '#000000',
               width:'300px'
           }}/>
   
   
               </Box>
                   </Box>
                   <Box sx={{
                marginLeft:'auto',
                marginRight:'auto',
            }}>
                <Typography sx={{}} variant='h6'>
                ማሳሰብያዉን በጀርባ ገጽ ይመልከቱ
                </Typography>
            </Box>
            <Box sx={{
                display:'flex',
                marginLeft:'auto',
                }}>
                    <Box>
                    <Typography sx={{mr:1}} variant='h6'>
                መልካም ጉዞ ዘመን ባስን ይዞ
                </Typography>
                <Typography sx={{mr:1}} variant='h6'>
                Have A Nice Trip
                </Typography>
                    </Box>
                <Box sx={{ml:2,p:1}}>
                <QRCode value='hello' size = {64}/>
                </Box>
            </Box>
            </Box>
        </div>
    )
})
export default TicketPreview