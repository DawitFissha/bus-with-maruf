import * as React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Divider from '@mui/material/Divider';
import Remove from '../../utils/remove'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Autocomplete, FormControl, InputAdornment, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {SavingProgress} from '../../Components/common-registration-form/savingProgress'
import { useFormik } from 'formik';
import {SaveSuccessfull} from '../../Components/common-registration-form/saveSuccess'
import ScheduleIcon from '@mui/icons-material/Schedule';
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SvgIcon from '@mui/material/SvgIcon';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SeatPicker from '../../Components/seat-picker'
import AuthService from '../../services/auth.service'
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import {ValidatePhoneNumber} from '../../utils/regex-validators'
import useSmallScreen from '../../utils/hooks/useSmallScreen'
import {useGetSchedulesQuery,useGetActiveBussesQuery,useGetAllUsersQuery} from '../../store/bus_api'
import {useReactToPrint} from 'react-to-print'
import TicketPreview from '../../Components/ticket/ticket-preview'
import Avatar from '@mui/material/Avatar'
import dave from './dave.jpg'
import {useAppSelector} from '../../app/hooks'
type scheduleOptionsType = {
    scheduleDescription : string,
    id : string,
  }
  type passengerInformationType = {firstName:string,lastName:string,phoneNumber:string,additonalPassengerFirstName?:string,additonalPassengerLastName?:string,additonalPassengerPhoneNumber?:string}
  const validate = (values:passengerInformationType) => {
      const errors:Partial<passengerInformationType> = {}
      
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
      if(values.additonalPassengerPhoneNumber){
        if(!ValidatePhoneNumber(values.additonalPassengerPhoneNumber)){
          errors.additonalPassengerPhoneNumber = "Please Enter a valid PhoneNumber"
        }
      }
  
      return errors;
    };
export default function Newbooking(){
const userName = JSON.parse(localStorage.getItem('user') as string)
     // states from redux
const {data:schedules=[],isLoading:schedulesLoading} = useGetSchedulesQuery()
const {data:allBusses=[]} = useGetActiveBussesQuery()
const userinfo=useAppSelector(state=>state.userinfo)
// local states
const [seatPickerOpen,setSeatPickerOpen] = React.useState(false)
const smallScreen = useSmallScreen()
const [bookingDate,setBookingDate] = React.useState<Date|null>(new Date())
const [saveStatus,setSaveStatus] = React.useState(false)
const [seatNumber, setSeatNumber] = React.useState<number[]>([]);
const [loading, setLoading] = React.useState(false);
const [seatNumberRequired,setSeatNumberRequired] = React.useState(false)
const [scheduleValue,setScheduleValue] = React.useState('')
const scheduleOptions:scheduleOptionsType[] = schedules.map((schedule:any)=>(
  {id:schedule._id as string ,scheduleDescription:`${schedule.source} to ${schedule.destination} departing on ${new Date(schedule?.departureDateAndTime).toLocaleDateString()}
  from ${schedule?.departurePlace}
  `}
))

const [schedule,setSchedule] = React.useState<scheduleOptionsType | null>({
  scheduleDescription:'',id:''
})
const scheduleInfo = schedules?.find((sch:any)=>sch._id===schedule?.id)
const [canSelectSeat,setCanSelectSeat] = React.useState(true) // to disable selecting seats if two seats are selected
const componentRef = React.useRef(null)
const [passengerDetail,setPassengerDetail]=React.useState({
  passengerName:'',
  seatNo:0,
  phoneNumber:'',
  uniqueId:'',
})
//handler functions 
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

  
}
const completeSeatChoosing = ()=>{
  setSeatPickerOpen(false)
}

const handleSaveStatusClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setSaveStatus(false);
};
const handlePrint = useReactToPrint({
  content:()=>componentRef.current
}) 

// Effect to handle seatnumber stuff
React.useEffect(()=> {
if(seatNumber.length>0){
  setSeatNumberRequired(false)
}
if(seatNumber.length>1) {
  setCanSelectSeat(false) //maximum of two seats can be selected
}
if(seatNumber.length<=1) {
  setCanSelectSeat(true) //maximum of two seats can be selected
}
if(Boolean(schedule?.id && (seatNumber?.length>0))){
  AuthService.lockSit(seatNumber,schedule?.id as string)
}
if(!Boolean(schedule?.id)){
  setSeatNumber([])
}
},[schedulesLoading,schedule,seatNumber])

