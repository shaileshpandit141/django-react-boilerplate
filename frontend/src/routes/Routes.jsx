// Named Imports (external libraries).
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

// Named Imports (utility functions or higher-order components).
import { lazyImportWithRetry, LazyLoader } from 'lazyUtils/lazyImportWithRetry'

// Default Imports (user-defined components).
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import MainLayout from 'layouts/mainLayout/mainLayout/MainLayout'

// Skeleton Imports
import PageLoader from 'components/common/pageLoader/PageLoader'
import IndexSkeleton from 'pages/index/IndexSkeleton'
import { SigninFormSkeleton } from 'features/auth'

// Lazy Imports.
const NotFound = lazyImportWithRetry(() => import('errors/notfound/NotFound'))
const SigninForm = lazyImportWithRetry(() => import('features/auth').then(module => ({ default: module.SigninForm })))
const ResendVerificationKey = lazyImportWithRetry(() => import('features/auth').then(module => ({ default: module.ResendVerificationKey })))
const SignupForm = lazyImportWithRetry(() => import('features/auth').then(module => ({ default: module.SignupForm })))
const VerifyAccount = lazyImportWithRetry(() => import('features/auth').then(module => ({ default: module.VerifyAccount })))
const ForgotPassword = lazyImportWithRetry(() => import('features/auth').then(module => ({ default: module.ForgotPassword })))
const PasswordResetConfirm = lazyImportWithRetry(() => import('features/auth').then(module => ({ default: module.PasswordResetConfirm })))
const Index = lazyImportWithRetry(() => import('pages/index/Index'))
const Home = lazyImportWithRetry(() => import('pages/home/Home'))
const SearchService = lazyImportWithRetry(() => import('pages/searchService/SearchService'))

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>

          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            {/* <Route index element={<Index />} /> */}
            <Route index element={
              <LazyLoader element={<Index />} fallback={<IndexSkeleton />} />}
            />
            <Route path="signin" element={
              <LazyLoader element={<SigninForm />} fallback={<SigninFormSkeleton />} />}
            />
            <Route path="resend-verification-key" element={
              <LazyLoader element={<ResendVerificationKey />} fallback={<PageLoader />} />}
            />
            <Route path="signup" element={
              <LazyLoader element={<SignupForm />} fallback={<PageLoader />} />}
            />
            <Route path="verify-account/:key" element={
              <LazyLoader element={<VerifyAccount />} fallback={<PageLoader />} />}
            />
            <Route path='resend-verification-key' element={
              <LazyLoader element={<ResendVerificationKey />} fallback={<PageLoader />} />}
            />
            <Route path='forgot-password' element={
              <LazyLoader element={<ForgotPassword />} fallback={<PageLoader />} />}
            />
            <Route path='password-reset-confirm/:uid/:token' element={
              <LazyLoader element={<PasswordResetConfirm />} fallback={<PageLoader />} />}
            />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="home" element={
              <LazyLoader element={<Home />} fallback={<PageLoader />} />}
            />
            <Route path="search-service" element={
              <LazyLoader element={<SearchService />} fallback={<PageLoader />} />}
            />
          </Route>

          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={
            <LazyLoader element={<NotFound />} fallback={<PageLoader />} />
          } />

        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
