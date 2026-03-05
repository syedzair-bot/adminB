import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
const AuthPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const navigate = useNavigate();

    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const url = isSignUp ? `${BACKEND_URL}/api/auth/signup` : `${BACKEND_URL}/api/auth/signin`;
            const res = await axios.post(url, { email, password });
            if (isSignUp) {
                setMessage("Account created! Check your email for confirmation.");
            } else {
                const loginData = res.data["User logged in Successfully"];
                const token = loginData.session.access_token;
                const userEmail = loginData.user?.email || '';
                const userId = loginData.user?.id || '';
                localStorage.setItem('token', token);
                localStorage.setItem('userEmail', userEmail);
                localStorage.setItem('userId', userId);
                navigate('/dashboard', { replace: true });
            }
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        setShowLogoutPopup(false);
        window.location.reload();
    };

    const handleCancel = () => {
        setShowLogoutPopup(false);
        navigate('/dashboard', { replace: true });
    };

    // If logged in, show logout confirmation popup
    if (isLoggedIn) {
        return (
            <>
                {/* Overlay */}
                <div className="logout-overlay" />
                <div className="logout-popup">
                    <div className="logout-popup-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#930051" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 17L21 12L16 7" stroke="#930051" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 12H9" stroke="#930051" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3>Do you want to logout?</h3>
                    <p>You are currently logged in. Are you sure you want to sign out?</p>
                    <div className="logout-popup-actions">
                        <button className="logout-btn-cancel" onClick={handleCancel}>Cancel</button>
                        <button className="logout-btn-confirm" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="auth-container">
            <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
            </form>

            <p>
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <span onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: 'pointer', color: 'blue' }}>
                    {isSignUp ? "Sign In" : "Sign Up"}
                </span>
            </p>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );

}
export default AuthPage;