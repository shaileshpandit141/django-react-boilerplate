import React from 'react';
import './sass/index.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import Login from './features/auth/components/login/Login';
import Signup from './features/auth/components/signup/Signup';
import Home from './pages/home/Home';
import PrivateRoute from './PrivateRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="/" element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    } />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;