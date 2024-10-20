import { combineReducers } from 'redux'
import {
  signinReducer,
  signoutReducer,
  signupReducer,
  verifyAccountReducer,
  resendVerificationKeyReducer,
  forgotPasswordReducer,

} from '../features/auth'
import { userReducer } from '../features/user'

const rootReducer = combineReducers({
  signin: signinReducer,
  signout: signoutReducer,
  signup: signupReducer,
  verifyAccount: verifyAccountReducer,
  resendVerificationKey: resendVerificationKeyReducer,
  forgotPassword: forgotPasswordReducer,
  user: userReducer,
})

export default rootReducer
