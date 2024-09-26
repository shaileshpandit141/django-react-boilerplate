import signinReducer, { signout } from './slices/signinSlice'
import signupReducer from './slices/signupSlice'
import verifyAccountReducer from './slices/verifyAccountSlice'
import resendVerificationKeyReducer from './slices/resendVerificationKeySlice'
import forgotPasswordReducer from './slices/forgotPasswordSlice'
import { refreshAccessTokenThunk } from './thunks/signinSliceThunk'
import { useSigninSelectors } from './hooks/useSigninSelectors'

// Pages
import LogoutButton from './components/signoutButton/SignoutButton'
import SigninForm from './pages/signinForm/SigninForm'
import ResendVerificationKey from './pages/resendVerificationKey/ResendVerificationKey'
import SignupForm from './pages/signupForm/SignupForm'
import VerifyAccount from './pages/verifyAccount/VerifyAccount'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import PasswordResetConfirm from './pages/forgotPassword/PasswordResetConfirm'

export {
  signinReducer,
  signupReducer,
  verifyAccountReducer,
  resendVerificationKeyReducer,
  forgotPasswordReducer,
  refreshAccessTokenThunk,
  signout,
  useSigninSelectors,
  SigninForm,
  LogoutButton,
  ResendVerificationKey,
  SignupForm,
  VerifyAccount,
  ForgotPassword,
  PasswordResetConfirm,
}
