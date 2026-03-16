import React from 'react';
import RegisterForm from '../components/registerForm';
import { Link } from 'react-router-dom';
import './styles/adminRegister.css';

const RegisterAdmin = () => {
    return (
        <div className="fullscreen-auth">
            {/* Left Side: Sophisticated Dark Visual */}
            <div className="auth-visual-side admin-bg">
                <div className="visual-overlay admin-overlay"></div>
                <div className="visual-content">
                    <span className="brand-tag">SYSTEM ADMINISTRATION</span>
                    <h2>Command & <br/> Control</h2>
                    <p>Access the core management suite. Monitor logistics, inventory, and global operations.</p>
                </div>
            </div>

            {/* Right Side: High-Contrast Form */}
            <div className="auth-form-side">
                <header className="compact-header">
                    <Link to="/" className="logo-text">MASTERY</Link>
                    <span className="badge-admin">Root Access</span>
                </header>
                
                <div className="form-main">
                    <RegisterForm 
                        title="Admin Onboarding" 
                        endpoint="auth/register/admin/" 
                        roleLabel="Administrator" 
                        themeColor="#dc2626" /* Power Red */
                    />
                </div>

                <footer className="compact-footer">
                    <p>Security Notice: All administrative actions are logged.</p>
                </footer>
            </div>
        </div>
    );
};

export default RegisterAdmin;