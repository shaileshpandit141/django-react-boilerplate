import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import toastReducer from '../features/toast/toastSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    toast: toastReducer,
});

export default rootReducer;
