import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import loginSlice from './login-slice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import loadingSlice from './loading-slice';
// import errorSlice from './error-slice';
import userinfoSlice from './userinfo-slice';
import users from '../views/user/userSlice'
import busStates from '../views/bus-states/busstateSlice'
import schedules from '../views/schedule/scheduleSlice'
import routes from '../views/route/routeSlice'
import dashboardSlice from './dashboard-slice'
import busses from '../views/bus/busSlice';
import cashiers from '../views/user/cashierSlice'
import redats from '../views/user/redatSlice'
import drivers from '../views/user/driverSlice'
//Maruf
import busSlice from './bus-slice';
import modalSlice from './modal-slice';
import scheduleSlice from './schedule-slice';
import citySlice from './city-slice';
import {busApi} from './bus_api'
const reducers = combineReducers({
    login: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'datta-'
        },
        loginSlice
    ),
   dashboard:dashboardSlice,
   bus:busSlice,
   modal:modalSlice,
   schedule:scheduleSlice,
   city:citySlice,
   userinfo:persistReducer(
    {
        key: 'user',
        storage,
        keyPrefix: 'datta-'
    },
    userinfoSlice
),
users,
busStates,
schedules,
routes,
busses,
cashiers,
redats,
drivers,
//
[busApi.reducerPath]:busApi.reducer,

});

export default reducers;
