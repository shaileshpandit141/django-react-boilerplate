import authReducer, { signout } from './slices/authSlice' 
import signupReducer from './slices/signupSlice' 
import verifyAccountReducer from './slices/verifyAccountSlice' 
import resendVerificationKeyReducer from './slices/resendVerificationKeySlice' 
import forgotPasswordReducer from './slices/forgotPasswordSlice'
import { refreshAccessTokenThunk } from './thunks/authThunk' 
import { useAuthSelectors } from './hooks/useAuthSelectors' 

// Pages
import LogoutButton from './components/signoutButton/SignoutButton'
import SigninForm from './pages/signinForm/SigninForm'
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
    forgotPasswordReducer,
    refreshAccessTokenThunk,
    signout,
    useAuthSelectors,
    SigninForm,
    LogoutButton,
    ResendVerificationKey,
    SignupForm,
    VerifyAccount,
    ForgotPassword,
    PasswordResetConfirm,
}