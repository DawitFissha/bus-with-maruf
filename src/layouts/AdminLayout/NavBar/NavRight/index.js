import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Dropdown,Col } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ChatList from './ChatList';
import { loginActions } from '../../../../store/login-slice';
import avatar1 from '../../../../assets/images/user/avatar-2.jpg';
// import {useCookies} from 'react-cookie'
import {toEthiopianDateString} from 'gc-to-ethiopian-calendar'
import moment from 'moment';
import {FcOvertime,FcCalendar} from "react-icons/fc"
import {VscGear} from "react-icons/vsc"
import { userinfoActions } from '../../../../store/userinfo-slice';
// import {toEthiopianDateString} from 'gc-to-ethiopian-calender'
// import { errorActions } from '../../../../store/error-slice';
const NavRight = () => {
    const account = useSelector((state) => state.account);
    const dispatch = useDispatch();
    // const [cookies, setCookie,removeCookie] = useCookies(['token']);
    const userinfo=useSelector(state=>state.userinfo)
const history=useHistory()
    const [listOpen, setListOpen] = useState(false);
    // const HandleProfile = () => {
    //     history.push('/profile')
    // };
    const handleLogout = () => {
        dispatch(loginActions.isLoged(false))
        // removeCookie('access_token',{ path: '/'})
        history.push('/signin')
    };
    const toEc=()=>{
        dispatch(userinfoActions.setCalender('ec'))
    }
    const toGc=()=>{
        dispatch(userinfoActions.setCalender('gc'))
    }
    return (
        <React.Fragment>
            <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
                {/* <ListGroup.Item as="li" bsPrefix=" ">
                    <Dropdown>
                        <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
                            <i className="feather icon-bell icon" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight className="notification notification-scroll">
                            <div className="noti-head">
                                <h6 className="d-inline-block m-b-0">Notifications</h6>
                                <div className="float-right">
                                    <Link to="#" className="m-r-10">
                                        mark as read
                                    </Link>
                                    <Link to="#">clear all</Link>
                                </div>
                            </div>
                            <PerfectScrollbar>
                                <ListGroup as="ul" bsPrefix=" " variant="flush" className="noti-body">
                                    <ListGroup.Item as="li" bsPrefix=" " className="n-title">
                                        <p className="m-b-0">NEW</p>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" bsPrefix=" " className="notification">
                                        <Media>
                                            <img className="img-radius" src={avatar1} alt="Generic placeholder" />
                                            <Media.Body>
                                                <p>
                                                    <strong>John Doe</strong>
                                                    <span className="n-time text-muted">
                                                        <i className="icon feather icon-clock m-r-10" />
                                                        30 min
                                                    </span>
                                                </p>
                                                <p>New ticket Added</p>
                                            </Media.Body>
                                        </Media>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" bsPrefix=" " className="n-title">
                                        <p className="m-b-0">EARLIER</p>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" bsPrefix=" " className="notification">
                                        <Media>
                                            <img className="img-radius" src={avatar2} alt="Generic placeholder" />
                                            <Media.Body>
                                                <p>
                                                    <strong>Joseph William</strong>
                                                    <span className="n-time text-muted">
                                                        <i className="icon feather icon-clock m-r-10" />
                                                        30 min
                                                    </span>
                                                </p>
                                                <p>Purchase New Theme and make payment</p>
                                            </Media.Body>
                                        </Media>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" bsPrefix=" " className="notification">
                                        <Media>
                                            <img className="img-radius" src={avatar3} alt="Generic placeholder" />
                                            <Media.Body>
                                                <p>
                                                    <strong>Sara Soudein</strong>
                                                    <span className="n-time text-muted">
                                                        <i className="icon feather icon-clock m-r-10" />
                                                        30 min
                                                    </span>
                                                </p>
                                                <p>currently login</p>
                                            </Media.Body>
                                        </Media>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" bsPrefix=" " className="notification">
                                        <Media>
                                            <img className="img-radius" src={avatar4} alt="Generic placeholder" />
                                            <Media.Body>
                                                <p>
                                                    <strong>Suzen</strong>
                                                    <span className="n-time text-muted">
                                                        <i className="icon feather icon-clock m-r-10" />
                                                        yesterday
                                                    </span>
                                                </p>
                                                <p>Purchase New Theme and make payment</p>
                                            </Media.Body>
                                        </Media>
                                    </ListGroup.Item>
                                </ListGroup>
                            </PerfectScrollbar>
                            <div className="noti-footer">
                                <Link to="#">show all</Link>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </ListGroup.Item> */}
                {/* <ListGroup.Item as="li" bsPrefix=" ">
                    <Dropdown>
                        <Dropdown.Toggle as={Link} variant="link" to="#" className="displayChatbox" onClick={() => setListOpen(true)}>
                            <i className="icon feather icon-mail" />
                        </Dropdown.Toggle>
                    </Dropdown>
                </ListGroup.Item> */}
                <span style={{paddingRight:"15px"}}>{moment().format('llll')}</span>
                <FcOvertime size={25}/>
                <span style={{paddingRight:"20px",paddingLeft:"15px"}}>{toEthiopianDateString()}</span>
                <ListGroup.Item as="li" bsPrefix=" ">
                    <Dropdown className="drp-user">
                        <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
                        <FcCalendar size={25}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight className="profile-notification">
                            <div className="pro-head">
                              select calendar
                            </div>
                            <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                                <ListGroup.Item as="li" bsPrefix=" ">
                                    <Link to="#" className="dropdown-item" onClick={toEc}>
                                    <FcCalendar/> 
                                    {userinfo.calender=='ec'?<span style={{fontSize:'18px', paddingLeft:'6px'}}>Ethiopi calendar</span>:
                                    <span style={{paddingLeft:'6px'}}>Ethiopian calendar</span>}
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" bsPrefix=" ">
                                    <Link to="#" className="dropdown-item" onClick={toGc}>
                                    <FcCalendar/> 
                                    {userinfo.calender=='gc'?<span style={{fontSize:'18px',paddingLeft:'6px'}}>Gregorian calendar</span>:
                                    <span style={{paddingLeft:'6px'}}>Gregorian calendar</span>}
                                    
                                    </Link>
                                </ListGroup.Item>
                            </ListGroup>
                        </Dropdown.Menu>
                    </Dropdown>
                </ListGroup.Item>
                
                <ListGroup.Item as="li" bsPrefix=" ">
                    <Dropdown className="drp-user">
                        <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
                            <VscGear size={25} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight className="profile-notification">
                            <div className="pro-head">
                                <img src={avatar1} className="img-radius" alt="User Profile" />
                                <span style={{textTransform: 'capitalize'}}>
                                    {userinfo.username}
                                </span>
                                <Link to="#" className="dud-logout" onClick={handleLogout} title="Logout">
                                    <i className="feather icon-log-out" />
                                </Link>
                            </div>
                            <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                                <ListGroup.Item as="li" bsPrefix=" ">
                                    <Link to="/changepassword" className="dropdown-item">
                                        <i className="feather icon-settings" /> Manage Password
                                    </Link>
                                </ListGroup.Item>
                            
                                <ListGroup.Item as="li" bsPrefix=" ">
                                    <Link to="#" className="dropdown-item" onClick={handleLogout}>
                                        <i className="feather icon-log-out" /> Logout
                                    </Link>
                                </ListGroup.Item>
                            </ListGroup>
                        </Dropdown.Menu>
                    </Dropdown>
                </ListGroup.Item>
            </ListGroup>
            <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
        </React.Fragment>
    );
};

export default NavRight;
