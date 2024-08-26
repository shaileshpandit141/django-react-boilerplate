import authReducer, { logout } from './slices/authSlice';
import useAuthSelectors from './hooks/useAuthSelectors';
import signupReducer from './slices/signupSlice';
import LogoutButton from './components/logoutButton/LogoutButton';
import verifyAccountReducer from './slices/verifyAccountSlice';
import resendVerificationKeyReducer from './slices/resendVerificationKeySlice';
import LoginFrom from './pages/loginForm/LoginForm';
import ResendVerificationKey from './pages/resendVerificationKey/ResendVerificationKey';
import SignupForm from './pages/signupForm/SignupForm';
import VerifyAccount from './pages/verifyAccount/VerifyAccount';

export {
    authReducer,
    logout,
    signupReducer,
    verifyAccountReducer,
    resendVerificationKeyReducer,
    useAuthSelectors,
    LoginFrom,
    LogoutButton,
    ResendVerificationKey,
    SignupForm,
    VerifyAccount
}