import { WithContext as ReactTags } from 'react-tag-input';
import React, { useEffect,useState } from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Cancel, Proceed, StyledAiFillCloseCircle } from '../styled/main.styled'
import Modal from "react-modal";
import { scheduleActions } from '../../store/schedule-slice';
// import {refundTicket} from '../../store/scheduleHttp';
import { SaveSuccessfull } from '../common-registration-form/saveSuccess';
import { useRefundTicketMutation } from '../../store/bus_api';
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
const RefundForm = ({refund,orgRule}) => {
    // console.log(refund,orgRule)
    // console.log(orgRule?.returnPercent,refund.tarif)
    const dispatch=useDispatch()
    const isModalOpen=useSelector(state=>state.schedule.isModalOpen)
    const ModalData=useSelector(state=>state.schedule.modalData)
    // console.log(ModalData)
    const [refundTicket,{isSuccess,isLoading}]=useRefundTicketMutation()
 const CancelHandler=()=>{
refundTicket(ModalData)
// dispatch(scheduleActions.setModal(false))
 }
useEffect(()=>{
    if(isSuccess)
    {
      setSaveStatus(true)
      dispatch(scheduleActions.setModal(false))
    }
},[isSuccess])

function toggleModal() {
   dispatch(scheduleActions.setModal(false))
 } 
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
                            <Card.Title as="h5">Ticket Refund</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(scheduleActions.setModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body style={{marginLeft:'10%'}}>
                          <div style={{color:"brown",textAlign:"ceneter",fontSize:"17px"}}>You are going to make refund <span style={{fontSize:"20px",color:"red"}}>{Number(orgRule?.rulesAndRegulation?.returnPercent)*Number(refund?.tarif)*0.01} Birr </span> are you sure you want to continue <span style={{fontSize:"20px",color:"red"}}>?</span></div>
                         <Row style={{marginLeft:"15px",justifyContent:'start',paddingBottom:"20px",paddingTop:"20px"}}>
                <Col onClick={()=>{dispatch(scheduleActions.setModal(false))}}><Cancel size={60}/></Col>
                <Col onClick={CancelHandler}><Proceed size={60}/></Col>
            
                        </Row>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
            </Modal>
            <SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'Ticket Refunded Successfully' />
        </React.Fragment>
    );
};

export default RefundForm;
