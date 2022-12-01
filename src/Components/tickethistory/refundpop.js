import { WithContext as ReactTags } from 'react-tag-input';
import React, { useEffect,useState } from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Cancel, Proceed, StyledAiFillCloseCircle } from '../styled/main.styled'
import Modal from "react-modal";
import { modalActions } from '../../store/modal-slice';
import CircularProgress from "@mui/material/CircularProgress";
import { SaveSuccessfull } from '../common-registration-form/saveSuccess';
import { useRefundTicketMutation } from '../../store/bus_api';
import { TextField,Button,Alert } from '@mui/material';
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
    const dispatch=useDispatch()
    const isModalOpen=useSelector(state=>state.modal.isRefundModalOpen)
    const ModalData=useSelector(state=>state.modal.refundModalData)
    const [confirmation,setConfirmation]=useState()
    const [isLocalError,setIsLocalError] =useState(false)
    const [localError,setLocalError]=useState('')
    const [refundTicket,{isSuccess,isLoading,isError,error}]=useRefundTicketMutation()
 const ConfirmHandler=()=>{
    setIsLocalError(false)
    setLocalError('')
    if(confirmation){
        if(String(confirmation).length!=6)
        {
        setIsLocalError(true)
        setLocalError('should be 6 digit')
        }
        else{
            refundTicket({...ModalData,confirmationNumber:confirmation})
        } 
    }
    else{
        setIsLocalError(true)
        setLocalError('please fill all field')
    }
    }
useEffect(()=>{
    if(isSuccess)
    {
      setSaveStatus(true)
      setConfirmation('')
      dispatch(modalActions.setRefundModal(false))
    }
},[isSuccess])

function toggleModal() {
   dispatch(modalActions.setModal(false))
   setIsLocalError(false)
   setLocalError('')
   setConfirmation('')
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
            <Row style={{margin:'0px',padding:'0px'}}>
                <Col style={{margin:'0px',padding:'0px',width:'100%'}} xl={12} sm={12} lg={12} md={12}>
                    <Card style={{margin:'0px',padding:'0px'}}>
                        <Card.Header>
                            <Card.Title as="h5">Ticket Refund</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{
                                setIsLocalError(false)
                                setLocalError('')
                                setConfirmation('')
                                dispatch(modalActions.setRefundModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body style={{marginLeft:'10%'}}>
                        {isLocalError&&<Alert style={{marginLeft:'-10%',marginTop:'10px',textAlign:'start',marginBottom:'10px'}} severity="error">{localError}</Alert>}          
                        {!isLocalError&&isError&&<Alert style={{marginTop:'10px',marginBottom:'10px'}} severity="error">{error.data?.message||"connecion error"}</Alert>} 
                        <div style={{color:"brown",textAlign:'start',fontSize:"14px"}}>Notice: You are going to make refund 
                        <span style={{fontSize:"15px",color:"red"}}> {Number(orgRule?.rulesAndRegulation?.returnPercent)*Number(refund?.tarif)*0.01} Birr 
                        </span> 
                        </div>
                        <Row style={{marginRight:'10%',marginTop:'20px'}}>
                           <TextField
                                value={confirmation}
                                required
                                onChange={(e)=>setConfirmation(e.target.value)}
                                id="outlined-required"
                                label="Confirmation Number"
                                type="number"
                                defaultValue="confirmation"
                              />
                           </Row>
                           <Col style={{marginBottom:'50px',marginTop:'20px',marginLeft:"-26px"}}>
                            <Button 
                                onClick={ConfirmHandler}
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="primary">
                                {!isLoading?"Confirm" :<CircularProgress color='secondary'/>}
                           </Button> 
                           </Col> 
                         {/* <Row style={{marginLeft:"15px",justifyContent:'start',paddingBottom:"20px",paddingTop:"20px"}}>
                <Col onClick={()=>{dispatch(modalActions.setModal(false))}}><Cancel size={60}/></Col>
                <Col onClick={CancelHandler}><Proceed size={60}/></Col>
            
                        </Row> */}
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
