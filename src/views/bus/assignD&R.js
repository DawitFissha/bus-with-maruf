// import { WithContext as ReactTags } from 'react-tag-input';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { StyledAiFillCloseCircle } from '../../Components/styled/main.styled'
import Buttons from "@mui/material/Button";
import Modal from "react-modal";
import { busActions } from '../../store/bus-slice';
import {Alert, AlertTitle, InputAdornment, ListItemText } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {FormWrapper} from '../../Components/common-registration-form/formWrapper'
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import axios_instance from '../../services/lib-config';
import CircularProgress from '@mui/material/CircularProgress';
// import { updateBus, updateBusw } from '../../store/busHttp';
// import { loadingActions } from '../../store/loading-slice';
import { useUpdateBuswMutation,useLazyGetAssignedUserByRoleWitheditQuery } from '../../store/bus_api';
import { SaveSuccessfull } from '../../Components/common-registration-form/saveSuccess';

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
const Assign = ({info}) => {
    const dispatch=useDispatch()
    // const loadingStatus=useSelector(state=>state.loading.status)
    // const message=useSelector(state=>state.message.errMessage)
    const [driver, setDriver] = useState();
    const [redat, setRedat] = useState();
    const [driverList,setDriverList]=useState()
    const [redatList,setRedatList]=useState()
    const [updateBusw,{data,isError,error,isSuccess,isLoading}]=useUpdateBuswMutation()
    const [trigger,{data:userData}]=useLazyGetOrganizationByCodeQuery()
    const handleDriverChange = (e)=>{
      console.log(e.target.value)
        setDriver(e.target.value)
        // setDriverRequired('')
        }
     const handleRedatChange = (e)=>{
        setRedat(e.target.value)
        // setRedatRequired('')
     }
const [saveStatus,setSaveStatus] =useState(false)
const handleSaveStatusClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSaveStatus(false);
  };
const isModalOpen=useSelector(state=>state.bus.isModalOpen)

function toggleModal() {
dispatch(busActions.setModal(false))
} 
useEffect(()=>{
isSuccess&&dispatch(busActions.setModal(false))
isSuccess&&setSaveStatus(true);
},[isSuccess])

useEffect(()=>{
  if(isModalOpen)
  {
    setDriver(info?.driverId)
    setRedat(info?.redatId)
// const getUser=async(role,current)=>{
//   let query={}
  !!role?query.role=role:query=query
  !!current?query.current=current:query=query
  trigger(info?.driverId)
// const user=await axios_instance.get(`getuserwithedit`,{params:{...query}})
// role==="driver"&&setDriverList(user.data)
// role==="redat"&&setRedatList(user.data)
// }
// getUser("driver",info?.driverId)
// getUser("redat",info?.redatId)

}

},[info])
useEffect(()=>{
  if(userData){
    role==="driver"&&setDriverList(userData)
    role==="redat"&&setRedatList(userData)
  }
},[userData])
const UpdateHandler=()=>{
  // dispatch(loadingActions.status("pending"))
  updateBusw({id:info._id,driverId:driver,redatId:redat})
  // dispatch(updateBusw(info._id,{driverId:driver,redatId:redat}))
}

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
                            <Card.Title as="h5">Bus</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(busActions.setModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body >
                          <h5 style={{marginBottom:'20px'}}>Change Driver And Redat</h5>
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

     {  
        driverList?.map((driver)=>(
          <MenuItem divider = {true} key = {driver._id} value={driver._id}>
              <ListItemText primary = {`${driver.firstName} ${driver.lastName}`}/>
          </MenuItem>
        ))
        }
      </Select>

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
        {
        redatList?.map((redat)=>(
          <MenuItem divider = {true} key = {redat._id} value={redat._id}>
            <ListItemText primary = {`${redat.firstName} ${redat.lastName}`}/>
          </MenuItem>
        ))
        }
      </Select>
      </FormControl>
        </FormWrapper>
                                        
                            <Row style={{justifyContent:'center',margin:'20px 1px'}}>                            <Buttons 
                                style={{width:'250px'}}
                                onClick={UpdateHandler}
                                type="submit"
                                variant="contained"
                                color="primary">
                                {!isLoading?"Update Info" :<CircularProgress color='secondary'/>}
                           </Buttons> 
                           </Row> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Modal>
            <SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'Bus Info Changed Successfully' />
        </React.Fragment>
    );
};

export default Assign ;
