import React,{useState,useEffect} from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {fetchRoutes} from '../route/routeSlice'
import {addSchedule} from './scheduleSlice'
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {RegistrationHeader} from '../../Components/registrationHeader'
import {SavingProgress} from '../../Components/savingProgress'
import {SaveSuccessfull} from '../../Components/saveSuccess'
import {FormHelperText, InputAdornment, ListItemText, OutlinedInput } from '@mui/material';
import { TimePicker } from '@mui/lab';
import { useFormik } from 'formik';
import {FormWrapper} from '../../Components/formWrapper'
import DescriptionIcon from '@mui/icons-material/Description';
import RouteIcon from '@mui/icons-material/Route';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import SvgIcon from '@mui/material/SvgIcon';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {ActiveBusses} from '../../App'
import useError from '../../utils/useError'
 type routeOptionsType = {
  label : string,
  id : string,
}

const validate = (values:{description:string}) => {
    const errors:{description?:string} = {}
    if (!values.description) {
      errors.description = 'Please Enter Some Description About the schedule'
    } 
    return errors;
  };
export default function Schedule(){
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
const dispatch = useAppDispatch()
const routeStatus = useAppSelector(state=>state.routes.status)
const [open,setOpen] = useState(false)
const [routesOpen,setRoutesOpen] = useState(false)  
const routesLoading = routesOpen && routeStatus==='idle'
const [loading, setLoading] = React.useState(false);
const routes = useAppSelector(state=>state.routes.routes)

const routeOptions:routeOptionsType[] = routes.map(route=>(
  {id:route._id as string ,label:`${route.source} to ${route.destination}`}
))

const [route,setRoute] = useState<routeOptionsType | null>({
  label:'',id:''
})

const [routeValue,setRouteValue] = useState('')
const routeId = route?.id
const tarif = routes.find((r)=>r._id===routeId)?.tarif
const departurePlaces = routes.find((r)=>r._id===routeId)?.departurePlace
const assignedBusses = routes.find((r)=>r._id===routeId)?.bus
const source = routes.find((r)=>r._id===routeId)?.source
const destination = routes.find((r)=>r._id===routeId)?.destination
const estimatedhour = routes.find((r)=>r._id===routeId)?.estimatedHour
const distance = routes.find((r)=>r._id===routeId)?.distance
const [depPlace, setDepPlace] = React.useState('');
const [assignedBus, setAssignedBus] = React.useState('');
const [departureDate,setDepartureDate] = useState<Date|null>(null)
const [departureTime,setDepartureTime] = useState<Date|null>(null)
const [routeError,routeErrorMessage,setRouteErrorOccured,setRouteErrorMessage] = useError()
const handleDepPlaceChange = (e: SelectChangeEvent) => {
setDepPlace(e.target.value);
};

const handleAssignedBusChange = (event:SelectChangeEvent) => {
 setAssignedBus(event.target.value);
};

const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};

useEffect(()=>{
    document.title+=` - Create Schedule`
    if(routesLoading){
      dispatch(fetchRoutes())
      
    }
    },[routesLoading,dispatch])

