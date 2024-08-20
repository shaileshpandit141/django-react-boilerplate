import { combineReducers } from 'redux';
import { authReducer, signupReducer } from '../features/auth';
import userReducer from '../features/user/userSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    signup: signupReducer,
    user: userReducer,
});

export default rootReducer;
