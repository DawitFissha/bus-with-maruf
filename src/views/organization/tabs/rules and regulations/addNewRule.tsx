import * as React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
export const AddNewRule = ()=> {
    const [newRule,setNewRule] = React.useState('')
    const handleNewRuleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setNewRule(e.target.value)
    }
    const handleAddNewRule = ()=>{
        console.log('rule added')
    }
    return (
        <Box
        sx={{
            display:'flex',
            width:460,
            alignItems:'center',
            gap:3,
            mt:1,
        }}
        >
            <TextField
            name='newRule'
            id="newRule"
            label="New Rule"
            value = {newRule}
            onChange={handleNewRuleChange}
            />
            <Button
            sx={{fontSize:'14px',height:'30px',borderRadius:0,width:'100px'}}
            onClick={handleAddNewRule}
            >
                Add
            </Button>
        </Box>
    )
}