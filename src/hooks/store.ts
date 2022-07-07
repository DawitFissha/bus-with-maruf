import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../views/user/userSlice'
import routesReducer from '../views/route/routeSlice'
import cityReducer from '../views/city/citySlice'
import busReducer from '../views/bus/busSlice'
import scheduleReducer from '../views/schedule/scheduleSlice'
import busStateReducer from '../views/bus-states/busstateSlice'
import ticketReducer from '../views/bookings/ticketslice'
export const store = configureStore({
  reducer: {
    users:usersReducer,
    routes:routesReducer,
    cities:cityReducer,
    busses:busReducer,
    schedules:scheduleReducer,
    busStates:busStateReducer, 
    tickets:ticketReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
