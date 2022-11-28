import React,{useRef,useEffect} from 'react';
import { Card, Row, Col,Button} from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import useScriptRef from '../../../hooks/useScriptRef';
import { API_SERVER } from '../../../config/constant';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import CircularProgress from "@mui/material/CircularProgress";
import Buttons from "@mui/material/Button";
import { errorActions } from '../../../store/error-slice';
import { Organization } from '../../../store/authhttp';
import { loadingActions } from '../../../store/loading-slice';
import { useDispatch,useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';

const Organizations = () => {
    const orgcoderef=useRef()
    let history = useHistory();
    const dispatch=useDispatch()
    const isOrgCodeValid=useSelector(state=>state.login.isOrgCodeValid)
    const loadingStatus=useSelector(state=>state.loading.status)
    const errmsg=useSelector(state=>state.message.errMessage)
    const HandleOrgCode=(event)=>{
        event.preventDefault()       
        const orgcode=orgcoderef.current.value
        if(orgcode!=='')
        {
            dispatch(errorActions.Message(''))
            dispatch(loadingActions.status('pending'))
            dispatch(Organization({code:orgcode}))
        }
        else{
            dispatch(errorActions.Message('Please Fill Organization Code'))  
        }
    }
    useEffect(()=>{
        isOrgCodeValid&&history.push('/signin')
        dispatch(errorActions.Message(''))
        return ()=>{
            dispatch(errorActions.Message(''))
        }
    },[isOrgCodeValid])
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
                                    {errmsg &&<Alert style={{margin:'15px 0px'}} severity="error">{errmsg}</Alert>}
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
                        {loadingStatus!=='pending'?"Submit" :<CircularProgress color='secondary' size={18}/>}
                           </Buttons>
                            </Col>
                        </Row>
                    </form>
            <hr />

                                    <br />

                                    <p className="mb-0 text-muted">
                                        &copy;{' '}
                                        <a target="_blank" rel="noreferrer">
                                    Shipping
                                </a>
                                -{' '}
                                <a  rel="noreferrer">
                                    Dashboard
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
