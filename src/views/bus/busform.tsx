import React,{useState} from 'react';
import { useFormik } from 'formik';
import UserRegistration from '../user/userform';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
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
import CircularProgress from '@mui/material/CircularProgress';
import DialogRenderer from '../../Components/dialog/dialogRenderer'
import useError from '../../utils/hooks/useError'
import RegistrationParent from '../../Components/common-registration-form/registrationParent'
import DisplayFormError from '../../Components/common-registration-form/formError'
import FormHelperText from '@mui/material/FormHelperText'
import {useGetUsersByRoleQuery,useAddNewBusMutation} from '../../store/bus_api'
import OilBarrelIcon from '@mui/icons-material/OilBarrel';
import Grid from '@mui/material/Grid'
const RoleData = {
    DRIVER:'driver',
    REDAT:'redat',
}

const validate = (values:any) => {
    const errors:any = {}
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
export default function BusRegistration () {

// global state values or dispatchers from redux
const {
  data:drivers,
   isLoading:driverLoading,
} = useGetUsersByRoleQuery(RoleData.DRIVER)

const {
data:redats,
isLoading:redatLoading,
} = useGetUsersByRoleQuery(RoleData.REDAT)
const [addNewBus] = useAddNewBusMutation()

// local states
const [redatButton,setRedatButton] = useState(false)
const [driverButton,setDriverButton]  =useState(false)
const [opendDialog,setOpenDialog] = useState(false)
const [open,setOpen] = useState(false)
const [loading, setLoading] = React.useState(false);
const [error,errorMessage,setErrorOccured,setErrorMessage] = useError()
const [driver,setDriver] = useState('')
const [redat,setRedat] = useState('')
const [driverError,driverErrorMessage,setDriverErrorOccured,setDriverErrorMessage] = useError()
const [redatError,redatErrorMessage,setRedatErrorOccured,setRedatErrorMessage] = useError()

// Handler Functions 
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

 const handleDriverChange = (e:SelectChangeEvent)=>{
    setDriver(e.target.value)
    setDriverErrorOccured(false)
    }
 const handleRedatChange = (e:SelectChangeEvent)=>{
    setRedat(e.target.value)
    setRedatErrorOccured(false)
 }

const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};

 // formik handler
  const formik = useFormik({
    initialValues: {
      serviceYear:0,
      sideNo:"",
      plateNo:"",
      NoOfSeat:0,
      chassisNumber:"",
      oilTankCapacity:"",
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
              await addNewBus(
                {
                bussideno:values.sideNo,
                busplateno:values.plateNo,
                bus_state:"Active",
                redatid:redat,
                driverid:driver,
                totalsit:values.NoOfSeat,
                serviceyear:values.serviceYear,
                }
              ).unwrap()

              resetForm({values:{
                sideNo: '',
                plateNo: '',
                NoOfSeat:0,
                serviceYear:0,
                chassisNumber:"",
                oilTankCapacity:"",
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
            setErrorMessage(`Failed to Register bus , ${err.data.message}`) 
            }
            finally {
              setLoading(false)
            }
          } 
    }
    },
  });

  return (
    driverLoading || redatLoading ?

  <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={driverLoading  || redatLoading }
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
         ml:1,
         mr:1,
     }}>
         <FormWrapper>
         <RegistrationHeader description = {'Register New Busses'} />
         </FormWrapper>
    <form onSubmit={formik.handleSubmit}>
    <Grid container>
                <Grid item xs={12}>
                <Grid display='flex' container spacing={2}  columnSpacing={5}> 
                        <Grid item xs={12} md={6}>
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
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
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
                        </Grid>
                </Grid>
                <Grid display='flex' container spacing={2}  columnSpacing={5} sx={{marginTop:2}}> 
                    <Grid item md={6} xs={12}>
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
                    </Grid>
                    <Grid item md={6} xs={12}>
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
        drivers?
        drivers.map((driver:any)=>(
          <MenuItem divider = {true} key = {driver._id} value={driver._id}>
              <ListItemText primary = {`${driver.firstName} ${driver.lastName}`}/>
          </MenuItem>
        ))
        :null
        }
        <MenuItem>  
        <AddButton description = "Driver" handleClick = {handleDriverDialogOpen}/>
        </MenuItem>
      </Select>
      {driverError && (<FormHelperText sx={{color:'red'}}>{driverErrorMessage}</FormHelperText>)}
      </FormControl>
                    </Grid>
                </Grid>
                <Grid display='flex' container spacing={2}  columnSpacing={5} sx={{marginTop:2}}> 
                    <Grid item md={6} xs={12}>
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
        redats?
        redats.map((redat:any)=>(
          <MenuItem divider = {true} key = {redat._id} value={redat._id}>
            <ListItemText primary = {`${redat.firstName} ${redat.lastName}`}/>
          </MenuItem>
        ))
        :null
        }
        <MenuItem>
        <AddButton description = "Redat" handleClick = {handleRedatDialogOpen}/>
        </MenuItem>
        
      </Select>
      {redatError && (<FormHelperText sx={{color:'red'}}>{redatErrorMessage}</FormHelperText>)}
      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
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
                    </Grid>
                </Grid>
                <Grid display='flex' container spacing={2}  columnSpacing={5} sx={{marginTop:2}}>
                    <Grid item md={6} xs={12}>
                    
                    <TextField
                    id="chassisNumber"
                    name="chassisNumber"
                    label="Chassis Number"
                    value={formik.values.chassisNumber}
                    onChange={formik.handleChange}
                    InputProps = {{
                        startAdornment:(
                        <InputAdornment position="start">
                            <DescriptionIcon sx={{fontSize:"35px"}} color="primary"/>
                        </InputAdornment>
                        )
                    }}
                       error={formik.touched.chassisNumber && Boolean(formik.errors.chassisNumber)}
                       helperText={formik.errors.chassisNumber && formik.errors.chassisNumber}
                    />
                    </Grid>
                            <Grid item xs={12} md={6}>
                            <TextField
                    id="oilTankCapacity"
                    name="oilTankCapacity"
                    label="Oil Tank Capacity"
                       value={formik.values.oilTankCapacity}
                       onChange={formik.handleChange}
                    InputProps = {{
                        startAdornment:(
                        <InputAdornment position="start">
                            <OilBarrelIcon sx={{fontSize:"35px"}} color="primary"/>
                        </InputAdornment>
                        )
                    }}
                       error={formik.touched.oilTankCapacity && Boolean(formik.errors.oilTankCapacity)}
                       helperText={formik.touched.oilTankCapacity && formik.errors.oilTankCapacity}
                    />
                            </Grid>
                     </Grid>
                </Grid>
            </Grid>
          
          <Button  
          type="submit"
          sx={{marginTop:4}}
          disabled = {loading}
          color="primary" variant="contained" >
          {'Save'}
      </Button>
          
          <SaveSuccessfull open={open} handleClose={handleClose} message = {'Bus Successfully Registered'} />
          <DialogRenderer open = {opendDialog} handleClose = {DialogClose} title="Register Users">
            
              {driverButton&&<UserRegistration providedRole = {RoleData.DRIVER} DialogClose = {DialogClose} />}
              {redatButton&&<UserRegistration providedRole = {RoleData.REDAT} DialogClose = {DialogClose} />}
            
          </DialogRenderer>
          
    </form>
    {
          error && ( <DisplayFormError errMess={errorMessage}/>)
        }
    </Box>

    </RegistrationParent>
  );
};


