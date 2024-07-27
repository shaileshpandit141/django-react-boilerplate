import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Login from './components/specific/Login/Login';
import Home from './pages/home/Home';
import PrivateRoute from './PrivateRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route path="/login" element={<Login />} />
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