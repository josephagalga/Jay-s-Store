import '../pages/styles/navbar.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { getCartCount } = useCart(); 
    const [userAuth, setUserAuth] = useState({ loggedIn: false, role: null });

    useEffect(() => {
        const token = localStorage.getItem('access');
        const role = localStorage.getItem('role');
        setUserAuth({
            loggedIn: !!token,
            role: role
        });
    }, [location]);

    const onLogout = () => {
        localStorage.clear();
        setUserAuth({ loggedIn: false, role: null });
        navigate('/login');
    };

    const isStaff = userAuth.role === 'A' || userAuth.role === 'D';

    // WHITELIST: Define the only paths where the Bag should be visible
    const shoppingPaths = ['/shop', '/cart', '/my-orders'];
    const showBag = shoppingPaths.includes(location.pathname) && !isStaff;

    return (
        <nav className="main-nav"> 
            <div className="nav-container">
                <Link to="/" className="nav-logo">HOME</Link>
                
                <div className="nav-links">
                    {!isStaff && (
                        <Link to="/shop" className="nav-item">Shop</Link>
                    )}

                    {userAuth.loggedIn && userAuth.role === 'A' && (
                        <>
                            <Link to="/admin/stock" className="nav-item">Stock Manager</Link>
                            <Link to="/admin/stats" className="nav-item">Delivery Stats</Link>
                        </>
                    )}

                    {userAuth.loggedIn && userAuth.role === 'D' && (
                        <Link to="/driver/dashboard" className="nav-item">Deliveries</Link>
                    )}

                    {userAuth.loggedIn && userAuth.role === 'C' && (
                        <Link to="/my-orders" className="nav-item">My Orders</Link>
                    )}
                </div>

                <div className="nav-actions">
                    {/* THE FINAL FIX: Only show on specific shopping pages */}
                    {showBag && (
                        <Link to="/cart" className="nav-item" style={{ marginRight: '10px' }}>
                            Bag ({getCartCount()})
                        </Link>
                    )}

                    {userAuth.loggedIn ? (
                        <button onClick={onLogout} className="logout-btn">
                            Logout ({
                                userAuth.role === 'A' ? 'Admin' : 
                                userAuth.role === 'D' ? 'Driver' : 'Customer'
                            })
                        </button>
                    ) : (
                        <>
                            <Link to="/register" className="nav-btn-outline">Join Us</Link>
                            <Link to="/login" className="nav-btn-filled">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;