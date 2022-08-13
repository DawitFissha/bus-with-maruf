import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { StyledAiFillCloseCircle } from '../../Components/styled/main.styled'
import Buttons from "@mui/material/Button";
import Modal from "react-modal";
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import {Alert, AlertTitle, InputAdornment, ListItemText } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getActiveBus, getAllDepPlace} from '../../store/routeHttp';
import { updateScheduleBusAndPlace } from '../../store/scheduleHttp';
import {FormWrapper} from '../../Components/common-registration-form/formWrapper'
import CircularProgress from '@mui/material/CircularProgress';
import { updateBus, updateBusw } from '../../store/busHttp';
import { loadingActions } from '../../store/loading-slice';
import { routeActions } from '../../store/route-slice';
import SvgIcon from '@mui/material/SvgIcon';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { scheduleActions } from '../../store/schedule-slice';
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
const AssignBus = () => {
    const dispatch=useDispatch()
    const loadingStatus=useSelector(state=>state.loading.status)
    const busdata=useSelector(state=>state.route.busData)
    console.log(busdata)
    const ActiveBusses=busdata?.map(o => ({ ...o }));
    const depdata=useSelector(state=>state.route.depData)
    const depPlace=depdata?.map(o => ({ ...o }));
    console.log(ActiveBusses)
    const message=useSelector(state=>state.message.errMessage)
    const [departPlace, setDepartPlace] = useState('');
    const [assignedBus, setAssignedBus] = useState('');
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
    const handleAssignedBusChange = (event) => {
      console.log(event.target.value)
      const {target: { value }} = event;
      setAssignedBus(value);
    };
    const handlePlaceChange = (event) => {
      console.log(event.target.value)
      const {target: { value }} = event;
      setDepartPlace(value);
    };
const ModalData=useSelector(state=>state.schedule.modalData)
const isModalOpen=useSelector(state=>state.schedule.isBusModalOpen)
function toggleModal() {
dispatch(scheduleActions.setBusModal(false))
} 
console.log(ModalData)
useEffect(()=>{
  if(isModalOpen)
  {
    console.log(ModalData)
    ModalData?.departurePlace&&setDepartPlace(ModalData?.departurePlace)
    ModalData?.bus&&setAssignedBus(ModalData?.bus)
    dispatch(getActiveBus())
    dispatch(getAllDepPlace(ModalData.source))
  }

},[ModalData])
const UpdateHandler=()=>{
  dispatch(loadingActions.status("pending"))
  console.log(assignedBus)
  console.log(departPlace)
  dispatch(updateScheduleBusAndPlace(ModalData._id,{bus:assignedBus,departureplace:departPlace}))
}
// console.log(depPlace.departurePlace)
    return (
        <React.Fragment>
        <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyles}>
            <Row style={{margin:'0px',padding:'0px',alignItems:'center'}}>
                <Col style={{margin:'0px',padding:'0px',width:'100%'}} xl={12} sm={12} lg={12} md={12}>
                    <Card style={{margin:'0px',padding:'0px'}}>
                        <Card.Header>
                            <Card.Title as="h5">Schedule</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(scheduleActions.setBusModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body >
                          <h4 style={{marginBottom:'20px'}}>From <span style={{fontWeight:'bold',fontSize:'h4'}}>{ModalData?.source}</span> To <span style={{fontWeight:'bold',fontSize:'h4'}}>{ModalData?.destination}</span></h4>
                    <FormWrapper>
          <FormControl sx={{width:'100%' }}>
          <InputLabel id="driver-select-label">Bus</InputLabel>
      <Select
        labelId="driver-select-label"
        id="driver-select-helper"
        name="bus"
        value={assignedBus}
        input={<OutlinedInput id="assignBus-multiple-chip" label="Assign Bus" />}
        renderValue={(selected)=>{
          return ActiveBusses?.find(ab=>ab._id===selected)?.busPlateNo
        }}
        MenuProps={MenuProps}
        onChange={handleAssignedBusChange}
        startAdornment={ <InputAdornment position="start">
        <DirectionsBusIcon color="primary" fontSize='large'/>
        </InputAdornment>}
      >
        {    
          ActiveBusses?
          ActiveBusses.map((activeBus) => (
            <MenuItem
              key={activeBus._id}
              value = {activeBus._id}
              >
              <ListItemText primary={activeBus.busPlateNo} />
            </MenuItem>
          )):null
          }
      </Select>

      </FormControl>
        </FormWrapper>
        <FormWrapper>
          <FormControl sx={{width: "100%" }}>
          <InputLabel id="redat-select-helper-label">Departure Place</InputLabel>
      <Select
        labelId="redat-select-helper-label"
        id="redat-select"
        name="departurePlace"
        input={<OutlinedInput id="depPlace-multiple-chip" label="Departure Place" />}
        value = {departPlace}
        MenuProps={MenuProps}
        onChange={handlePlaceChange}
        startAdornment={<InputAdornment position="start">
        <SvgIcon color="primary" style={{fontSize:"35px"}}>
              <path fill="currentColor" d="M22 7V16C22 16.71 21.62 17.36 21 17.72V19.25C21 19.66 20.66 20 20.25 20H19.75C19.34 20 19 19.66 19 19.25V18H12V19.25C12 19.66 11.66 20 11.25 20H10.75C10.34 20 10 19.66 10 19.25V17.72C9.39 17.36 9 16.71 9 16V7C9 4 12 4 15.5 4S22 4 22 7M13 15C13 14.45 12.55 14 12 14S11 14.45 11 15 11.45 16 12 16 13 15.55 13 15M20 15C20 14.45 19.55 14 19 14S18 14.45 18 15 18.45 16 19 16 20 15.55 20 15M20 7H11V11H20V7M7 9.5C6.97 8.12 5.83 7 4.45 7.05C3.07 7.08 1.97 8.22 2 9.6C2.03 10.77 2.86 11.77 4 12V20H5V12C6.18 11.76 7 10.71 7 9.5Z" />
        </SvgIcon>
      </InputAdornment>}
      >
      {    
        depPlace?
          depPlace[0]?.departurePlace.map((place) => (
            <MenuItem
              key={place}
              value = {place}
              >
              <ListItemText primary={place} />
            </MenuItem>
          )):null
          }
      </Select>
      </FormControl>
        </FormWrapper>

        <Row style={{justifyContent:'center',margin:'20px 1px'}}><Buttons 
            style={{width:'250px'}}
            onClick={UpdateHandler}
            type="submit"
            variant="contained"
            color="primary">
            {loadingStatus!=='pending'?"Update Info" :<CircularProgress color='secondary'/>}
        </Buttons> 
        </Row> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Modal>
        </React.Fragment>
    );
};

export default AssignBus ;
