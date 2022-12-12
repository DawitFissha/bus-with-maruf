import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GeneralOrgnInfo from './general'
import RulesAndRegulations from './rules and regulations'
import SalesStation from './Station(Branch)'
import {useGetOrganizationByCodeQuery,useGetLoggedInOrganizationQuery} from '../../../store/bus_api'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Settings from './settings'
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function OrganizationTab() {

  // data from redux
  // const {data={},isLoading} = useGetOrganizationByCodeQuery('001000')
  const {data={},isLoading} = useGetLoggedInOrganizationQuery();
  const orgnUniqueId = data?._id
  const orgnBranch = data?.branch
  const x = orgnBranch?.map((ob:any)=>(
    {...ob,responsiblePerson:'persons name'}
  ))
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
console.log(x)
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Sales Station" {...a11yProps(1)} />
          <Tab label="Rules and Regulatons" {...a11yProps(2)} />
          <Tab label="System Settings" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {
          isLoading ?

          <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                // onClick={handleClose}
                >
                  <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <CircularProgress sx={{marginBottoom:'6px'}} color="primary" />
                <h4 style={{display:'block'}}>loading Organization Information ...</h4>
        
                  </Box>
              </Backdrop>:<GeneralOrgnInfo organizationInfo = {data}/>
        }
        
      </TabPanel>
      <TabPanel value={value} index={1}>
         <SalesStation branches={orgnBranch}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <RulesAndRegulations/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Settings/>
      </TabPanel>
    
    </Box>
  );
}
