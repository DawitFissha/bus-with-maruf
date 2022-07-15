import * as React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Divider from '@mui/material/Divider';
import Remove from '../../utils/remove'
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Autocomplete, FormControl, InputAdornment} from '@mui/material';
import Box from '@mui/material/Box';
import {SavingProgress} from '../../Components/savingProgress'
import { DatePicker } from '@mui/lab';
import { useFormik } from 'formik';
import {SaveSuccessfull} from '../../Components/saveSuccess'
import ScheduleIcon from '@mui/icons-material/Schedule';
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SvgIcon from '@mui/material/SvgIcon';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SeatPicker from '../../Components/seat-picker'
import {fetchSchedules,resetSchedule,addtoGlobalSchedules} from '../schedule/scheduleSlice'
import {allBusses} from '../../App'
import AuthService from '../../services/auth.service'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@mui/material/Grid';
import {ValidatePhoneNumber} from '../../utils/regex-validators'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
type scheduleOptionsType = {
  scheduleDescription : string,
  id : string,
}
type FormTypes = {firstName:string,lastName:string,phoneNumber:string,seatNumber?:number,additionalPassengerFirstName:string,additionalPassengerLastName:string,additionalPassengerPhoneNumber:string}
interface bookingProps {
  passSchedule:(schedule:string)=>void
}
const validate = (values:FormTypes) => {
    const errors:Partial<FormTypes> = {}
    
    if (!values.firstName) {
      errors.firstName = 'Please Enter First Name of the Passenger'
    } 
    if (!values.lastName) {
      errors.lastName = 'Please Enter Lasst Name of the Passenger'
    } 
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Please Enter Phone Number of the Passenger'
    } 

    if((!ValidatePhoneNumber(values.phoneNumber))) {
      errors.phoneNumber = "Please Enter a valid PhoneNumber"
    }
  if((!ValidatePhoneNumber(values.additionalPassengerPhoneNumber))) {
      errors.additionalPassengerPhoneNumber = "Please Enter a valid PhoneNumber"
    }
    return errors;
  };
const TextFieldz = styled(TextField)({
    maxWidth:'190px',
    minWidth:'140px'
})

export function Booking(props:bookingProps){
const {passSchedule} = props
const [seatPickerOpen,setSeatPickerOpen] = React.useState(false)
const theme = useTheme()
const smallScreen = useMediaQuery(theme.breakpoints.down('md'));
console.log(smallScreen)
const handleClickOpenSeatPicker = ()=>{
  setSeatPickerOpen(true)
}
const handleCloseSeatPickcer = ()=>{
  setSeatPickerOpen(false)
}
const handleSeatChoosing = (seat:number)=>{
  console.log(seat)
  setSeatNumber(prev=>{
    let newSelectedSeats = prev
    if(prev.includes(seat)) {
      const selectedSeatIndex = prev.indexOf(seat)
      newSelectedSeats = Remove(prev,selectedSeatIndex)
    }
    else { newSelectedSeats = [...prev,seat]}
    return newSelectedSeats
  })

  setSeatPickerOpen(false)
}
const dispatch = useAppDispatch();
const globalSchedules = useAppSelector(state=>state.schedules.globalSchedules)

const [bookingDate,setBookingDate] = React.useState<Date|null>(new Date())

const [saveStatus,setSaveStatus] = React.useState(false)
const handleSaveStatusClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setSaveStatus(false);
};
const [seatNumber, setSeatNumber] = React.useState<number[]>([]);

const [loading, setLoading] = React.useState(false);
const schedules = useAppSelector(state=>state.schedules.schedules)

const scheduleStatus = useAppSelector(state=>state.schedules.status)
const [seatNumberRequired,setSeatNumberRequired] = React.useState(false)
const [schedulesOpen,setSchedulesOpen] = React.useState(false)  
const schedulesLoading = schedulesOpen && scheduleStatus==='idle'
const [scheduleValue,setScheduleValue] = React.useState('')

const scheduleOptions:scheduleOptionsType[] = schedules.map(schedule=>(
  {id:schedule._id as string ,scheduleDescription:`${schedule.source} to ${schedule.destination} departing on ${new Date(schedule?.departureDateAndTime).toLocaleDateString()}
  from ${schedule?.departurePlace}
  `}
))

const [schedule,setSchedule] = React.useState<scheduleOptionsType | null>({
  scheduleDescription:'',id:''
})
const scheduleInfo = useAppSelector(state=>state.schedules.schedules.find(sch=>sch._id===schedule?.id))

