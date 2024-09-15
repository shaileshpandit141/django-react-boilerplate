import { combineReducers } from 'redux'
import {
    authReducer,
    signupReducer,
    verifyAccountReducer,
    resendVerificationKeyReducer
} from '../features/auth'
import { userReducer } from '../features/user'

const rootReducer = combineReducers({
    auth: authReducer,
    signup: signupReducer,
    verifyAccount: verifyAccountReducer,
    resendVerificationKey: resendVerificationKeyReducer,
    user: userReducer,
})

export default rootReducer 