//formik
const formik = useFormik({
  initialValues: {
  firstName:'',
  lastName:'',
  phoneNumber:'',
  additonalPassengerFirstName:'',
  additonalPassengerLastName:'',
  additonalPassengerPhoneNumber:'',
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
                  passname:`${values.additonalPassengerFirstName as string}  ${values.additonalPassengerLastName as string}`,
                  passphone:values.additonalPassengerPhoneNumber !=='' ? values.additonalPassengerPhoneNumber as string : values.phoneNumber,
                  sits:seatNo,
                }
              )
              )
            ]
            ,schedule?.id as string).then((response:any)=>{
              // console.log(response.data.ticket)
              setPassengerDetail({
                ...passengerDetail,
                passengerName:response.data.ticket.passangerName,
                phoneNumber:response.data.ticket.passangerPhone,
                seatNo:response.data.ticket.passangerOccupiedSitNo,
                uniqueId:response.data.ticket.uniqueId,
              })
              // setIdForQRCode(response.data.ticket.uniqueId)
            })
            handlePrint()
            resetForm({values:{
              firstName:'',
              lastName:'',
              phoneNumber:'',
              additonalPassengerFirstName:'',
              additonalPassengerLastName:'',
              additonalPassengerPhoneNumber:'',
            }})
            setSeatNumberRequired(false)
            setSeatNumber([])
            setSaveStatus(true)
            setSchedule((prev:scheduleOptionsType|null) => prev)
            setPassengerDetail({
              passengerName:"",
              phoneNumber:"",
              seatNo:0,
              uniqueId:"",
            })
            
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
    return (
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SavingProgress loading={loading}/>
          <form onSubmit={formik.handleSubmit}>

            <div
            style={{
              width:"100%",
              // marginLeft:'12%',
              height:'auto',
              background:'#FFFF',
            }}
                >
                         <div style = {{display:'none'}}><TicketPreview 
          qrCodeValue={passengerDetail.uniqueId}
          ticketerName={userinfo?.username}
          ticketNo='000231' 
          passengerFullName={passengerDetail.passengerName}
          seatNo= {passengerDetail.seatNo}
          sourceCity = {scheduleInfo?.source}
          price = {scheduleInfo?.price}
          departureTime = {new Date(scheduleInfo?.departureDateAndTime).toLocaleTimeString()}
          departureDate = {new Date(scheduleInfo?.departureDateAndTime).toDateString()}
          destinationCity = {scheduleInfo?.destination}
          phoneNumber = {passengerDetail.phoneNumber}
          departurePlace = {scheduleInfo?.departurePlace}
          ref = {componentRef}/></div>
             <Box sx ={{
             paddingTop:"5px"
            }}>
           < h2 style= {{
                textAlign:"center",
            }}>Book A Ticket</h2>
           </Box>
            <Divider/>
            
            <Grid container spacing = {2} mt={1} columnSpacing={12} >
            <Grid item xs={6}>
                {/* Grid 1 */}
                <FormControl fullWidth = {smallScreen} sx={smallScreen?{}:{maxWidth:'350px',minWidth:'250px',}}>
           <Autocomplete
        value={schedule}
        onChange = {(event: any, newValue:scheduleOptionsType|null) => {
          setSchedule(newValue);
        }}
        id="schedules"
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
              <ScheduleIcon color='primary' fontSize='medium'/>
            </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {schedulesLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
        )}
      />
           </FormControl>
           < h3>Passenger information</ h3>
           <Grid container spacing = {2} >
           <Grid item xs={12} md={6} lg={6}>
                    
                    <TextField
                    id="first-name"
                    name="firstName"
                    label="First Name"
                    // sx={smallScreen?{}:{width:"250px"}}
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
                <Grid item xs={12} md={6} lg={6}>
            
            <TextField
            id="last-name"
            name="lastName"
            label="Last Name"
            // sx={smallScreen?{}:{width:"250px"}}
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
        <Grid item xs={12} md={6} lg={6}>

            <TextField
            id="phone-number"
            name="phoneNumber"
            label="Phone Number"
            // sx={smallScreen?{}:{width:"250px"}}
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
            <Grid item xs={12} md={6} lg={6}>
                    
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
              
           </Grid>
           <Grid/>
           {
                 seatNumber.length > 1 && (
                    <>
                        < h3>Additional Passenger information</ h3>
           <Grid container spacing = {2} >
           <Grid item xs={12} md={6} lg={6}>
                            <TextField
                            id={`additonalPassengerFirstName`}
                            name={'additonalPassengerFirstName'}
                            label={`First Name for seat ${seatNumber[seatNumber.length-1]}`}
                            value={formik.values.additonalPassengerFirstName}
                            onChange={formik.handleChange}
                            // sx={smallScreen?{}:{width:"250px"}}
                            InputProps={{
                              startAdornment:(
                                <InputAdornment position="start">
                                <SvgIcon color='primary' fontSize='medium'>
                                <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                                </SvgIcon>
                                </InputAdornment>
                              )
                            }}
                            // error={seatNumber.length>1 && formik.touched.additionalPassengerFirstName && Boolean(formik.errors.additionalPassengerFirstName)}
                            // helperText={formik.touched.additionalPassengerFirstName && formik.errors.additionalPassengerFirstName}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            id={`additonalPassengerLastName`}
                            name={`additonalPassengerLastName`}
                            label={`Last Name for seat ${seatNumber[seatNumber.length-1]}`}
                            value = {formik.values.additonalPassengerLastName}
                            onChange={formik.handleChange}
                            // sx={smallScreen?{}:{width:"250px"}}
                            InputProps={{
                              startAdornment:(
                                <InputAdornment position="start">
                                <SvgIcon color='primary' fontSize='medium'>
                                <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                                </SvgIcon>
                                </InputAdornment>
                              )
                            }}
                            // error={seatNumber.length > 1 && formik.touched.additionalPassengerLastName && Boolean(formik.errors.additionalPassengerLastName)}
                            // helperText={formik.touched.additionalPassengerLastName && formik.errors.additionalPassengerLastName}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField
                            id={`additonalPassengerPhoneNumber`}
                            name={'additonalPassengerPhoneNumber'}
                            label={`Optional Phone Number for seat ${seatNumber[seatNumber.length-1]}`}
                            value={formik.values.additonalPassengerPhoneNumber}
                            onChange={formik.handleChange}
                            // sx={smallScreen?{}:{width:"250px"}}
                            InputProps={{
                              startAdornment:(
                                <InputAdornment position="start">
                          <LocalPhoneIcon color='primary' fontSize='large'/>
                          </InputAdornment>
                              )
                            }}
                            // error={seatNumber.length > 1 && formik.touched.additionalPassengerPhoneNumber && Boolean(formik.errors.additionalPassengerPhoneNumber)}
                            // helperText={formik.touched.additionalPassengerPhoneNumber && formik.errors.additionalPassengerPhoneNumber}
                            />
                        </Grid>
           </Grid>
                    </>
                 )
                 }
            </Grid>
            
            <Grid item xs={6}>
            {/* Grid 2 */}
                 <Box sx={{display:'flex',alignItems:'center'}}>
                  <Box sx={{flexGrow:1}}>
                  <DatePicker
           
           disabled
           label="Booking Date"
           value={bookingDate}
           onChange={(newValue) => {
           setBookingDate(newValue);
       }}
       renderInput={(params) => <TextField sx={smallScreen?{}:{maxWidth:'190px',minWidth:'140px'}} fullWidth = {smallScreen} {...params} />}
     />
                  </Box>
                    {
                      !smallScreen&&(
                        <Box>
                      <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                      <Avatar
                    sx={{width:60,height:60}}
                    src={dave} alt="cashier profile pic">

                    </Avatar>
                      </Box>
                        <Box sx={{mt:.5}}>
                        <Typography>
                      {
                        userName?userName:''
                      }
                    </Typography>
                        </Box>
                  </Box>
                      )
                    }
                 </Box>
            < h3>Route information</ h3>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
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
                <Grid item xs={12} md={6} lg={6}>
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
                <Grid item xs={12} md={6} lg={6}>
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
                <Grid item xs={12} md={6} lg={6}>
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
                <Grid item xs={12} md={6} lg={6}>

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
            <Grid item xs={12} md={6} lg={6} sx={{mt:1}}>
                  <Button disabled={!Boolean(schedule?.id)} color = "primary" variant="text" 
                          onClick={handleClickOpenSeatPicker}
                  >
                Choose A Seat
              </Button>
                </Grid>
            </Grid>
            <Box sx={{mt:4}}>
              <Button 
              type="submit"
              // onClick={handlePrint}
              // sx={smallScreen?{}:{
              //      display:'block',
              //      marginLeft: 'auto',
              //      marginRight: 'auto',
              //      width:"200px"
              //    }}
                 > Book Now </Button>
              </Box>
            </Grid>
        </Grid>
        
        </div>
        <SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'Ticket Successfully Booked' />
        {seatPickerOpen&&(<SeatPicker canSelectSeat = {canSelectSeat} completeSeatChoosing = {completeSeatChoosing} selectedSeat = {seatNumber}
         busPlateNo = {scheduleInfo?.assignedBus?allBusses.find((activeBus:any)=>activeBus._id===scheduleInfo?.assignedBus)?.busPlateNo:'x'}
         occupiedSeats={scheduleInfo?.occupiedSitNo} numberOfSeat = {scheduleInfo?.totalNoOfSit} handleSeatChoosing = {handleSeatChoosing} open={seatPickerOpen} handleClose = {handleCloseSeatPickcer}/>)}
         </form>
        </LocalizationProvider>
       
    )
}
