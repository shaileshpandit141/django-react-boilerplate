// Named Imports.
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import {
    LoginFrom,
    ResendVerificationKey,
    SignupForm,
    VerifyAccount
} from '../features/auth';


// Default Imports (user define pages).
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NotFound from '../pages/notfound/NotFound'
import MainLayout from '../layouts/MainLayout/MainLayout';
import Home from '../pages/home/Home';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>

                    {/* Public Routes */}
                    <Route element={<PublicRoute />}>
                        <Route path="login" element={<LoginFrom />} />
                        <Route path="resend-verification-key" element={<ResendVerificationKey />} />
                        <Route path="signup" element={<SignupForm />} />
                        <Route path="verify-account/:key" element={<VerifyAccount />} />
                    </Route>

                    {/* Private Routes */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                    </Route>

                </Route>

                {/* Catch-all route for 404 Not Found */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