React.useEffect(()=> {

  if(schedulesLoading){
    dispatch(fetchSchedules())
  }

if(seatNumber.length>0){
  setSeatNumberRequired(false)
}

passSchedule(schedule?.id as string)
if(Boolean(schedule?.id && (seatNumber?.length>0))){
  AuthService.lockSit(seatNumber,schedule?.id as string)
}

dispatch(addtoGlobalSchedules(schedule))
},[schedulesLoading,dispatch,schedule,seatNumber,passSchedule])

React.useEffect(()=>{
  if(Boolean(seatNumber)){
    setSeatNumber([])
  }
},[schedule])

const formik = useFormik({
  initialValues: {
  firstName:'',
  lastName:'',
  phoneNumber:'',
  additionalPassengerFirstName:'',
  additionalPassengerLastName:'',
  additionalPassengerPhoneNumber:'',
  },
  validate,
  onSubmit: async (values,{resetForm}) => {
    if(seatNumber.length===0){
      setSeatNumberRequired(true)
      return 
    }

      if(!loading) {
          setLoading(true)
          try {
            await AuthService.bookTicket(
              
              [
                {
                passname:`${values.firstName} ${values.lastName}`,
                passphone:values.phoneNumber,
                sits:seatNumber[0],
              }
              ,
              ...seatNumber.slice(1).map((seatNo)=>(
                {
                  passname:`${values.additionalPassengerFirstName} ${values.additionalPassengerLastName}`,
                  passphone:values.additionalPassengerPhoneNumber!==''?values.additionalPassengerPhoneNumber:values.phoneNumber,
                  sits:seatNo,
                }
              )
              )
            ]
            ,schedule?.id as string)
            
          //   console.log(
          //     [
          //     {
          //     passname:`${values.firstName} ${values.lastName}`,
          //     passphone:values.phoneNumber,
          //     sits:seatNumber[0],
          //   }
          //   ,
          //   ...seatNumber.slice(1).map((seatNo)=>(
          //     {
          //       passname:`${values.additionalPassengerFirstName} ${values.additionalPassengerLastName}`,
          //       passphone:values.phoneNumber,
          //       sits:seatNo,
          //     }
          //   )
          //   )
          // ]
          // )
            resetForm({values:{
              seatNumber:1,
              firstName:'',
              lastName:'',
              phoneNumber:'',
              additionalPassengerFirstName:'',
              additionalPassengerLastName:'',
              additionalPassengerPhoneNumber:'',
            }})
            
            setSeatNumberRequired(false)
            setSeatNumber([])
            setSaveStatus(true)
            dispatch(resetSchedule())
            dispatch(fetchSchedules())
            setSchedule((prev:scheduleOptionsType|null) => prev)
}
          catch(err){
            console.log(`something happened ${err}`)
          }
          finally {
            setLoading(false)
          }
        }
     
  },
});

