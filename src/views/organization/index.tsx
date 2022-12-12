import * as React  from 'react'
import OrganizationHeader from './header'
import OrganizationTab from './tabs/orgnTab'
import Box from '@mui/material/Box'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Tooltip,IconButton} from '@mui/material'

export default function Organization(){
  const [showLogo,setShowLogo] = React.useState(true)
  const toogleVisiblityOfLogo = ()=>{
      setShowLogo(!showLogo)
  }
  return (
    <div style ={{
      width:"800px",
      // marginTop:'5px',
      marginLeft:'auto',
      marginRight:'auto',
      height:'auto',
     background:'#FFFF',
     marginBottom:'5px',
    }}>
      
      <OrganizationHeader showLogo={showLogo}/>
      <Box sx={{display:"flex"}}>
      <OrganizationTab/>  
      <Tooltip title = {
                        showLogo?'Hide logo':'Show logo'
                    }>
              <IconButton 
                        sx={{height:"50px",width:'50px'}}
                        onClick={toogleVisiblityOfLogo}
                        >
                        {showLogo?
                        <VisibilityOffIcon color='primary' fontSize='large'/>
                        :
                        <VisibilityIcon color='primary' fontSize='large'/>
                    }
                        </IconButton>
      </Tooltip>
      </Box>
      
    </div>
  )
}