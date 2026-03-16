import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../components/axios';
import './styles/login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit button clicked...");

        try {
            const res = await api.post('token/', credentials);
            
            console.log("1. Full Response Data:", res.data); // Does 'role' exist here?

            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            
            const userRole = res.data.role; 
            localStorage.setItem('role', userRole);

            console.log("2. Detected Role:", userRole);

            // Conditional Navigation
            if (userRole === 'A') {
                console.log("3. Navigating to Admin...");
                navigate('/admin/stock');
            } else if (userRole === 'D') {
                console.log("3. Navigating to Driver...");
                navigate('/driver/dashboard');
            } else if (userRole === 'C') {
                console.log("3. Navigating to Shop...");
                navigate('/shop');
            } else {
                // This is the safety net!
                console.log("3. Role unknown, forcing to shop...");
                navigate('/shop');
            }
            
        } catch (err) {
            console.error("Login Error Object:", err);
            setError('Login failed. Check connection.');
        }
    };

    return (
        <div className="fullscreen-auth">
            {/* Visual Branding Side */}
            <div className="auth-visual-side login-bg">
                <div className="visual-overlay"></div>
                <div className="visual-content">
                    <span className="brand-tag">MASTERY SECURE PORTAL</span>
                    <h2>Welcome <br/> Back</h2>
                    <p>Log in to manage your deliveries, stock, or shopping bag.</p>
                </div>
            </div>

            {/* Functional Form Side */}
            <div className="auth-form-side">
                <div className="form-container-width-fix" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                    <header className="compact-header" style={{ marginBottom: '50px' }}>
                        <Link to="/" className="logo-text">MASTERY</Link>
                    </header>

                    <div className="actual-form-wrapper">
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Login</h2>
                        <p style={{ color: '#666', marginBottom: '30px' }}>Secure access to your dashboard.</p>
                        
                        {error && <p style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '0.9rem' }}>{error}</p>}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input 
                                type="text" 
                                placeholder="Username" 
                                className="aesthetic-input"
                                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                required 
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="aesthetic-input"
                                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                required 
                            />
                            <button type="submit" className="btn-main" style={{ background: '#000', color: '#fff', padding: '15px', marginTop: '10px' }}>
                                Access Account
                            </button>
                        </form>
                    </div>

                    <footer className="compact-footer" style={{ marginTop: '50px' }}>
                        <p>Need an account? <Link to="/register" className="link-bold">Sign up here</Link></p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Login;