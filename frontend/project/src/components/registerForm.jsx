import React, { useState } from 'react';
import api from '../components/axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ title, endpoint, roleLabel, themeColor }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone_number: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(endpoint, formData);
            alert(`${roleLabel} Registered Successfully!`);
            navigate('/login');
        } catch (err) {
            console.error(err.response?.data);
            alert("Registration failed. Please check your details.");
        }
    };

    return (
        <div className="auth-container" style={{ borderTop: `6px solid ${themeColor}` }}>
            <h2 style={{ color: themeColor }}>{title}</h2>
            <p>Creating a new <strong>{roleLabel}</strong> account</p>
            
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <input name="phone_number" placeholder="Phone Number" onChange={handleChange} />
                <textarea name="address" placeholder="Residential/Delivery Address" onChange={handleChange} required />
                
                <button type="submit" style={{ backgroundColor: themeColor, color: 'white' }}>
                    Register as {roleLabel}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;