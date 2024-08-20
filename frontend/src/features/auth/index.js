import authReducer, { logout } from './slices/authSlice';
import signupReducer from './slices/signupSlice';
import useAuthSelectors from './hooks/useAuthSelectors';
import LoginFrom from './components/loginForm/LoginForm';
import LogoutButton from './components/logoutButton/LogoutButton';
import ResendVerificationKey from './components/resendVerificationKey/ResendVerificationKey';
import SignupForm from './components/signupForm/SignupForm';
import VerifyAccount from './components/verifyAccount/VerifyAccount';

export {
    authReducer,
    logout,
    signupReducer,
    useAuthSelectors,
    LoginFrom,
    LogoutButton,
    ResendVerificationKey,
    SignupForm,
    VerifyAccount
}