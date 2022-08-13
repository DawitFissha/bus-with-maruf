import { WithContext as ReactTags } from 'react-tag-input';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { StyledAiFillCloseCircle } from '../../Components/styled/main.styled'
import TextField from "@mui/material/TextField";
import Buttons from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "react-modal";
import {userActions} from '../../store/user-slice'
import { errorActions } from '../../store/error-slice';
import { resetPassword } from '../../store/userHttp';
import { loadingActions } from '../../store/loading-slice';

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
      maxHeight:'640px'
    },
  };
Modal.setAppElement("#root");

const FormsReset = ({id}) => {
    const dispatch=useDispatch()
    const loadingStatus=useSelector(state=>state.loading.status)
    const message=useSelector(state=>state.message.errMessage)
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();


const PasswordResetHandler=()=>{
if(password&&confirmPassword)
{  
    if(password===confirmPassword)
    {
        dispatch(errorActions.Message(''))
        dispatch(loadingActions.status("pending"))
        dispatch(resetPassword({id,password,confirmPassword}))
    }
    else
    {
        dispatch(errorActions.Message('password must match'))
    }
  
}
else
{
    dispatch(errorActions.Message('please fill all field'))
}
}
// const profile=useSelector(state=>state.userinfo)
const isModalOpen=useSelector(state=>state.userlist.isModalOpen)
console.log(isModalOpen)
function toggleModal() {
    console.log("close")
    dispatch(userActions.setModal(false))
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
                            <Card.Title as="h5">Reset Password</Card.Title>
                            <StyledAiFillCloseCircle onClick={()=>{dispatch(userActions.setModal(false))}} style={{float:'right'}} fontSize={30} color='red'/>
                        </Card.Header>
                        <Card.Body style={{marginLeft:'10%'}}>
                         <h5>Reset To Temporary Password</h5>
                        <small>this password must be changed in 24 hour by the user</small>
                        {message!=='password reset' && (
                            <Row>
                            <Col sm={12} style={{alignText:'center',justifyContent:'center'}}>
                            <small style={{alignText:'center'}} className="text-danger form-text">{message}</small>
                            </Col>
                            </Row>
                        )} 
                    
                        <Row style={{justifyContent:'start'}}>
                         <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicEmail">
                                        <TextField
                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)}
                                            type='password' 
                                            variant='outlined'
                                            label="Temporary Password"
                                            style={{width:"300px"}}
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>  
                                   </Row>
                                   <Row style={{justifyContent:'start'}}>
                         <Form.Group style={{marginLeft:'10px',marginTop:'15px'}} controlId="formBasicEmail">
                                        <TextField
                                            value={confirmPassword}
                                            onChange={(e)=>setConfirmPassword(e.target.value)}
                                            type='password' 
                                            variant='outlined'
                                            label="Confirm Password"
                                            style={{width:"300px"}}
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}></div>
                                        </Form.Group>  
                                   </Row>
                                  
                             <Col style={{marginBottom:'50px',marginTop:'20px',marginLeft:"-26px"}}>
                            <Buttons 
                                onClick={PasswordResetHandler}
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="primary">
                                {loadingStatus!=='pending'?"Reset Password" :<CircularProgress color='secondary'/>}
                           </Buttons> 
                           </Col> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Modal>
        </React.Fragment>
    );
};

export default FormsReset;
