import React,{useState,useEffect} from 'react';
import { useFormik } from 'formik';
import UserRegistration from '../user/userform'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {addBusses} from './busSlice'
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {RegistrationHeader} from '../../Components/common-registration-form/registrationHeader'
import {SavingProgress} from '../../Components/common-registration-form/savingProgress'
import {SaveSuccessfull} from '../../Components/common-registration-form/saveSuccess'
import {Alert, AlertTitle, InputAdornment, ListItemText } from '@mui/material';
import {AddButton} from '../../Components/addbutton'
import Backdrop from '@mui/material/Backdrop';
import {FormWrapper} from '../../Components/common-registration-form/formWrapper'
import DescriptionIcon from '@mui/icons-material/Description';
import AbcIcon from '@mui/icons-material/Abc';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import NumbersIcon from '@mui/icons-material/Numbers';
import {fetchDrivers} from '../user/driverSlice'
import {fetchRedats} from '../user/redatSlice'
import CircularProgress from '@mui/material/CircularProgress';
import DialogRenderer from '../../Components/dialog/dialogRenderer'
import useError from '../../utils/hooks/useError'
import RegistrationParent from '../../Components/common-registration-form/registrationParent'
import FormHelperText from '@mui/material/FormHelperText'
const RoleData = {
    DRIVER:'driver',
    REDAT:'redat',
}

const validate = (values:any) => {
    const errors:any = {}
    if (!values.serviceYear) {
      errors.serviceYear="Required"
    }
    if (!values.sideNo) {
      errors.sideNo="Required"
    } 
     if(!values.plateNo) {
      errors.plateNo = "Plate Number is Required"
    }
     if(!values.NoOfSeat){
      errors.NoOfSeat = "Nuumber of Seat is Required"
    }
    else if(values.NoOfSeat<=0){
      errors.NoOfSeat = "This value can not be 0 or negative"
    }
    return errors;
  };
export default function BusRegistration (
  {
    
    providedsideNo,
    providedPlateNumber,
    providedRedat,
    providedDriver,
    providedNumberOfSeat,
    providedState,
    
  }:{
    providedId?:string,
    providedsideNo?:string,
    providedPlateNumber?:string,
    providedRedat?:string,
    providedDriver?:string,
    providedNumberOfSeat?:number,
    providedState?:string
    CloseDialog?:()=>void
  }
){
const [redatButton,setRedatButton] = useState(false)
const [driverButton,setDriverButton]  =useState(false)
const [opendDialog,setOpenDialog] = useState(false)
const handleRedatDialogOpen = () => {
  setOpenDialog(true)
  setRedatButton(true)
}
const handleDriverDialogOpen = () => {
  setOpenDialog(true)
  setDriverButton(true)
}
const DialogClose = () => {
  setOpenDialog(false)
  setDriverButton(false)
  setRedatButton(false)
}
const isEdit = Boolean(providedsideNo)||Boolean(providedNumberOfSeat)||Boolean(providedPlateNumber)||Boolean(providedRedat)||Boolean(providedDriver)

const [open,setOpen] = useState(false)
const [loading, setLoading] = React.useState(false);
const [error,errorMessage,setErrorOccured,setErrorMessage] = useError()
const driverStatus = useAppSelector(state=>state.drivers.status)
const redatStatus = useAppSelector(state=>state.redats.status)
const initialDrivers = useAppSelector(state=>state.drivers.drivers)
const initialRedats =  useAppSelector(state=>state.redats.redats)
// for the default select value  will be checked later
const providedDriverFirstName = useAppSelector(state=>state.users.users.find(driver=>driver.id===providedDriver))?.firstName
const providedDRedatFirstName = useAppSelector(state=>state.users.users.find(redat=>redat.id===providedRedat))?.firstName
const providedBusStatesideNo = useAppSelector(state=>state.busStates.find(bstate=>bstate.id===providedState))?.description
const [driver,setDriver] = useState(providedDriver?providedDriverFirstName:'')
const [redat,setRedat] = useState(providedRedat?providedDRedatFirstName:'')
const [Bstate,setBState] = useState(providedState?providedBusStatesideNo:'')
const [driverError,driverErrorMessage,setDriverErrorOccured,setDriverErrorMessage] = useError()
const [redatError,redatErrorMessage,setRedatErrorOccured,setRedatErrorMessage] = useError()
 const handleDriverChange = (e:SelectChangeEvent)=>{
    setDriver(e.target.value)
    setDriverErrorOccured(false)
    }
 const handleRedatChange = (e:SelectChangeEvent)=>{
    setRedat(e.target.value)
    setRedatErrorOccured(false)
 }
 const handleBusStateChange = (e:SelectChangeEvent)=>{
  setBState(e.target.value)
}


const dispatch = useAppDispatch();
const busState  = useAppSelector(state=>state.busStates)
// const canSave = Boolean(redat)&&Boolean(driver)
const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};

