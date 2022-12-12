import * as React from 'react'
import DialogRenderer from '../../../../Components/dialog/dialogRenderer'
import AddBoxIcon from '@mui/icons-material/AddBox';
import {AddNewStation} from './addStationForm'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip'
export function StationHeader() {
    const [openStationDialog,setStationDialogOpen] = React.useState(false)
    const handleStationDialogOpen = ()=>{
      setStationDialogOpen(true)
    }
    const closeStationDialog = ()=>{
      setStationDialogOpen(false)
    }
    return (
      <div
      style ={{
        // border:'1px solid black',
        marginBottom:'5px',
        lineHeight:0,
      }}
      >
        {/* <Button 
        sx={{borderRadius:0}}
        onClick={handleStationDialogOpen}
        startIcon={<AddBoxIcon/>}>
          New
        </Button> */}
        <h4>Sales Stations</h4>
        <Stack direction={'row'} spacing={2} sx={{borderBottom:'1px solid black'}}>
            <Tooltip title='add new station'>
            <IconButton
              onClick={handleStationDialogOpen}
            >
                <AddBoxIcon color='primary' fontSize='large'/>
            </IconButton>
            </Tooltip>
            {/* <Divider orie/> */}
           <Tooltip title="Edit station">
           <IconButton>
                <EditIcon color='primary' fontSize='large'/>
            </IconButton>
           </Tooltip>
           <Tooltip title='Delete Station'>
            <IconButton>
              <DeleteIcon color='error' fontSize='large'/>
            </IconButton>
           </Tooltip>
        </Stack>

        <DialogRenderer open = {openStationDialog} handleClose = {closeStationDialog} title="Add New Station">
            <AddNewStation closeOnSave={closeStationDialog}/>
          </DialogRenderer>
      </div>
    )
  }