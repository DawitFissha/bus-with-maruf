import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthGuard = ({ children }) => {
    const loginState = useSelector((state) => state.login);
    const { isAuthenticated } = loginState;
console.log('guard')
console.log(isAuthenticated)
    if (!isAuthenticated) {
        return <Redirect to="/signin" />;
    }

    return children;
};

export default AuthGuard;
