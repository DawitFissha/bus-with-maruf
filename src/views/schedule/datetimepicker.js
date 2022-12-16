// import { WithContext as ReactTags } from 'react-tag-input';
import React, { useEffect, useRef, useState } from 'react';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CircularProgress from '@mui/material/CircularProgress';
import { Row, Col, Card, InputGroup, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import { useUpdateDepartureDateTimeMutation } from '../../store/bus_api';
import { SaveSuccessfull } from '../../Components/common-registration-form/saveSuccess';
import {Button,TextField,Grid,InputAdornment} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { scheduleActions } from '../../store/schedule-slice';
import {FormWrapper} from '../../Components/common-registration-form/formWrapper'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Modal from "react-modal";
import { StyledAiFillCloseCircle } from '../../Components/styled/main.styled'

const customStyles = {
    content: {
      top: '55%',
      left: '58%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex:'100',
      border:'none',
      boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      padding:'0px',
      width:'450px',
      maxHeight:'640px'
    },
  };
Modal.setAppElement("#root");
const Datetimepicker = ({Datetime}) => {
    const dispatch=useDispatch()
    const [departureDate,setDepartureDate] = useState(null)
    const [saveStatus,setSaveStatus] =useState(false)

const [updateDepartureDateTime,{isSuccess,isLoading}]=useUpdateDepartureDateTimeMutation()
const isModalOpen=useSelector(state=>state.schedule.isDatepickerModalOpen)
const UpdateHandler=()=>{
  updateDepartureDateTime({id:Datetime._id,departureDateAndTime:departureDate})
}
function toggleModal() {
dispatch(scheduleActions.setDatepickerModal(false))
} 
useEffect(()=>{
isSuccess&&dispatch(scheduleActions.setDatepickerModal(false))
isSuccess&&setSaveStatus(true);
},[isSuccess])

useEffect(()=>{
  if(isModalOpen)
  {
  setDepartureDate(Datetime.departureDateAndTime)
}
},[Datetime])

const handleSaveStatusClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSaveStatus(false);
  };
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyles}>
            <Row style={{margin:'0px',padding:'0px',alignItems:'center'}}>
                <Col style={{margin:'0px',padding:'0px',width:'100%'}} xl={12} sm={12} lg={12} md={12}>
                    <Card style={{margin:'0px',padding:'0px'}}>
                        <Card.Header>
                            <Card.Title as="h5">Bus</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(scheduleActions.setDatepickerModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body >
                          <h5 style={{marginBottom:'20px'}}>update departure date time time</h5>
                    <FormWrapper>
          <Grid item md={6} xs={12}>
            <DateTimePicker
            label="Departure Date Time"
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
        </Grid>

        </FormWrapper>
                                        
      <Row style={{justifyContent:'center',margin:'20px 1px'}}>                            
      <Button
          style={{width:'250px'}}
          onClick={UpdateHandler}
          type="submit"
          variant="contained"
          color="primary">
          {!isLoading?"Update Info" :<CircularProgress color='secondary'/>}
      </Button> 
      </Row> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Modal>
            <SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} 
            message = 'Departure Date Changed Successfully' />
            </LocalizationProvider>

    );
};

export default Datetimepicker ;