const formik = useFormik({
    initialValues: {
      description: "",
    },
    validate,
    onSubmit: async (values,{resetForm}) => {

       if(route?.id===""){
        setRouteErrorOccured(true)
        setRouteErrorMessage('required')
       }
       else {
        if(!loading){
            setLoading(true)
            try {
              await dispatch(addSchedule(
                {
                source,
                description:values.description,
                destination,
                tarif,
               distance,
               estimatedhour,
               assignedbus:assignedBus,
               depplace:depPlace,
               depdateandtime:new Date(`${departureDate?.toLocaleDateString()} ${departureTime?.toTimeString()}`).toISOString(),
               totalnoofsit:ActiveBusses?.find(ab=>ab._id===assignedBus)?.totalNoOfSit,
               
             }
              )).unwrap()
              
              resetForm({values:{
                description: ""
              }})
              setDepartureDate(null)
              setDepartureTime(null)
              setDepPlace('')
              setAssignedBus('')
              setRoute({
                label:'',id:''
              })
              setOpen(true)
              setRouteErrorMessage('')
            }
            catch(err){
              console.log(err)
            }
            finally{
              setLoading(false)
            }
              }
            }
    },
  });
  
  return (
   <LocalizationProvider dateAdapter={AdapterDateFns}>
     
        <div style ={{
      width:"600px",
      marginLeft:'25%',
      height:'auto',
     background:'#FFFF',
     marginBottom:'5px',
    }}>
    <SavingProgress loading={loading}/>
        <Box sx={{
           display:'flex',
           flexDirection:'column',
            mr:1,ml:1
       }}>
           <FormWrapper>
           <RegistrationHeader description = 'Create A Schedule' />
           </FormWrapper>
           <Box sx={{marginLeft:'60%'}}>
           <InputLabel >Date</InputLabel>
               <TextField 
               sx={{maxWidth:'200px',minWidth:'150px'}}
               size = 'small'
               value={new Date().toLocaleDateString()}
               />
               <h4 style = {{marginTop:'10px'}}>Price - {tarif?`${tarif} Birr`:''}</h4>
           </Box>
      <form onSubmit={formik.handleSubmit}>
      <FormWrapper>
            <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        InputProps = {{
          startAdornment:(
          <InputAdornment position="start">
              <DescriptionIcon sx={{fontSize:"35px"}} color="primary"/>
          </InputAdornment>
          )
      }}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
            </FormWrapper>
            <FormWrapper>
              <FormControl fullWidth error={routeError}>
        <Autocomplete
        value={route}
        onChange = {(event: any, newValue:routeOptionsType|null) => {
          setRoute(newValue);
        }}
        id="routes"
        open={routesOpen}
        onOpen = {()=>{
          setRoutesOpen(true)
        }}
        onClose = {()=>{
          setRoutesOpen(false)
        }}
        loading = {routesLoading}
        inputValue={routeValue}
        onInputChange={(event, newInputValue) => {
          setRouteValue(newInputValue);
        }}
        options={routeOptions}
    
        renderInput={(params) => (
          <TextField
          {...params}
          label="Routes"
          InputProps={{
            ...params.InputProps,
            startAdornment:(
              <InputAdornment position="start">
              <RouteIcon sx={{fontSize:"35px"}} color="primary"/>
          </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {routeStatus==='loading' ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
        )}
      />
      {
        routeError && (<FormHelperText>{routeErrorMessage}</FormHelperText>)
      }
      </FormControl>
        </FormWrapper>
        <FormWrapper>
            <DatePicker
            label="Departure Date"
            value={departureDate}
            onChange={(newValue) => {
            setDepartureDate(newValue);
        }}
        renderInput={(params) =>{
          if(params.InputProps!==undefined){
            params.InputProps.startAdornment = (
              <InputAdornment position="start">
              <DepartureBoardIcon color="primary" sx={{fontSize:"35px"}}/>
              </InputAdornment>
            )
          }
          return(
            <TextField {...params} fullWidth />
          )
        }}
        
      />
      {/* <FormHelperText sx={{color:'red'}}>{required}</FormHelperText> */}
            </FormWrapper>
        <FormWrapper>
        <TimePicker
        label="Departure Time"
        value={departureTime}
        onChange={(newValue) => {
          setDepartureTime(newValue);
        }}
        renderInput={(params) =>{
          if(params.InputProps!==undefined){
            params.InputProps.startAdornment = (
              <InputAdornment position="start">
              <DepartureBoardIcon color="primary" sx={{fontSize:"35px"}}/>
              </InputAdornment>
            )
          }
          return(
            <TextField {...params} fullWidth />
          )
        }}
      />
      {/* <FormHelperText sx={{color:'red'}}>{required}</FormHelperText> */}
        </FormWrapper>
        <FormWrapper>
          <FormControl sx={{width: '100%' }}>
        <InputLabel id="departure-place">Departure Place</InputLabel>
        <Select
          labelId="departure-place"
          id="departure-places"
          // multiple
          value={depPlace}
          onChange={handleDepPlaceChange}
          input={<OutlinedInput id="select-multiple" label="Departure Place" />}
          // renderValue={(selected)=>routes?.find(route=>route._id===selected)?.busPlateNo}
          MenuProps={MenuProps}
          startAdornment = {
            <InputAdornment position="start">
              <SvgIcon color="primary" sx={{fontSize:"35px"}}>
                    <path fill="currentColor" d="M22 7V16C22 16.71 21.62 17.36 21 17.72V19.25C21 19.66 20.66 20 20.25 20H19.75C19.34 20 19 19.66 19 19.25V18H12V19.25C12 19.66 11.66 20 11.25 20H10.75C10.34 20 10 19.66 10 19.25V17.72C9.39 17.36 9 16.71 9 16V7C9 4 12 4 15.5 4S22 4 22 7M13 15C13 14.45 12.55 14 12 14S11 14.45 11 15 11.45 16 12 16 13 15.55 13 15M20 15C20 14.45 19.55 14 19 14S18 14.45 18 15 18.45 16 19 16 20 15.55 20 15M20 7H11V11H20V7M7 9.5C6.97 8.12 5.83 7 4.45 7.05C3.07 7.08 1.97 8.22 2 9.6C2.03 10.77 2.86 11.77 4 12V20H5V12C6.18 11.76 7 10.71 7 9.5Z" />
              </SvgIcon>
            </InputAdornment>
            }
        >
          {
          departurePlaces?
          departurePlaces!.map((departurePlace:string,index:number) => (
            <MenuItem
              key={index}
              value={departurePlace}
            >
         
              <ListItemText primary={departurePlace} />
            </MenuItem>
          )):null
          }
        </Select>
      </FormControl>
          </FormWrapper>

          <FormWrapper>
          <FormControl sx={{width: '100%' }}>
        <InputLabel id="departure-place">Bus</InputLabel>
        <Select
          labelId="departure-place"
          id="departure-places"
          // multiple
          value={assignedBus}
          onChange={handleAssignedBusChange}
          input={<OutlinedInput id="select-multiple" label="Departure Place" />}
          renderValue={(selected)=>ActiveBusses?.find(ab=>ab._id===selected)?.busPlateNo}
          MenuProps={MenuProps}
          startAdornment = {
            <InputAdornment position="start">
              <DirectionsBusIcon color="primary" fontSize='large'/>
            </InputAdornment>
            }
        >
          {
          assignedBusses?
          assignedBusses!.map((assignedBus:string) => (
            <MenuItem
              key={assignedBus}
              value={assignedBus}
            >
              
              <ListItemText primary={ActiveBusses?.find(activeBus=>(activeBus?._id === assignedBus))?.busPlateNo} />
            </MenuItem>
          )):null
          }
        </Select>
      </FormControl>
          </FormWrapper>
            <FormWrapper>
            <Button  
            type="submit"
            disabled = {loading}
            color="primary" variant="contained" >
          Save
        </Button>
            </FormWrapper>
            <SaveSuccessfull open={open} handleClose={handleClose} message = 'Schedule Successfully Created' />
            
      </form>
      
      </Box>
    </div>
    
   </LocalizationProvider>
  );
};


