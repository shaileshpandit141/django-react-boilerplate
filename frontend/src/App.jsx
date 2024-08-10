import React from 'react';
import './sass/index.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isTokenExpired } from './utils/isTokenExpired'
import { store } from './app/store';
import { logout } from './features/auth/authSlice';
import MainLayout from './layouts/MainLayout/MainLayout';
import Login from './features/auth/components/login/Login';
import Signup from './features/auth/components/signup/Signup';
import Home from './pages/home/Home';
import PrivateRoute from './PrivateRoute';
import isAuthenticated from './utils/isAuthenticated';

export default function App() {
    // const dispatch = useDispatch();
    // const accessToken = store.getState().auth.accessToken;
    // const refreshToken = store.getState().auth.refreshToken;

    // React.useEffect(() => {
    //     if (refreshToken) {
    //         dispatch(logout());
    //     }
    // }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route element={<PrivateRoute />}>
                        <Route path='/' element={<Home />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};
