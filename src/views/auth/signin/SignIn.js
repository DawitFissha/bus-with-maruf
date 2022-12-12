import React,{useRef,useEffect,useState} from 'react';
import { Card,Col,Row} from 'react-bootstrap';
import { useHistory} from 'react-router-dom';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import CircularProgress from "@mui/material/CircularProgress";
import Buttons from "@mui/material/Button";
// import {loginActions} from "../../../store/login-slice";
// import { loginUser } from '../../../store/authhttp';
import { useSelector,useDispatch} from "react-redux";
// import { loadingActions } from '../../../store/loading-slice';
// import { errorActions } from '../../../store/error-slice';
import { loginActions } from "../../../store/login-slice"
import { userinfoActions } from "../../../store/userinfo-slice"
import  {Redirect} from 'react-router-dom'
// import {useCookies} from 'react-cookie'
import Alert from '@mui/material/Alert';
import { useLoginUserMutation } from '../../../store/bus_api';
const Signin = () => {
    // const [cookies, setCookie] = useCookies(['token']);
    const emailref=useRef()
    const passwordref=useRef()
const history = useHistory()
const dispatch=useDispatch()
const loginState = useSelector((state) => state.login);
const {isOrgCodeValid,organizationName,isAuthenticated} = loginState;
// const token=useSelector(state=>state.login.token)
// const loadingStatus=useSelector(state=>state.loading.status)
// const errmsg=useSelector(state=>state.message.errMessage)
const organizationcode=useSelector(state=>state.login.organizationCode)
const [loginUser,{data,isSuccess,isLoading,isError,error}]=useLoginUserMutation()
const [isLocalError,setIsLocalError] =useState(false)
const [localError,setLocalError]=useState('')
const HandleSignin=(event)=>{
    setLocalError('')
    setIsLocalError(false)
    event.preventDefault()
    const phonenumber=emailref.current.value
    const password=passwordref.current.value       
if(phonenumber&&password)
{
    // dispatch(loadingActions.status('pending'))
    // dispatch(errorActions.Message(''))
    const data={
        phonenumber,
        password,
        organizationcode
    }
    loginUser(data)
}
else{
    setLocalError('Please fill all field')
    setIsLocalError(true)
   }
}

// console.log(localError)
useEffect(()=>{
    if(isSuccess){
    dispatch(loginActions.isLoged(true))
    dispatch(loginActions.setCookie(data.token))
    dispatch(userinfoActions.setUser({username:data.user,role:data.role}))
    // token&&setCookie('token', token, { path: '/'})
    history.push('/dashboard')
    }
},[isSuccess])
if (!isOrgCodeValid) {
    return <Redirect to="/organization" />;
}
if(isAuthenticated){
    return <Redirect to="/dashboard" />;
}
    return (
        <React.Fragment>
            <Breadcrumb />
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r" />
                        <span className="r s" />
                        <span className="r s" />
                        <span className="r" />
                    </div>
                    <Card className="borderless text-center">
                        <Card.Body>
                            <h3 style={{textTransform:'capitalize'}} className="mb-4">Welcome To {organizationName}</h3>

                            <div className="mb-4">
                                <i className="feather icon-unlock auth-icon" />
                            </div>
                           
                            <Col sm={12} style={{marginBottom:'8px'}}>
                        {isLocalError&&<Alert style={{marginTop:'10px',marginBottom:'20px'}} severity="error">{localError}</Alert>}          
                        {!isLocalError&&isError&&<Alert style={{marginTop:'10px',marginBottom:'20px'}} severity="error">{error.data?.message||"connection error"}</Alert>} 
                            </Col>
                        
                     <form>
                        <div className="form-group mb-3">
                            <input
                                className="form-control"
                                label="Phone Number"
                                placeholder="Phone Number"
                                name="phone"
                                ref={emailref}
                                type="text"
                            />
                        </div>
                        <div className="form-group mb-4">
                            <input
                                className="form-control"
                                label="Password"
                                placeholder="Password"
                                name="password"
                                ref={passwordref}
                                type="password"
                            />
                        </div>

                        <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">
                                Rember me.
                            </label>
                        </div>

                        <Row>
                            <Col mt={2}>
                            <Buttons
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={HandleSignin}
                            color="primary">
                        {!isLoading?"Sign In" :<CircularProgress color='secondary' size={18}/>}
                           </Buttons>
                            </Col>
                        </Row>
                    </form>
             
            <hr />

                            {/* <p className="mb-0 text-muted">
                                Forgot password?{' '}
                                <NavLink to="/forgotpassword" className="f-w-400">
                                    Forgot
                                </NavLink>
                            </p> */}

                            <br />

                            <p className="mb-0 text-muted">
                                &copy;{' '}
                                <a target="_blank" rel="noreferrer">
                                    Bus Booking System
                                </a>
                                {' '}
                                <a  href="https://4loops-kqighrp1b-marufbelete.vercel.app/" target="_blank">
                                  By 4loop software solution 
                                </a>
                                .
                            </p>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Signin;
