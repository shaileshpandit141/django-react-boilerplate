import authReducer, { logout } from './slices/authSlice' 
import signupReducer from './slices/signupSlice' 
import verifyAccountReducer from './slices/verifyAccountSlice' 
import resendVerificationKeyReducer from './slices/resendVerificationKeySlice' 
import { refreshAccessTokenThunk } from './thunks/authThunk' 
import { useAuthSelectors } from './hooks/useAuthSelectors' 

// Pages
import LogoutButton from './components/logoutButton/LogoutButton'
import LoginFrom from './pages/loginForm/LoginForm'
import ResendVerificationKey from './pages/resendVerificationKey/ResendVerificationKey'
import SignupForm from './pages/signupForm/SignupForm'
import VerifyAccount from './pages/verifyAccount/VerifyAccount' 
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import PasswordResetConfirm from './pages/forgotPassword/PasswordResetConfirm'

export {
    authReducer,
    signupReducer,
    verifyAccountReducer,
    resendVerificationKeyReducer,
    refreshAccessTokenThunk,
    logout,
    useAuthSelectors,
    LoginFrom,
    LogoutButton,
    ResendVerificationKey,
    SignupForm,
    VerifyAccount,
    ForgotPassword,
    PasswordResetConfirm,
}