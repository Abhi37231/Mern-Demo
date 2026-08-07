import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

import VerifyOtp from './pages/VerifyOtp';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return null;
    if (user) return <Navigate to="/" replace />;
    return children;
};

function App() {
    return (
        <Routes>
            <Route path="/login" element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            } />
            <Route path="/register" element={
                <PublicRoute>
                    <Register />
                </PublicRoute>
            } />
            <Route path="/verify-otp" element={
                <PublicRoute>
                    <VerifyOtp />
                </PublicRoute>
            } />
            <Route path="/" element={
                <ProtectedRoute>
                    <Welcome />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default App;
