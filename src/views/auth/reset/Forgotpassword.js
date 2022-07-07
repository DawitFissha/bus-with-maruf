import React from 'react';
import { Card, Row, Col,Button, Alert  } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import useScriptRef from '../../../hooks/useScriptRef';
import { API_SERVER } from '../../../config/constant';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import CircularProgress from "@material-ui/core/CircularProgress";
import Buttons from "@material-ui/core/Button";
const Forgot = () => {
    let history = useHistory();
    const scriptedRef = useScriptRef();
    const EmailHandler=()=>{
        history.push('/checkemail')
    }
    const BackLogin=()=>{
        history.push('/signin')
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
                    <Card className="borderless">
                        <Row className="align-items-center">
                            <Col>
                                <Card.Body className="text-center">
                                    <h4 className="mb-4">Admin Dashboard</h4>

                                    <div className="mb-4">
                                        <i className="feather icon-user-plus auth-icon" />
                                    </div>

                                    <form >
                        <div className="form-group mb-3">
                            <input
                                className="form-control"
                                // error={touched.email && errors.email}
                                label="Email Address"
                                placeholder="Email Address"
                                name="email"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                type="email"
                                // value={values.email}
                            />
                            {/* { errors.username && <small className="text-danger form-text">{errors.username}</small>} */}
                        </div>
                       

                        {/* {errors.submit && (
                            <Col sm={12}>
                                <Alert variant="danger">{errors.submit}</Alert>
                            </Col>
                        )} */}

                        <Row>
                            <Col mt={2}>
                            <Buttons
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                        {'pendin'!=='pending'?"Send Reset Email" :<CircularProgress color='secondary' size={18}/>}
                           </Buttons>
                            </Col>
                        </Row>
                    </form>
            <hr />

                                    <p className="mb-2">
                                        <NavLink to="/signin" className="f-w-400">
                                            Login
                                        </NavLink>
                                    </p>

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

export default Forgot;
