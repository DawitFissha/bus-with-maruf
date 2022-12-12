import * as React from 'react'
import Box from '@mui/material/Box';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {IconButton, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
type ruleType = {
    id:string
    rule:string
}
const rules = [
    {id:'0',rule:"Passenger Should arrive at the departure place on time"},
    {id:'1',rule:"Passengers should be physically present in a ticket station to make a refund"},
    {id:'2',rule:"Money is not refunded if passengers request a refund 3 days  after the bus is departed"},
    {id:'3',rule:"After a refund half of the money paid is returned if the passenger missed the bus by his own fault"},
]
export const RulesAndRegulationsList = ()=>{
    return (
       
        <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper'}}>
            
                {
                    rules.map((rule:ruleType)=>(
                      
                            <Grid container columnSpacing={2}>
                                <Grid item md={10}>
                                <Typography sx={{fontSize:'18px'}} variant="h6" gutterBottom>
                                    {rule.rule}
                                </Typography>
                                </Grid>
                                <Grid item md={2}>
                                    <IconButton>
                                    <RemoveCircleIcon color='primary'/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                    ))
                }
            
            </Box>
            
    )
}