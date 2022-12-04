import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CashInfo from "./cashinfo"
import CashTransaction from "./cashtransaction"
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
//
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
//
export default function MainCashierPage() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(scheduleValue)
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs indicatorColor='secondary' value={value} onChange={handleChange} aria-label="cash tabs">
          <Tab  label="Manage Cash" {...a11yProps(0)} />
          <Tab style={{marginLeft:"20px"}} label="Cash Transaction" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       <CashInfo/>
      </TabPanel>
      <TabPanel value={value} index={1}>
                <Box sx={{flexGrow:1}}>
                <CashTransaction/>
                </Box>
        
      </TabPanel>
     
    </Box>
  );
}
