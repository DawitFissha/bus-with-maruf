import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Divider } from '@mui/material';

const SettingDesriptions = (props:{desc:string})=>{
    return (
      <p
                  style={{
                    fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
                    color: 'rgb(111, 126, 140)',
                    fontWeight: 700,
                    fontSize: '0.6875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08rem',
                  }}
                  >
                    {props.desc}
                  </p>
    )
}
const ThemeToogleButtons = ()=>{
  const [mode,setMode] = React.useState<'light'|'dark'>('light')

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'light'|'dark',
  ) => {
    setMode(newMode);
  };
  return (
    <ToggleButtonGroup
    value={mode}
    exclusive
    onChange={handleModeChange}
    >
    <ToggleButton sx={
                    {textTransform:'none',
                    borderRadius:'10px',
                    height:48,
                  }
                  }
                  value="light" >
      <LightModeIcon color='primary' sx={{mr:1}}/> 
      <p>
        Light
      </p>
    </ToggleButton>
    <ToggleButton sx={{textTransform:'none',borderRadius:'10px',height:48}} value="dark">
      <DarkModeIcon color='primary' sx={{mr:1}}/>
      <p>
        Dark
      </p>
    </ToggleButton>
  </ToggleButtonGroup>
  )
}

const Languages = ()=>{
  return (
    <>
    
    </>
  )
}

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open:boolean)=>{
    setState(open);
   
    };

  return (
    <div>
        <React.Fragment >
          <Button
          fullWidth={false}
          onClick={
            ()=>toggleDrawer(true)
          }>setting</Button>
          <Drawer
            anchor={'right'}
            open={state}
            onClose={()=>toggleDrawer(false)}
          >
            {/* {list(anchor)} */}
        <div>
        <Box id="user-setting-header" sx={{
    
                      m:1,
                      width:'300px',
                      display:'flex',
                      alignItems:'center'}}>
              <Box sx={{flexGrow:1,}}>
              <p
              style={{
                
                margin:'0px',
                fontSize: '1rem',
                lineHeight: 1.5,
                letterSpacing: '0px',
                fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
                scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
                fontWeight:'bold',
                }}
              >
                Settings
                </p>
              </Box>
             <Box>
             <IconButton
            aria-label="close"
            onClick={()=>toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
             </Box>
            </Box>
            <Divider/>

            <Box id="user-theme-preference" sx={{display:'flex',flexDirection:'column',m:1}}>
                <Box>
                 <SettingDesriptions desc="Mode"/>
                </Box>
                <Box>
                  <ThemeToogleButtons/>
                </Box>
            </Box>
            <Divider/>
            <Box id="user-language-preference" sx={{display:'flex',flexDirection:'column',m:1}}>
                  <Box>
                  <SettingDesriptions desc="Language"/>
                  </Box>
            </Box>
        </div>
          </Drawer>
        </React.Fragment>
      
    </div>
  );
}
