import React from 'react';
import RegisterForm from '../components/registerForm';
import { Link } from 'react-router-dom';
import './styles/driverRegister.css';

const RegisterDriver = () => {
    return (
        <div className="fullscreen-auth">
            {/* Left Side: Image */}
            <div className="auth-visual-side driver-bg">
                <div className="visual-overlay"></div>
                <div className="visual-content">
                    <span className="brand-tag">MASTERY LOGISTICS</span>
                    <h2>Drive the <br/> Future of Fashion</h2>
                    <p>Join our elite fleet and deliver style across the city.</p>
                </div>
            </div>

            {/* Right Side: Form (White Background) */}
            <div className="auth-form-side">
                <header className="compact-header">
                    <Link to="/" className="logo-text">MASTERY</Link>
                    <span>Role: <strong>    Driver</strong></span>
                </header>
                
                <div className="form-main">
                    <RegisterForm 
                        title="Join the Fleet" 
                        endpoint="auth/register/driver/" 
                        roleLabel="Driver" 
                        themeColor="#16a34a" 
                    />
                </div>

                <footer className="compact-footer">
                    <p>Already a member? <Link to="/login">Login</Link></p>
                </footer>
            </div>
        </div>
    );
};

export default RegisterDriver;