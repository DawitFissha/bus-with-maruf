import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import loginSlice from './login-slice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userinfoSlice from './userinfo-slice';
import dashboardSlice from './dashboard-slice'
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
[busApi.reducerPath]:busApi.reducer,

});

export default reducers;
