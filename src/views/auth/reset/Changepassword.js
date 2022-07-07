import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select, { SelectChangeEvent } from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import FormControls from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";
import PersonIcon from '@material-ui/icons/Person';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import CircularProgress from "@material-ui/core/CircularProgress";
import Buttons from "@material-ui/core/Button";
const FormsElements = () => {
   const [value,setValue]= useState()
    const [validated, setValidated] = useState(false);
    const [validatedTooltip, setValidatedTooltip] = useState(false);
    const [supportedCheckbox, setSupportedCheckbox] = useState(false);
    const [supportedRadio, setSupportedRadio] = useState(false);
    const [supportedSelect, setSupportedSelect] = useState(0);
    const [supportedFile, setSupportedFile] = useState(0);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const handleSubmitTooltip = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidatedTooltip(true);
    };

    const supportedSelectHandler = (event) => {
        setSupportedSelect(parseInt(event.target.value));
    };

    const supportedFileHandler = (event) => {
        setSupportedFile(!!event.target.value);
    };

    return (
        <React.Fragment>
            <Row>
                <Col xl={10} sm={12} lg={10} md={10}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Change Password</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6} style={{margin:'auto'}}>
                                        <Form.Group style={{marginBottom:'30px'}} controlId="formBasicEmail">
                                        <TextField
                                            type='password' 
                                            variant='outlined'
                                            label="Old Password"
                                            fullWidth
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'15px',
                                            color:'#038FCF'}}><PersonIcon/></div>
                                        </Form.Group>
                                        <Form.Group style={{marginBottom:'30px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='password' 
                                            variant='outlined'
                                            label="New Password"
                                            required
                                            fullWidth
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'100px',
                                            color:'#038FCF'}}><EnhancedEncryptionIcon/></div>
                                        </Form.Group>
                                        <Form.Group style={{marginBottom:'30px'}} controlId="formBasicPassword">
                                        <TextField
                                            type='password' 
                                            variant='outlined'
                                            label="Confirm password"
                                            fullWidth
                                            required
                                        /><div
                                        style={{position:'absolute',
                                            display:'inline-flex',
                                            right:'22px',
                                            top:'187px',
                                            color:'#038FCF'}}><EnhancedEncryptionIcon/></div>
                                        </Form.Group> 
                                           
                                        <Buttons
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                           {'pendin'!=='pending'?"Submit" :<CircularProgress color='secondary' size={18}/>}
                           </Buttons>
                               
                                </Col>
                            
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default FormsElements;
