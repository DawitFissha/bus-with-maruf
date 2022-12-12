import * as React from 'react' 
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import zemen from './zemen.jfif'
import Typography from '@mui/material/Typography'
const TicketPreview =  React.forwardRef((_,ref)=>{
    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} >
            
        {/* <style type="text/css" media="print">
                {
                "\
             @page {\ size:landscape;width:100%\ }\
                    "
                    }
                    </style> */}
          
            <Box sx={{display:'flex',flexDirection:'column',bgcolor: 'background.paper', borderRadius: 1,m:1,p:1,width:"700px"}}>

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
                1122-zb
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
            <Box sx={{display:'flex',alignItems:'center',ml:1,mr:1}}>
                {/* name departure date and phone number */}
                <Box sx={{display:'flex',alignItems:'flex-start'}}>
                <Box sx={{marginRight:'10px'}}>
                <Box>የ ደንበኛዉ ስም</Box>
                <Box>Passenger's Name</Box>
                
            </Box>
            <Box sx={{textDecoration:'underline'}}>
                Dawit Fissha
            </Box>
                </Box>
                <Box sx={{display:'flex',alignItems:'flex-start'}}>
                <Box>
                <Box>የ ወንበር ቁጥር</Box>
                <Box>Seat No.</Box> 
            </Box>
            <Box sx={{textDecoration:'underline',}}>
                44
            </Box>
                </Box>
            </Box>
            <Box sx={{display:'flex',alignItems:'center',marginTop:"5px",ml:1,mr:1}}>
                {/* name departure date and phone number */}
                <Box sx={{display:'flex',alignItems:'flex-start'}}>
                <Box sx={{marginRight:'10px'}}>
                
                <Box>ስልክ ቁጥር</Box>
                <Box>Phone Number</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
                0927784322
            </Box>
                </Box>
                <Box sx={{display:'flex',alignItems:'flex-start',marginLeft:'225px'}}>
                <Box sx={{marginRight:'10px'}}>
                
                <Box>የ ጉዞ ቀን</Box>
                <Box>Departure Date</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            {new Date().toDateString()}
            </Box>
                </Box>
               
          
            </Box>
            <Box sx={{display:'flex',alignItems:'center',marginTop:"5px",ml:1,mr:1}}>
                {/* name departure date and phone number */}
                <Box sx={{display:'flex',alignItems:'flex-start'}}>
                <Box sx={{marginRight:'10px'}}>
                
                <Box>የ ጉዞ ሰእት</Box>
                <Box>Departure time</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
                {new Date().toLocaleTimeString()}
            </Box>
                </Box>
                <Box sx={{display:'flex',alignItems:'flex-start',marginLeft:'230px'}}>
                <Box sx={{marginRight:'10px'}}>
                
                <Box>መነሻ ቦታ</Box>
                <Box>Departure Place</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
                Garment
            </Box>
                </Box>
             
            </Box>
            <Box sx={{display:'flex',alignItems:'center',marginTop:"5px",ml:1,mr:1}}>
                {/* name departure date and phone number */}
                <Box sx={{display:'flex',alignItems:'center'}}>
                <Box sx={{marginRight:'10px'}}>
                
                <Box>መነሻ ከተማ</Box>
                <Box>Source</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            Addis Ababba
            </Box>
                </Box>
                <Box sx={{display:'flex',alignItems:'center',marginLeft:'245px'}}>
                <Box sx={{marginRight:'10px'}}>
                <Box>መድረሻ ከተማ</Box>
                <Box>Destination</Box>
                
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            Dire Dawa
            </Box>
                </Box>
            
            </Box>
            <Box sx={{display:'flex',alignItems:'center',marginTop:"5px",ml:1,mr:1}}>
            <Box sx={{display:'flex',alignItems:'flex-start'}}>
                <Box sx={{marginRight:'10px'}}>
                <Box>የ ከፈሉት ብር በ እሃዝ</Box>
                <Box>Amount Paid in figures</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            600
            </Box>
                </Box>
                <Box sx={{display:'flex',alignItems:'flex-start'}}>
                <Box sx={{marginRight:'10px'}}>
                <Box>የ ከፈሉት ብር በ ፊደል</Box>
                <Box>Amount Paid in Words</Box>
            </Box>
            <Box sx={{textDecoration:'underline'}}>
            six Hundred Birr
            </Box>
                </Box>
            </Box>
            <Box sx={{display:'flex',alignItems:'center',marginTop:"5px",ml:1,mr:1}}>
                
                <Box sx={{display:'flex',alignItems:'flex-start'}}>
                
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
                marginLeft:'auto',
                }}>
                <Typography sx={{mr:1}} variant='h6'>
                መልካም ጉዞ ዘመን ባስን ይዞ
                </Typography>
                <Typography sx={{mr:1}} variant='h6'>
                Have A Nice Trip
                </Typography>
            </Box>
            </Box>
       
        </div>
    )
})

export default TicketPreview