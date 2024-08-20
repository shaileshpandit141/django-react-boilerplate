import { combineReducers } from 'redux';
import { authReducer, signupReducer, verifyAccountReducer } from '../features/auth';
import userReducer from '../features/user/userSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    signup: signupReducer,
    verifyAccount: verifyAccountReducer,
    user: userReducer,
});

export default rootReducer;
