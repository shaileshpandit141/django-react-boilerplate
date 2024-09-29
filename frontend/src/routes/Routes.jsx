// Named Imports (external libraries).
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

// Named Imports (utility functions or higher-order components).
import { lazyImportWithRetry, LazyLoader } from '../lazyUtils/lazyImportWithRetry'

// Default Imports (user-defined components).
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

// Lazy Imports.
const MainLayout = lazyImportWithRetry(() => import('../layouts/mainLayout/mainLayout/MainLayout'))
const NotFound = lazyImportWithRetry(() => import('../errors/notfound/NotFound'))
const SigninForm = lazyImportWithRetry(() => import('../features/auth').then(module => ({ default: module.SigninForm })))
const ResendVerificationKey = lazyImportWithRetry(() => import('../features/auth').then(module => ({ default: module.ResendVerificationKey })))
const SignupForm = lazyImportWithRetry(() => import('../features/auth').then(module => ({ default: module.SignupForm })))
const VerifyAccount = lazyImportWithRetry(() => import('../features/auth').then(module => ({ default: module.VerifyAccount })))
const ForgotPassword = lazyImportWithRetry(() => import('../features/auth').then(module => ({ default: module.ForgotPassword })))
const PasswordResetConfirm = lazyImportWithRetry(() => import('../features/auth').then(module => ({ default: module.PasswordResetConfirm })))
const Index = lazyImportWithRetry(() => import('../pages/index/Index'))
const Home = lazyImportWithRetry(() => import('../pages/home/Home'))

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<LazyLoader element={<MainLayout />} />}>

          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            {/* <Route index element={<Index />} /> */}
            <Route index element={<LazyLoader element={<Index />} />} />
            <Route path="signin" element={<LazyLoader element={<SigninForm />} />} />
            <Route path="resend-verification-key" element={<LazyLoader element={<ResendVerificationKey />} />} />
            <Route path="signup" element={<LazyLoader element={<SignupForm />} />} />
            <Route path="verify-account/:key" element={<LazyLoader element={<VerifyAccount />} />} />
            <Route path='resend-verification-key' element={<LazyLoader element={<ResendVerificationKey />} />} />
            <Route path='forgot-password' element={<LazyLoader element={<ForgotPassword />} />} />
            <Route path='password-reset-confirm/:uid/:token' element={<LazyLoader element={<PasswordResetConfirm />} />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="home" element={<LazyLoader element={<Home />} />} />
          </Route>

          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
