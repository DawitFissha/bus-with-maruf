import React,{useRef,useEffect} from 'react';
import { Card,Col ,Row,Button,Alert} from 'react-bootstrap';
import { NavLink ,Link, useHistory} from 'react-router-dom';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import CircularProgress from "@material-ui/core/CircularProgress";
import Buttons from "@material-ui/core/Button";
import {loginActions} from "../../../store/login-slice";
import { loginUser } from '../../../store/authhttp';
import { useSelector,useDispatch } from "react-redux";
import { loadingActions } from '../../../store/loading-slice';
import { errorActions } from '../../../store/error-slice';
import  {Redirect} from 'react-router-dom'
import {useCookies} from 'react-cookie'

const Signin = () => {
    const [cookies, setCookie] = useCookies(['token']);
    const emailref=useRef()
    const passwordref=useRef()
const history = useHistory()
const dispatch=useDispatch()
const loginState = useSelector((state) => state.login);
const { isAuthenticated ,isOrgCodeValid,organizationName} = loginState;
const token=useSelector(state=>state.login.token)

const loadingStatus=useSelector(state=>state.loading.status)
const errmsg=useSelector(state=>state.message.errMessage)
const organizationcode=useSelector(state=>state.login.organizationCode)

    const HandleSignin=(event)=>{
        event.preventDefault()
        const phonenumber=emailref.current.value
        const password=passwordref.current.value
        
if(phonenumber&&password)
{
    dispatch(loadingActions.status('pending'))
    dispatch(errorActions.Message(''))
    const data={
        phonenumber,
        password,
        organizationcode
    }
    dispatch(loginUser(data))
}
else{
    dispatch(errorActions.Message('Please Fill All Field'))

}
    }
    useEffect(()=>{
        dispatch(errorActions.Message(''))
    },[])
console.log(isAuthenticated)
    useEffect(()=>{
        token&&setCookie('token', token, { path: '/'})
        isAuthenticated&&history.push('/dashboard')
    },[isAuthenticated])
    if (!isOrgCodeValid) {
        return <Redirect to="/organization" />;
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
                            <h4 className="mb-4">Welcome To {organizationName} Bus</h4>

                            <div className="mb-4">
                                <i className="feather icon-unlock auth-icon" />
                            </div>
                            {errmsg && (
                            <Col sm={12} style={{marginBottom:'8px'}}>
                            <small className="text-danger form-text">{errmsg}</small>
                            </Col>
                        )} 
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
                        {loadingStatus!=='pending'?"Sign In" :<CircularProgress color='secondary' size={18}/>}
                           </Buttons>
                            </Col>
                        </Row>
                    </form>
             
            <hr />

                            <p className="mb-0 text-muted">
                                Forgot password?{' '}
                                <NavLink to="/forgotpassword" className="f-w-400">
                                    Forgot
                                </NavLink>
                            </p>

                            <br />

                            <p className="mb-0 text-muted">
                                &copy;{' '}
                                <a target="_blank" rel="noreferrer">
                                    Bus Booking
                                </a>
                                -{' '}
                                <a  rel="noreferrer">
                                    Pannel
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
