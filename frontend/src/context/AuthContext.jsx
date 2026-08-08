import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in on mount
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setInitialLoading(false);
    }, []);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${API_URL}/api/auth/register`, {
                name,
                email,
                password,
            });
            // We do not set the user here, since they need to verify their email
            setLoading(false);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
            setLoading(false);
            return false;
        }
    };

    const verifyOtp = async (email, otp) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.post(`${API_URL}/api/auth/verify-otp`, {
                email,
                otp,
            });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
            setLoading(false);
            return false;
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password,
            });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            return true;
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Invalid email or password';
            setError(errorMsg);
            setLoading(false);
            // Return special object if unverified to allow redirect
            if (err.response?.data?.unverified) {
                return { unverified: true };
            }
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider value={{ user, loading, initialLoading, error, register, login, logout, clearError, verifyOtp }}>
            {children}
        </AuthContext.Provider>
    );
};
