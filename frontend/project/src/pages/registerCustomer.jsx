import React from 'react';
import RegisterForm from '../components/registerForm';
import { Link } from 'react-router-dom';
import './styles/customerRegister.css';


const RegisterCustomer = () => {
    return (
        <div className="auth-split-screen">
            {/* Left Side: Editorial Image */}
            <div className="auth-visual-side">
                <div className="visual-overlay"></div>
                <div className="visual-content">
                    <h2>Join the <br/> Mastery Club</h2>
                    <p>Unlock early access to seasonal drops and exclusive member-only pricing.</p>
                </div>
            </div>

            {/* Right Side: The Actual Form */}
            <div className="auth-form-side">
                <div className="form-header">
                    <Link to="/" className="back-home">← Back to Store</Link>
                    <div className="auth-tabs">
                        <Link to="/login" className="tab-link">Login</Link>
                        <Link to="/register" className="tab-link active">Register</Link>
                    </div>
                </div>

                <div className="form-container">
                    <RegisterForm 
                        title="Create Account" 
                        endpoint="auth/register/customer/" 
                        roleLabel="Customer" 
                        themeColor="#111" // Sleek black for a premium feel
                    />
                    <p className="auth-footer">
                        By signing up, you agree to our <u>Terms of Service</u>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterCustomer;