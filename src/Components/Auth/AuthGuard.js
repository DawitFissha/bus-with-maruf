import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import {useCookies} from 'react-cookie'
import { loginActions } from '../../store/login-slice';
const AuthGuard = ({ children }) => {
    const dispatch=useDispatch()
    // const loginState = useSelector((state) => state.login);
    // const { isAuthenticated } = loginState;
    const [cookies, setCookie] = useCookies(['token']);
    console.log(cookies)
    if(!cookies?.access_token){
    dispatch(loginActions.isLoged(false))
    return <Redirect to="/signin" />
    }
    return children;

};

export default AuthGuard;
