import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// import {useCookies} from 'react-cookie'
import { loginActions } from '../../store/login-slice';
import { useSelector,useDispatch} from "react-redux";

const AuthGuard = ({ children }) => {
    const dispatch=useDispatch()
    const loginState = useSelector((state) => state.login);
    console.log(loginState)
    const { isAuthenticated } = loginState;
    // const [cookies, setCookie] = useCookies(['access_token']);
    // console.log(cookies)
    if(!isAuthenticated){
    dispatch(loginActions.isLoged(false))
    return <Redirect to="/signin" />
    }
    return children;

};

export default AuthGuard;
