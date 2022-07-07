import React,{useRef} from 'react';
import { Row, Col, Card, Table,Button } from 'react-bootstrap';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import MailIcon from '@material-ui/icons/Mail';
import TextField from "@material-ui/core/TextField";
import PublishIcon from '@material-ui/icons/Publish';
import Avatar from '@material-ui/core/Avatar';


const CODDetail = () => {
    const detail=[{},{},{}]
    const fileref=useRef()
    return (
        <React.Fragment>
            <Row >
                <Col xl={10}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">COD Balance</Card.Title>
                            <span className="d-block m-t-5">
                            </span>
                        </Card.Header>
                        <Card.Body>
                        <Col style={{fontSize:'20px',marginBottom:'20px',marginTop:'20px'}}>Detail</Col>

                            <Row style={{marginBottom:'20px'}}>
                          <Col style={{marginBottom:'20px', marginLeft:'10px'}}>
                            <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Driver ID: 12612</span></Col>
                            
                          <Col style={{marginBottom:'20px', marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Driver COD Balance:12656</span></Col>
                          <Col style={{marginBottom:'20px', marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Register Date:3-23-2022</span></Col>
                          </Row>
                          <Row style={{marginBottom:'20px'}}>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Date:3-27-2022</span></Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Driver Phone</span></Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Other Field1</span></Col>
                          </Row>
                          <Row style={{marginBottom:'20px'}}>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Deliverd Date:3-27-2022</span></Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Driver Phone</span></Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Other Field1</span></Col>
                          </Row>
                          <Row style={{marginBottom:'20px'}}>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Deliverd Date:3-27-2022</span></Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Driver Phone</span></Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Other Field1</span></Col>
                          </Row>
                          
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
        </React.Fragment>
    );
};

export default CODDetail;



   