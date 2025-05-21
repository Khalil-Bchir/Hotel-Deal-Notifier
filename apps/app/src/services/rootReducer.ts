import { combineReducers } from '@reduxjs/toolkit';

//v1 reducers
import authReducer from './v1/authSlice';
import hotelsReducer from './v1/hotelSlice';

const rootReducer = combineReducers({
  //v1 reducers
  auth: authReducer,
  hotels: hotelsReducer,
});

export default rootReducer;
