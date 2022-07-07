import * as React from 'react'
import Box from '@mui/material/Box';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
export function ScheduleItem(){
    return(
<>
    
       <Box sx={{display:'flex'}}>
       <Box sx={{display:'flex',alignItems:'center'}}>
            <DirectionsBusIcon color="primary"/>
            <h4 style={{fontSize:"medium",marginLeft:"4px"}}>{`Schedule one`}</h4>
        </Box>
        <p>hello</p>
       </Box>
        
     
    
</>
    )
}