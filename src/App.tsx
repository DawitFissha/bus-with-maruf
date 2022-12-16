import React, {useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes, { renderRoutes } from './routes';
import { BASENAME } from './config/constant';
// import {useAppSelector} from './app/hooks'
// import {useAppDispatch} from './app/hooks'
import { useCheckSessionQuery } from './store/bus_api';
// import { useHistory} from 'react-router-dom';
import { loginActions } from './store/login-slice';
import { useSelector,useDispatch} from "react-redux";
export let allBusses:any
export let ActiveBusses:any[]
const App = () => {
  const {data,isSuccess,isError}=useCheckSessionQuery("hi")
 const dispatch = useDispatch()
  useEffect(()=>{
    console.log('error app')
    isError&&dispatch(loginActions.isLoged(false))
  },[isError])
    return (
        <React.Fragment>
            <Router basename={BASENAME}>{renderRoutes(routes)}</Router>
        </React.Fragment>
    );
};

export default App;
