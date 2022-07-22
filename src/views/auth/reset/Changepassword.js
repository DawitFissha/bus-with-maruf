import React, { useState,useRef,useEffect} from 'react';
import { Row, Col, Card, Form} from 'react-bootstrap';
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import {AiOutlineCheckSquare} from "react-icons/ai"
import PersonIcon from '@material-ui/icons/Person';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import CircularProgress from "@material-ui/core/CircularProgress";
import Buttons from "@material-ui/core/Button";
import { useDispatch,useSelector } from 'react-redux';
import { changePassword } from '../../../store/authhttp';
import { errorActions } from '../../../store/error-slice';
import { loadingActions } from '../../../store/loading-slice';
import { SaveSuccessfull } from '../../../Components/common-registration-form/saveSuccess';

const FormsElements = () => {
    const oldPasswordref=useRef() 
    const newPasswordref=useRef()
    const confirmPasswordref=useRef()
    const message=useSelector(state=>state.message.errMessage)
    const loadingStatus=useSelector(state=>state.loading.status)
    console.log(loadingStatus)
    const dispatch=useDispatch()
    useEffect(()=>{
        message==='changed'&&setSaveStatus(true)
        return ()=>{
            message==='changed'&&dispatch(errorActions.Message(''))
        }
        },[message])
    const [saveStatus,setSaveStatus] =useState(false)
    const handleSaveStatusClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSaveStatus(false);
      };
    const ChangeHandler=()=>{
         dispatch(loadingActions.status('pending'))
        const oldPassword=oldPasswordref.current.value
        const newPassword=newPasswordref.current.value
        const confirmPassword=confirmPasswordref.current.value
    if(oldPassword&&newPassword&&confirmPassword)
    {
        if(confirmPassword===newPassword)
        {
            dispatch(changePassword({oldPassword,newPassword}))
        }
        else{
            dispatch(errorActions.Message('Password not match'))
            dispatch(loadingActions.status('error'))
        }}
    else{
        dispatch(errorActions.Message('Please fill all field'))
        dispatch(loadingActions.status('error'))
    }}

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
                                {message!=='changed' && (
                        <Row style={{marginLeft:'30%',marginBottom:'30px'}}>
                        <Col sm={12} style={{alignText:'center',justifyContent:'center'}}>
                        <small style={{alignText:'center',fontSize:"14px"}} className="text-danger form-text">{message}</small>
                        </Col>
                        </Row>)} 
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
                           {loadingStatus!=='pending'?"Submit" :<CircularProgress color='secondary' size={18}/>}
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
