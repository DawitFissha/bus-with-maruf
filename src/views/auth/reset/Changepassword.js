import React, { useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Form} from 'react-bootstrap';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import {AiOutlineCheckSquare} from "react-icons/ai"
import PersonIcon from '@mui/icons-material/Person';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import CircularProgress from "@mui/material/CircularProgress";
import Buttons from "@mui/material/Button";
import { SaveSuccessfull } from '../../../Components/common-registration-form/saveSuccess';
import Alert from '@mui/material/Alert';
import { useChangePasswordMutation } from '../../../store/bus_api';
const FormsElements = () => {
    const oldPasswordref=useRef() 
    const newPasswordref=useRef()
    const confirmPasswordref=useRef()
    const [isLocalError,setIsLocalError] =useState(false)
    const [localError,setLocalError]=useState('')
    const [saveStatus,setSaveStatus] =useState(false)
    const handleSaveStatusClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSaveStatus(false);
      };
      const [changePassword,{isLoading,isSuccess,isError,error}]=useChangePasswordMutation()
    const ChangeHandler=()=>{
      setIsLocalError(false)
      setLocalError('')
        const oldPassword=oldPasswordref.current.value
        const newPassword=newPasswordref.current.value
        const confirmPassword=confirmPasswordref.current.value
    if(oldPassword&&newPassword&&confirmPassword)
    {
        if(confirmPassword===newPassword)
        {
          changePassword({oldPassword,newPassword})
        }
        else{
          setIsLocalError(true)
         setLocalError('Password not match')
        }}
    else{
      setIsLocalError(true)
      setLocalError('Please fill all field')
    }}
  useEffect(()=>{
  if(isSuccess)
  {
  setSaveStatus(true)
  }
  },[isSuccess])
    return (
        <React.Fragment>
            <Row>
                <Col xl={10} sm={12} lg={10} md={10}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Change Password</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row style={{marginBottom:"60px"}}>
                                <Col style={{marginLeft:"30px"}}>
                                <h3 style={{marginBottom:"30px"}}>Change Password</h3>
                                <h5><AiOutlineCheckSquare size={20}/>Password must be atleast five charcter</h5>
                                </Col>
                                <Col md={5} style={{margin:'auto'}}>
                        {isLocalError&&<Alert style={{marginTop:'10px',marginBottom:'20px'}} severity="error">{localError}</Alert>}          
                        {!isLocalError&&isError&&<Alert style={{marginTop:'10px',marginBottom:'20px'}} severity="error">{error.data?.message}</Alert>} 
                                
                                        <Form.Group style={{marginBottom:'30px'}} controlId="formBasicEmail">
                                        <TextField
                                            type='password' 
                                            variant='outlined'
                                            label="Old Password"
                                            fullWidth
                                            inputRef={oldPasswordref}
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <PersonIcon color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                        />
                                        </Form.Group>
                                        <Form.Group style={{marginBottom:'30px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='password' 
                                            variant='outlined'
                                            label="New Password"
                                            required
                                            fullWidth
                                            inputRef={newPasswordref}
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <EnhancedEncryptionIcon color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                        />
                                        </Form.Group>
                                        <Form.Group style={{marginBottom:'30px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='password' 
                                            variant='outlined'
                                            label="Confirm password"
                                            fullWidth
                                            required
                                            inputRef={confirmPasswordref}
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <EnhancedEncryptionIcon color='rgb(26 17 17 / 56%)' size={20} />
                                                  </InputAdornment>
                                                ),
                                              }}
                                        />
                                        </Form.Group> 
                                           
                                        <Buttons
                            type="submit"
                            onClick={ChangeHandler}
                            fullWidth
                            variant="contained"
                            color="primary">
                           {!isLoading?"Submit" :<CircularProgress color='secondary' size={18}/>}
                           </Buttons>
                               
                                </Col>
                            
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'Password Successfully Changed' />
        </React.Fragment>
    );
};

export default FormsElements;
