import * as React from 'react'
import Box from '@mui/material/Box';
import {RulesAndRegulationsList} from './listOfRules'
import { AddNewRule } from './addNewRule';
const RulesAndRegulations = ()=>{
    return (
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            
        
        }}>
            <RulesAndRegulationsList/>
            <AddNewRule/>

        </Box>
    )
}
export default RulesAndRegulations