import { WithContext as ReactTags } from 'react-tag-input';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Cancel, Proceed, StyledAiFillCloseCircle } from '../../Components/styled/main.styled'
import Modal from "react-modal";
import { scheduleActions } from '../../store/schedule-slice';
import { cancelShcedule } from '../../store/scheduleHttp';
import { SaveSuccessfull } from '../../Components/common-registration-form/saveSuccess';
import { useCancelShceduleMutation } from '../../store/bus_api';
const customStyles = {
    content: {
      top: '57%',
      left: '58%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex:'100',
      border:'none',
      boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      padding:'0px',
      width:'450px',
      maxHeight:'540px'
    },
  };
Modal.setAppElement("#root");
const CancelForm = () => {
    const dispatch=useDispatch()
    const isModalOpen=useSelector(state=>state.schedule.isModalOpen)
    const ModalData=useSelector(state=>state.schedule.modalData)
const [cancelShcedule,{isSuccess}]=useCancelShceduleMutation()
 const CancelHandler=()=>{
    // console.log(ModalData)
// dispatch(cancelShcedule(ModalData))
cancelShcedule(ModalData)
// dispatch(scheduleActions.setModal(false))
 }
function toggleModal() {
   dispatch(scheduleActions.setModal(false))
 } 
useEffect(()=>{
    if(isSuccess)
    {
      setSaveStatus(true);
      dispatch(scheduleActions.setModal(false))
    }
},[isSuccess])
const [saveStatus,setSaveStatus] =useState(false)
const handleSaveStatusClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSaveStatus(false);
  };
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
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(scheduleActions.setModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body style={{marginLeft:'10%'}}>
                          <div style={{color:"red",textAlign:"ceneter",fontSize:"15px"}}>This Will Remove The Schedule From Ticket Sale Permanently !!! </div>
                         <Row style={{marginLeft:"15px",justifyContent:'start',paddingBottom:"20px",paddingTop:"20px"}}>
                <Col onClick={()=>{dispatch(scheduleActions.setModal(false))}}><Cancel size={60}/></Col>
                <Col onClick={CancelHandler}><Proceed size={60}/></Col>
            
                        </Row>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
           
            </Modal>
            <SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'Schedule canceled' />
        </React.Fragment>
    );
};

export default CancelForm;
