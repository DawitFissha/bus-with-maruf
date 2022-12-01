import { WithContext as ReactTags } from 'react-tag-input';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { StyledAiFillCloseCircle } from '../../Components/styled/main.styled'
import {Button as Buttons,TextField} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "react-modal";
import { Autocomplete} from '@mui/material';
import {modalActions} from '../../store/modal-slice'
// import { addCity, updateCity} from '../../store/cityHttp';
// import { errorActions } from '../../store/error-slice';
// import { loadingActions } from '../../store/loading-slice';
import Alert from '@mui/material/Alert';
import { SaveSuccessfull } from '../../Components/common-registration-form/saveSuccess';
import { useGiveToCasherMutation,useTakeFromCasherMutation } from '../../store/bus_api';
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

const CashForms = ({data}) => {
  console.log(data)
  const {collect,id}=data
  const dispatch=useDispatch()
  const [giveToCasher,{isLoading,isError,error,isSuccess}]=useGiveToCasherMutation()
  const [takeFromCasher,{isLoading:isLoadingt,isError:isErrort,error:errort,isSuccess:isSuccesst}]=useTakeFromCasherMutation()
  const [amount,setAmount]=useState()
  const [isLocalError,setIsLocalError] =useState(false)
  const [localError,setLocalError]=useState('')
  function toggleModal() {
    dispatch(modalActions.setCashModal(false))
  } 
  const isModalOpen=useSelector(state=>state.modal.isCashModalOpen)
  const SubmitHandler=()=>{
    setIsLocalError(false)
      setLocalError('')
    if(amount)
    {
     collect&&takeFromCasher({amount:amount,id})
     !collect&&giveToCasher({amount:amount,id})
     setAmount('')
    }
    else{
      setIsLocalError(true)
      setLocalError('please fill all field')
    }
  }
  useEffect(()=>{
    if(isSuccess||isSuccesst)
    {
      setSaveStatus(true)
      dispatch(modalActions.setCashModal(false))
    }
    },[isSuccess,isSuccesst])
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
                            <Card.Title as="h5">Manage Cash</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{
                              setIsLocalError(false)
                              dispatch(modalActions.setCashModal(false))
                              }} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body style={{marginLeft:'10%'}}>
                          {collect?<h5>Collect Cash</h5>:<h5>Lend Cash</h5>} 
                          {isLocalError&&<Alert style={{marginLeft:'-10%',marginTop:'10px',marginBottom:'10px'}} severity="error">{localError}</Alert>}          
                        {!isLocalError&&isError&&!collect&&<Alert style={{marginLeft:'-10%',marginTop:'10px',marginBottom:'10px'}} severity="error">{error.data?.message||"connecion error"}</Alert>}  
                        {!isLocalError&&isErrort&&collect&&<Alert style={{marginLeft:'-10%',marginTop:'10px',marginBottom:'10px'}} severity="error">{errort.data?.message||"connecion error"}</Alert>}  
                           <Row style={{marginRight:'10%',marginTop:'20px'}}>
                           <TextField
                                value={amount}
                                required
                                onChange={(e)=>setAmount(e.target.value)}
                                id="outlined-required"
                                label="Amount in Br"
                                type="number"
                                defaultValue="Hello World"
                              />
                           </Row>

                             <Col style={{marginBottom:'50px',marginTop:'20px',marginLeft:"-26px"}}>
                            <Buttons 
                                onClick={SubmitHandler}
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="primary">
                                {!collect&&(!isLoading?"Lend" :<CircularProgress color='secondary'/>)}
                                {collect&&(!isLoadingt?"Collect" :<CircularProgress color='secondary'/>)}
                           </Buttons> 
                           </Col> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Modal>
        {!collect&&isSuccess&&<SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'cash lend' />}
         {collect&&isSuccesst&&<SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'cash collected' />}
        </React.Fragment>
    );
};

export default CashForms;