// console.log(Remove([1,2,3,4],1))

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SavingProgress loading={loading}/>
          <form onSubmit={formik.handleSubmit}>
        <div
        style = {{
            maxWidth:"850px",
            // marginTop:'2px',
            marginLeft:'12%',
            height:'auto',
            background:'#FFFF',
            // marginBottom:'5px',
        }}
        >
           <Box sx ={{
             paddingTop:"5px"
            }}>
           < h3 style= {{
                textAlign:"center",
            }}>Book A Ticket</h3>
           </Box>
            <Divider/>
            <Box sx={{m:2}}>
         <Grid container spacing = {2} > 
         <Grid item xs={12} md={6} >
           <FormControl fullWidth = {smallScreen} sx={smallScreen?{}:{maxWidth:'350px',minWidth:'250px',}}>
           <Autocomplete
        value={schedule}
        onChange = {(event: any, newValue:scheduleOptionsType|null) => {
          setSchedule(newValue);
        }}
        id="schedules"
        open={schedulesOpen}
        onOpen = {()=>{
          setSchedulesOpen(true)
        }}
        onClose = {()=>{
          setSchedulesOpen(false)
        }}
        loading = {schedulesLoading}
        inputValue={scheduleValue}
        onInputChange={(event, newInputValue) => {
          setScheduleValue(newInputValue);
        }}
        options={scheduleOptions}
        isOptionEqualToValue={(option, value) => option.scheduleDescription === value.scheduleDescription}
        getOptionLabel = {(option)=>option.scheduleDescription}
        renderInput={(params) => (
          <TextField
          {...params}
          label="Schedules"
          InputProps={{
            ...params.InputProps,
            startAdornment:(
              <InputAdornment position="start">
              <ScheduleIcon color='primary' fontSize='large'/>
            </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {scheduleStatus==='loading' ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
        )}
      />
           </FormControl>
           
           </Grid>

           <Grid item xs={12} md={6}>
           <DatePicker
           
            disabled
            label="Booking Date"
            value={bookingDate}
            onChange={(newValue) => {
            setBookingDate(newValue);
        }}
        renderInput={(params) => <TextField sx={smallScreen?{}:{maxWidth:'190px',minWidth:'140px'}} fullWidth = {smallScreen} {...params} />}
      />
           </Grid>
         </Grid>
         </Box>
         <Divider/>
         <Box sx={{m:2}}>
         < h5>Route information</ h5>
         
                  <Grid container spacing={2}>
                
                <Grid item xs={12} md={3} lg={3}>
                    {/* source text field goes here  */}
                    <TextField
                    disabled
                    id="source-city"
                    name="Source city"
                    label="Source City"
                    value ={scheduleInfo?scheduleInfo.source:''}
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <PlaceIcon color='primary' fontSize='large'/>
                        </InputAdornment>
                      )
                    }}
                        />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    {/* destination text field goes here  */}
                    <TextField
                    disabled
                    id="destination-city"
                    name="Destination"
                    label="Destination City"
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <PlaceIcon color='primary' fontSize='large'/>
                        </InputAdornment>
                      )
                    }}
                    value ={scheduleInfo?scheduleInfo.destination:''}
                        />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    {/* departure date text field goes here  */}
                    <TextField
                    disabled
                    id="departure-date"
                    name="Departure Date"
                    label="Departure Date"
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <EventIcon color='primary' fontSize='large'/>
                        </InputAdornment>
                      )
                    }}
                      
                    value ={scheduleInfo?new Date(scheduleInfo?.departureDateAndTime).toLocaleDateString():''}
                        />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    {/* departure time text field goes here  */}
                    <TextField
                    disabled
                    id="departure-time"
                    name="Departure Time"
                    label="Departure Time"
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <AccessTimeIcon color='primary' fontSize='large'/>
                        </InputAdornment>
                      )
                    }}
                    value ={scheduleInfo?new Date(scheduleInfo?.departureDateAndTime).toLocaleTimeString():''}
                        />
                </Grid>
             
             <Grid item xs={12} md={3} lg={3} >

              <TextField
                    disabled
                    id="departure-place"
                    name="Departure Place"
                    label="Departure Place"
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                          <SvgIcon color="primary" fontSize="large">
                      <path fill="currentColor" d="M22 7V16C22 16.71 21.62 17.36 21 17.72V19.25C21 19.66 20.66 20 20.25 20H19.75C19.34 20 19 19.66 19 19.25V18H12V19.25C12 19.66 11.66 20 11.25 20H10.75C10.34 20 10 19.66 10 19.25V17.72C9.39 17.36 9 16.71 9 16V7C9 4 12 4 15.5 4S22 4 22 7M13 15C13 14.45 12.55 14 12 14S11 14.45 11 15 11.45 16 12 16 13 15.55 13 15M20 15C20 14.45 19.55 14 19 14S18 14.45 18 15 18.45 16 19 16 20 15.55 20 15M20 7H11V11H20V7M7 9.5C6.97 8.12 5.83 7 4.45 7.05C3.07 7.08 1.97 8.22 2 9.6C2.03 10.77 2.86 11.77 4 12V20H5V12C6.18 11.76 7 10.71 7 9.5Z" />
                    </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                      
                    value ={scheduleInfo?.departurePlace?scheduleInfo?.departurePlace:''}
                        />
           
                </Grid >
                <Grid item xs={12} md={3} lg={3}>
                    
                    <TextField
                    id="seat-number"
                    name="seatNumber"
                    label="Seat Number"
                  
                    value={seatNumber?.join(',')}
                    disabled
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <SvgIcon color="primary" fontSize="large">
                        <path fill="currentColor" d="M9 19H15V21H9C6.24 21 4 18.76 4 16V7H6V16C6 17.66 7.34 19 9 19M10.42 5.41C11.2 4.63 11.2 3.36 10.42 2.58C9.64 1.8 8.37 1.8 7.59 2.58C6.81 3.36 6.81 4.63 7.59 5.41C8.37 6.2 9.63 6.2 10.42 5.41M11.5 9C11.5 7.9 10.6 7 9.5 7H9C7.9 7 7 7.9 7 9V15C7 16.66 8.34 18 10 18H15.07L18.57 21.5L20 20.07L14.93 15H11.5L11.5 9Z" />
                        </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    error={seatNumberRequired}
                    helperText={seatNumberRequired && 'Please Select a seat first'}

                        /> 
                        
                </Grid>
                <Grid item xs={12} md={3} lg={3} mt={1}>
                  <Button disabled={!Boolean(schedule?.id)} color = "primary" variant="text" 
                          onClick={handleClickOpenSeatPicker}
                  >
                Choose A Seat
              </Button>
                </Grid>  
                </Grid>
                </Box>
                <Divider/>
                <Box sx={{m:2}}>
         <  h5>Passenger information</h5>
         
                    
                  <Grid container spacing = {2}>
          
                 <Grid item xs={12} md={4} lg={4}>
                    
                    <TextField
                    id="first-name"
                    name="firstName"
                    label="First Name"
                    sx={smallScreen?{}:{width:"250px"}}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <SvgIcon color='primary' fontSize='large'>
                        <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                        </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
            
                    <TextField
                    id="last-name"
                    name="lastName"
                    label="Last Name"
                    sx={smallScreen?{}:{width:"250px"}}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <SvgIcon color='primary' fontSize='large'>
                        <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                        </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>

                    <TextField
                    id="phone-number"
                    name="phoneNumber"
                    label="Phone Number"
                    sx={smallScreen?{}:{width:"250px"}}
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <LocalPhoneIcon color='primary' fontSize='large'/>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    />
                </Grid>
                 </Grid>
                 </Box>
                 <Divider/>
                 {
                 seatNumber.length>1 && (
                  <Box sx={{m:2}}>
                  <Box>
                      <h5>Additonal Passenger Information</h5>
                  </Box>
                  {
                    seatNumber.slice(1).map((sNo:number)=>(
                      <>
                      <Grid container spacing = {2}>
                      <Grid item xs={12} md={4} lg={4}>
                          <TextField
                          id={`firstname ${sNo}`}
                          name='additionalPassengerFirstName'
                          label={`First Name for seat ${sNo}`}
                          value={formik.values.additionalPassengerFirstName}
                          onChange={formik.handleChange}
                          sx={smallScreen?{}:{width:"250px"}}
                          InputProps={{
                            startAdornment:(
                              <InputAdornment position="start">
                              <SvgIcon color='primary' fontSize='medium'>
                              <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                              </SvgIcon>
                              </InputAdornment>
                            )
                          }}
                          error={seatNumber.length>1 && formik.touched.additionalPassengerFirstName && Boolean(formik.errors.additionalPassengerFirstName)}
                          helperText={formik.touched.additionalPassengerFirstName && formik.errors.additionalPassengerFirstName}
                          />
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>
                      <TextField
                          id={`lastname ${sNo}`}
                          name='additionalPassengerLastName'
                          label={`Last Name for seat ${sNo}`}
                          value = {formik.values.additionalPassengerLastName}
                          onChange={formik.handleChange}
                          sx={smallScreen?{}:{width:"250px"}}
                          InputProps={{
                            startAdornment:(
                              <InputAdornment position="start">
                              <SvgIcon color='primary' fontSize='medium'>
                              <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                              </SvgIcon>
                              </InputAdornment>
                            )
                          }}
                          error={seatNumber.length > 1 && formik.touched.additionalPassengerLastName && Boolean(formik.errors.additionalPassengerLastName)}
                          helperText={formik.touched.additionalPassengerLastName && formik.errors.additionalPassengerLastName}
                          />
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>
                          <TextField
                          id={`phonenumber ${sNo}`}
                          name='additionalPassengerPhoneNumber'
                          label={`Optional Phone Number for seat ${sNo}`}
                          value={formik.values.additionalPassengerPhoneNumber}
                          onChange={formik.handleChange}
                          sx={smallScreen?{}:{width:"250px"}}
                          InputProps={{
                            startAdornment:(
                              <InputAdornment position="start">
                        <LocalPhoneIcon color='primary' fontSize='large'/>
                        </InputAdornment>
                            )
                          }}
                          error={seatNumber.length > 1 && formik.touched.additionalPassengerPhoneNumber && Boolean(formik.errors.additionalPassengerPhoneNumber)}
                          helperText={formik.touched.additionalPassengerPhoneNumber && formik.errors.additionalPassengerPhoneNumber}
                          />
                      </Grid>
                  </Grid>
                  <Divider/>
                  </>
                    ))
                  }
              </Box>
                 )
                 }
              <Box sx={{p:2}}>
              <Button 
              type="submit"
              sx={smallScreen?{}:{
                   display:'block',
                   marginLeft: 'auto',
                   marginRight: 'auto',
                   width:"200px"
                 }}
                 > Book Now </Button>
              </Box>
              
        </div>
        </form>
        <SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'Ticket Successfully Booked' />
        {seatPickerOpen&&(<SeatPicker selectedSeat = {seatNumber} busPlateNo = {scheduleInfo?.assignedBus?allBusses.find((activeBus:any)=>activeBus._id===scheduleInfo?.assignedBus)?.busPlateNo:'x'} occupiedSeats={scheduleInfo?.occupiedSitNo} numberOfSeat = {scheduleInfo?.totalNoOfSit} handleSeatChoosing = {handleSeatChoosing} open={seatPickerOpen} handleClose = {handleCloseSeatPickcer}/>)}
        </LocalizationProvider>
    )
}
