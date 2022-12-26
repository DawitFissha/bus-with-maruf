import React,{useRef,useEffect,useState} from 'react';
import { Card, Row, Col} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
// import useScriptRef from '../../../hooks/useScriptRef';
// import { API_SERVER } from '../../../config/constant';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import CircularProgress from "@mui/material/CircularProgress";
import Buttons from "@mui/material/Button";
// import { errorActions } from '../../../store/error-slice';
// import { Organization } from '../../../store/authhttp';
// import { loadingActions } from '../../../store/loading-slice';
import { useDispatch,useSelector } from 'react-redux';
import { loginActions } from "../../../store/login-slice"
import Alert from '@mui/material/Alert';
import { useLazyGetOrganizationByCodeQuery,useGetOrganizationByCodeQuery } from '../../../store/bus_api';
const Organizations = () => {
    const orgcoderef=useRef()
    let history = useHistory();
    const dispatch=useDispatch()
    // const isOrgCodeValid=useSelector(state=>state.login.isOrgCodeValid)
    // const loadingStatus=useSelector(state=>state.loading.status)
    // const errmsg=useSelector(state=>state.message.errMessage)
    const [trigger,{data,isSuccess,isLoading,isError,error}]=useLazyGetOrganizationByCodeQuery()
    // const {data,isLoading} = useGetOrganizationByCodeQuery(orgcoderef.current)
    const [isLocalError,setIsLocalError] =useState(false)
    const [localError,setLocalError]=useState('')
    const HandleOrgCode=(event)=>{
        setLocalError('')
        setIsLocalError(false)
        event.preventDefault()       
        const orgcode=orgcoderef.current.value
        if(orgcode&&orgcode!=='')
        {
            trigger(orgcode)
        }
        else{
            setLocalError('Please fill organization code')
            setIsLocalError(true)
          }
    }
    useEffect(()=>{
        console.log(isSuccess)
        if(isSuccess)
        {
        dispatch(loginActions.isOrgCodeValid(true))
        dispatch(loginActions.organization(data?.organizationName))
        dispatch(loginActions.organizationCode(data?.organizationCode))
        history.push('/signin')
        }
    },[isSuccess])
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
                    <Card className="borderless">
                        <Row className="align-items-center">
                            <Col>
                                <Card.Body className="text-center">
                                    <h4 className="mb-4">Our Company Name</h4>

                                    <div className="mb-4">
                                        <i className="feather icon-user-plus auth-icon" />
                                    </div>
                                    {isLocalError&&<Alert style={{marginTop:'10px',marginBottom:'20px'}} severity="error">{localError}</Alert>}          
                                    {!isLocalError&&isError&&<Alert style={{marginTop:'10px',marginBottom:'20px'}} severity="error">{error.data?.message||"connection error"}</Alert>}
                                    <form >
                        <div className="form-group mb-3">
                            <input
                                className="form-control"
                                label="Organization Code"
                                placeholder="Organization Code"
                                name="code"
                                type="text"
                                ref={orgcoderef}
                            />
                        </div>


                        <Row>
                            <Col mt={2}>
                            <Buttons
                            onClick={HandleOrgCode}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                        {!isLoading?"Submit" :<CircularProgress color='secondary' size={18}/>}
                           </Buttons>
                            </Col>
                        </Row>
                    </form>
            <hr />
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
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Organizations;
