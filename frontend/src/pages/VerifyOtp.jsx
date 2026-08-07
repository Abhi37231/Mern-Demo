import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const { verifyOtp, error, clearError, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        clearError();
        if (!email) {
            navigate('/register');
        }
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await verifyOtp(email, otp);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="glass-container">
            <h2 className="title">Verify Your Email</h2>
            <p className="subtitle">We sent a 6-digit code to {email}</p>
            
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="otp">Enter Verification Code</label>
                    <input 
                        type="text" 
                        id="otp" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        placeholder="123456" 
                        maxLength={6}
                        required 
                    />
                </div>
                <button type="submit" className="btn" disabled={loading}>
                    {loading ? <span className="loader"></span> : 'Verify'}
                </button>
            </form>
        </div>
    );
};

export default VerifyOtp;
