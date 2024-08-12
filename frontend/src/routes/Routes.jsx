// Named Imports.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Default Imports (user define pages).
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NotFound from '../pages/notfound/NotFound'
import MainLayout from '../layouts/MainLayout/MainLayout';
import Login from '../features/auth/components/login/Login';
import Signup from '../features/auth/components/signup/Signup';
import Home from '../pages/home/Home';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    
                    {/* Public Routes */}
                    <Route element={<PublicRoute />}>
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
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
