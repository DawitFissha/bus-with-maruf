import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { loginActions } from '../../store/login-slice';
import { useSelector,useDispatch} from "react-redux";

const AuthGuard = ({ children }) => {
    console.log('error auth')
    const dispatch=useDispatch()
    const loginState = useSelector((state) => state.login);
    const { isAuthenticated } = loginState;
    if(!isAuthenticated){
    dispatch(loginActions.isLoged(false))
    return <Redirect to="/signin" />
    }
    return children;

};

export default AuthGuard;
