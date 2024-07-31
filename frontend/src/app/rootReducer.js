import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice'
import currentUserReducer from '../features/currentUser/currentUserSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    currentUser: currentUserReducer,
});

export default rootReducer;
