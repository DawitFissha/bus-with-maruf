import React,{useRef} from 'react';
import { Row, Col, Card, Table,Button } from 'react-bootstrap';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import TextField from "@material-ui/core/TextField";
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from "@material-ui/core/CircularProgress";
import Buttons from "@material-ui/core/Button";
import { StyledImg } from '../../components/styled/main.styled';
const Profile = () => {
    const fileref=useRef()
    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={4} >
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Profile</Card.Title>
                            <span className="d-block m-t-5">
                            </span>
                        </Card.Header>
                        <Card.Body>
                          <Col style={{fontSize:'20px',marginBottom:'20px'}}>Account Detail</Col>
                          <Col style={{marginBottom:'20px', marginLeft:'10px'}}>
                              <PersonIcon/><span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>marufbelete</span></Col>
                          <Col style={{marginBottom:'20px', marginLeft:'10px'}}>
                          <WorkIcon/><span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>Driver</span></Col>
                          <Col style={{marginBottom:'20px', marginLeft:'10px'}}>
                          <DeviceHubIcon/><span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>23412</span></Col>
                          <Col style={{fontSize:'20px',marginBottom:'20px'}}>Contact Detail</Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <LocalPhoneIcon/><span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>0945913839</span></Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <MailIcon/><span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>beletemaruf@gmail.com</span></Col>
                          <Col style={{marginBottom:'20px',marginLeft:'10px'}}>
                          <LocationOnIcon/><span style={{verticalAlign:'middle',paddingLeft:'7px',fontWeight:'bold'}}>22 st</span></Col>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={8} >
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Edit Profile</Card.Title>
                            <span className="d-block m-t-5">
                            </span>
                        </Card.Header>
                        <Card.Body>
                            <Col md={12} xl={10}>
                                <Col style={{marginBottom:'15px'}}>         
                            <input style={{display:'none'}} ref={fileref} type="file"/>
                            <StyledImg>
                            <Avatar onClick={()=>fileref.current.click()} style={{width:'70px',height:'70px',margin:'auto',':hover': { cursor: "pointer"}}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </StyledImg>
                            </Col>
                            <Col style={{marginBottom:'20px'}}>
                            <TextField
                                type='text' 
                                variant='outlined'
                                label="User name"
                                fullWidth
                                required
                                defaultValue={'username'}
                            />
                            </Col>
                            <Col style={{marginBottom:'20px'}}>
                            <TextField
                                type='text' 
                                variant='outlined'
                                label="Full Name"
                                fullWidth
                                required
                                defaultValue={'fullname'}
                            />
                            </Col>
                            <Col style={{marginBottom:'20px'}}>
                            <TextField
                                type='text' 
                                variant='outlined'
                                label="Email"
                                fullWidth
                                required
                                defaultValue={'Email'}
                            />
                            </Col>
                            <Col style={{marginBottom:'20px'}}>
                            <TextField
                                type='text' 
                                variant='outlined'
                                label="Address"
                                fullWidth
                                required
                                defaultValue={'Address'}
                            />
                            </Col>
                            <Col style={{marginBottom:'20px'}}>
                            <TextField
                                type='text' 
                                variant='outlined'
                                label="Phone"
                                fullWidth
                                required
                                defaultValue={'phone'}
                            />
                            </Col>
                            <Col>
                            <Buttons
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                        {'pendin'!=='pending'?"Update Info" :<CircularProgress color='secondary' size={18}/>}
                           </Buttons>
                            </Col>
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Profile;



   
// import { useEffect,useRef, useState } from 'react';
// import { motion,animate} from 'framer-motion';
// import { ReportCanvas } from '../styled/report.styled';
// import { animatinoA } from '../animation/animation';
// import {CounterStyle,Plus} from '../styled/report.styled'
// export default function Counter({count}) {
//   const [done,setDone] =useState(false)
//     const ref = useRef();
//     useEffect(() => {
//       const controls = animate(count.from, count.to, {
//         duration: 5,
//         onUpdate(value) {
//           ref.current.textContent = value.toFixed(0);
//         }
//       });
//       setTimeout(function(){setDone(true)},5000)
//       return () => controls.stop()
      
//     }, [count.from, count.to]);
//     return(
//       <>
//           <ReportCanvas as={motion.div}
//           variants={animatinoA}
//           initial="from"
//           animate="to"
//           whileHover="hover">
//               <CounterStyle ref={ref}> </CounterStyle>{done&&<Plus>+</Plus>}
//       </ReportCanvas>
//       </>
//   )
   
//   }