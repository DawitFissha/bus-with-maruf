import React, {useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes, { renderRoutes } from './routes';
import { BASENAME } from './config/constant';
// import {useAppSelector} from './app/hooks'
// import {useAppDispatch} from './app/hooks'
// import { useCheckSessionQuery } from './store/bus_api';
// import { useHistory} from 'react-router-dom';

export let allBusses:any
export let ActiveBusses:any[]
const App = () => {
//   const history=useHistory()
//   // const {data,isSuccess}=useCheckSessionQuery()
//     const dispatch = useAppDispatch()
//     const busStatus = useAppSelector(state=>state.busses.status)
//     allBusses = useAppSelector(state=>state.busses.busses)
//     ActiveBusses = allBusses.map((ab:any)=>(
//      {
//        _id:ab._id,
//        busPlateNo:ab.busPlateNo
//      }
//    )) 
//  console.log("in app tsx")
//   useEffect(()=>{
//     if(busStatus === 'idle'){
//       dispatch(fetchBusses())
//     }
//     // if(!isSuccess){
//     //   history.push('/dashboard')
//     // }
//   },[busStatus,dispatch])
    return (
        <React.Fragment>
            <Router basename={BASENAME}>{renderRoutes(routes)}</Router>
        </React.Fragment>
    );
};

export default App;