useEffect(()=>{
    document.title+=` - Bus Registration`
    if(driverStatus === 'idle'){
      dispatch(fetchDrivers())
    }
    if(redatStatus === 'idle'){
      dispatch(fetchRedats())
    }
  },[redatStatus,driverStatus,dispatch])


  const formik = useFormik({
    initialValues: {
      serviceYear:0,
      sideNo: providedsideNo?providedsideNo:"",
      plateNo:providedPlateNumber?providedPlateNumber:"",
      NoOfSeat:providedNumberOfSeat?providedNumberOfSeat:0,
    },
    validate,
    onSubmit: async (values,{resetForm}) => {
      if(driver === '') {
          setDriverErrorOccured(true)
          setDriverErrorMessage('Please Select a driver')
      }
      else if(redat === '') {
        setRedatErrorOccured(true)
        setRedatErrorMessage('Please Select a redat')

      }

      else {
          if(!loading){
            
            setLoading(true)
            
              
            try {
              await dispatch(addBusses(
                {
                  bussideno:values.sideNo,
                busplateno:values.plateNo,
                bus_state:"Active",
                redatid:redat,
                driverid:driver,

                totalsit:values.NoOfSeat,
                serviceyear:values.serviceYear,
                }
              )).unwrap()

              

              resetForm({values:{
                sideNo: '',
                plateNo: '',
                NoOfSeat:0,
                serviceYear:0,
                
              }})
             setDriver('')
             setRedat('')
            setOpen(true)
            setErrorOccured(false)
            if(DialogClose){
                DialogClose()
              }
          
            }
            catch (err:any) {
              
              const resMessage =
              (err.response &&
                err.response.data &&
                err.response.data.message) ||
                err.message ||
                err.toString();
              setErrorOccured(true)
               setErrorMessage(resMessage) 
            }
            finally {
              setLoading(false)
            }
          }
         
    }
    },
  });

  return (
  redatStatus === 'loading' || driverStatus === 'loading' ?

  <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={redatStatus === 'loading' || driverStatus === 'loading' }
        // onClick={handleClose}
        >
          <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          <CircularProgress sx={{marginBottoom:'6px'}} color="primary" />
        <h4 style={{display:'block'}}>loading for Drivers and Redats ...</h4>

          </Box>
      </Backdrop>:
<RegistrationParent>
  <SavingProgress loading={loading}/>
      <Box sx={{
         display:'flex',
         flexDirection:'column',
         ml:isEdit?0:1,
         mr:isEdit?0:1,
     }}>
         <FormWrapper>
         <RegistrationHeader description = {isEdit?'Edit Bus Information':'Register New Busses'} />
         </FormWrapper>
    <form onSubmit={formik.handleSubmit}>
    <FormWrapper>
          <TextField
       
      type="number"
      id="serviceYear"
      name="serviceYear"
      label="Service Year"
      value={formik.values.serviceYear}
      onChange={formik.handleChange}
      InputProps = {{
        startAdornment:(
        <InputAdornment position="start">
            <DescriptionIcon sx={{fontSize:"35px"}} color="primary"/>
        </InputAdornment>
        )
    }}
      error={formik.touched.sideNo && Boolean(formik.errors.sideNo)}
      helperText={formik.touched.sideNo && formik.errors.sideNo}
    />
          </FormWrapper>
          <FormWrapper>
          <TextField
       
      id="plateNo"
      name="plateNo"
      label="Plate Number"
      
      value={formik.values.plateNo}
      onChange={formik.handleChange}
      InputProps = {{
        startAdornment:(
        <InputAdornment position="start">
            <AbcIcon sx={{fontSize:"35px"}} color="primary"/>
        </InputAdornment>
        )
    }}
      error={formik.touched.plateNo && Boolean(formik.errors.plateNo)}
      helperText={formik.touched.plateNo && formik.errors.plateNo}
    />
          </FormWrapper>
          <FormWrapper>
          <TextField
       
      id="sideNo"
      name="sideNo"
      label="sideNo"
      value={formik.values.sideNo}
      onChange={formik.handleChange}
      InputProps = {{
        startAdornment:(
        <InputAdornment position="start">
            <DescriptionIcon sx={{fontSize:"35px"}} color="primary"/>
        </InputAdornment>
        )
    }}
      error={formik.touched.sideNo && Boolean(formik.errors.sideNo)}
      helperText={formik.touched.sideNo && formik.errors.sideNo}
    />
          </FormWrapper>

          <FormWrapper>
          <FormControl sx={{width:'100%' }}>
          <InputLabel id="driver-select-label">Drivers</InputLabel>
      <Select
        labelId="driver-select-label"
        id="driver-select-helper"
        name="driver"
        value={driver}
        label="driver"
        onChange={handleDriverChange}
        startAdornment={<AirlineSeatReclineNormalIcon sx={{fontSize:"35px"}} color="primary"/>}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
     {  
        initialDrivers?
        initialDrivers.map((driver:any)=>(
          <MenuItem divider = {true} key = {driver._id} value={driver._id}>
              <ListItemText primary = {`${driver.firstName} ${driver.lastName}`}/>
          </MenuItem>
        ))
        :null
        }
        <AddButton description = "Driver" handleClick = {handleDriverDialogOpen}/>
      </Select>
      {driverError && (<FormHelperText sx={{color:'red'}}>{driverErrorMessage}</FormHelperText>)}
      </FormControl>
        </FormWrapper>
        <FormWrapper>
          <FormControl sx={{width: "100%" }}>
          <InputLabel id="redat-select-helper-label">Redats</InputLabel>
      <Select
        labelId="redat-select-helper-label"
        id="redat-select"
        name="redat"
        label="redat"
        value = {redat}
        onChange={handleRedatChange}
        startAdornment={<EmojiPeopleIcon sx={{fontSize:"35px"}} color="primary"/>}
      >
        <MenuItem value="">
        <em>None</em>
        </MenuItem>
        {
        initialRedats?
        initialRedats.map((redat:any)=>(
          <MenuItem divider = {true} key = {redat._id} value={redat._id}>
            <ListItemText primary = {`${redat.firstName} ${redat.lastName}`}/>
          </MenuItem>
        ))
        :null
        }
        <AddButton description = "Redat" handleClick = {handleRedatDialogOpen}/>
      </Select>
      {redatError && (<FormHelperText sx={{color:'red'}}>{redatErrorMessage}</FormHelperText>)}
      </FormControl>
        </FormWrapper>
          <FormWrapper>
          <TextField  
           
      id="NoOfSeat"
      name="NoOfSeat"
      label="Number of Seat"
      type='number'
      value={formik.values.NoOfSeat}
      onChange={formik.handleChange}
      InputProps = {{
        startAdornment:(
        <InputAdornment position="start">
            <NumbersIcon sx={{fontSize:"35px"}} color="primary"/>
        </InputAdornment>
        )
    }}
      
      error={formik.touched.NoOfSeat && Boolean(formik.errors.NoOfSeat)}
      helperText={formik.touched.NoOfSeat && formik.errors.NoOfSeat}
    />
          </FormWrapper>
      
          {
            isEdit&&(
              <FormWrapper>
          <FormControl sx={{width: "100%" }}>
          <InputLabel id="state-select-label">State</InputLabel>
      <Select
        labelId="state-select-label"
        id="state-select-helper"
        name="state"
        label="state"
        value = {Bstate}
        onChange={handleBusStateChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
     {
        busState.map((busstate)=>(
          <MenuItem divider = {true} key = {busstate.id} value={busstate.description}>
              <ListItemText primary = {busstate.description}/>
          </MenuItem>
        ))
        }
      </Select>
      
     </FormControl>
        </FormWrapper>
            )
          }
          <FormWrapper>
          <Button  
          // onClick = {()=>(alert('bus'))}
           
          type="submit"
          disabled = {loading}
          color="primary" variant="contained" >
          {isEdit?'Update':'Save'}
      </Button>
          </FormWrapper>
          <SaveSuccessfull open={open} handleClose={handleClose} message = {isEdit? 'Bus Information Updated Successfully':'Bus Successfully Registered'} />
          <DialogRenderer open = {opendDialog} handleClose = {DialogClose} title="Register Users">
            
              {driverButton&&<UserRegistration providedRole = {RoleData.DRIVER} DialogClose = {DialogClose} />}
              {redatButton&&<UserRegistration providedRole = {RoleData.REDAT} DialogClose = {DialogClose} />}
            
          </DialogRenderer>
          
    </form>
    {
          error && (
            <Alert sx={{p:1}} severity="error">
            <AlertTitle>Error</AlertTitle>
             <strong>{errorMessage}</strong>
          </Alert>
          )
        }
    </Box>

    </RegistrationParent>
  );
};


