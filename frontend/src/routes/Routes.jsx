// Named Imports.
import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import {
    LoginFrom,
    ResendVerificationKey,
    SignupForm,
    VerifyAccount,
    ForgotPassword,
    PasswordResetConfirm
} from '../features/auth'

// Default Imports (user define pages).
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import NotFound from '../errors/notfound/NotFound'
import MainLayout from '../layouts/mainLayout/mainLayout/MainLayout'
import Home from '../pages/home/Home'
import Index from '../pages/index/Index'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>


                    {/* Public Routes */}
                    <Route element={<PublicRoute />}>
                        <Route index element={<Index />} />
                        <Route path="login" element={<LoginFrom />} />
                        <Route path="resend-verification-key" element={<ResendVerificationKey />} />
                        <Route path="signup" element={<SignupForm />} />
                        <Route path="verify-account/:key" element={<VerifyAccount />} />
                        <Route path='resend-verification-key' element={<ResendVerificationKey />} />
                        <Route path='forgot-password' element={<ForgotPassword />} />
                        <Route path='password-reset-confirm/:uid/:token' element={<PasswordResetConfirm />} />
                    </Route>

                    {/* Private Routes */}
                    <Route element={<PrivateRoute />}>
                        <Route path="home" element={<Home />} />
                    </Route>

                </Route>

                {/* Catch-all route for 404 Not Found */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes 
