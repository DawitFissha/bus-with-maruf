import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes, { renderRoutes } from './routes';
import { BASENAME } from './config/constant';
import {useAppSelector} from './app/hooks'
import {useAppDispatch} from './app/hooks'
import {fetchBusses} from './views/bus/busSlice'
import { useEffect } from 'react';
import { checkSession } from './store/authhttp';

export let allBusses:any
export let ActiveBusses:any[]
const App = () => {
    const dispatch = useAppDispatch()
    const busStatus = useAppSelector(state=>state.busses.status)
    allBusses = useAppSelector(state=>state.busses.busses)
    ActiveBusses = allBusses.filter((bus:any)=>bus.busState==="Active") .map((ab:any)=>(
     {
       _id:ab._id,
       busPlateNo:ab.busPlateNo
     }
   )) 
   useEffect(()=>{
    console.log("sehafgshdgkas")
       dispatch(checkSession())
   },[])
  React.useEffect(()=>{
    if(busStatus === 'idle'){
      dispatch(fetchBusses())
    }
  },[busStatus,dispatch])
    return (
        <React.Fragment>
            <Router basename={BASENAME}>{renderRoutes(routes)}</Router>
        </React.Fragment>
    );
};

export default App;
