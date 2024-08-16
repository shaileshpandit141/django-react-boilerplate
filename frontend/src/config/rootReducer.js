import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

export default rootReducer;
