import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Welcome = () => {
    const { user, logout } = useContext(AuthContext);

    // Get initials for avatar
    const initials = user?.name 
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
        : 'U';

    return (
        <div className="glass-container glass-container-lg">
            <div className="welcome-content">
                <div className="avatar-placeholder">
                    {initials}
                </div>
                <h1 className="title">Welcome, {user?.name}!</h1>
                <p className="subtitle">
                    You have successfully logged in to the MERN application demo.
                    This is your protected dashboard.
                </p>
                <button onClick={logout} className="btn btn-secondary">
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Welcome;
