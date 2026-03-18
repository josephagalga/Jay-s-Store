import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/styles/cart.css';
import { useCart } from '../context/CartContext';


const Cart = () => {
    const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
    if (cart.length === 0) {
        return (
            <div className="admin-container" style={{ textAlign: 'center', paddingTop: '100px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>YOUR BAG IS EMPTY</h2>
                <p style={{ color: '#666', marginBottom: '30px' }}>Looks like you haven't added any pieces to your collection yet.</p>
                <Link to="/shop" className="nav-btn-filled">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="admin-container" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '40px' }}>SHOPPING BAG</h1>
            
            <div className="cart-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
                
                {/* 1. List of Items */}
                <div className="cart-items-list">
                    {cart.map(item => (
                        <div key={item.id} style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            padding: '20px 0', 
                            borderBottom: '1px solid #eee' 
                        }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <img src={item.image} alt={item.name} style={{ width: '100px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                                <div>
                                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{item.name}</h3>
                                    <p style={{ color: '#888', fontSize: '0.9rem' }}>Size: {item.size}</p>
                                    <button 
                                        onClick={() => removeFromCart(item.id)} 
                                        style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '0', fontSize: '0.8rem', textDecoration: 'underline' }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                            <div className="stock-controls">
                                <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                <span className="qty-number">{item.quantity}</span>
                                <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                            </div>

                            <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>GH₵{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                {/* 2. Order Summary */}
                <div className="order-summary" style={{ 
                    background: '#f9f9f9', 
                    padding: '30px', 
                    borderRadius: '16px', 
                    height: 'fit-content',
                    position: 'sticky',
                    top: '120px'
                }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>SUMMARY</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <span>Subtotal</span>
                        <span>GH₵{getCartTotal().toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                        <span>Shipping</span>
                        <span style={{ color: '#059669', fontWeight: '600' }}>FREE</span>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #ddd', marginBottom: '20px' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                        <strong style={{ fontSize: '1.2rem' }}>Total</strong>
                        <strong style={{ fontSize: '1.2rem' }}>GH₵{getCartTotal().toFixed(2)}</strong>
                    </div>
                    
                    <Link to="/checkout" className="btn-main" style={{ 
                        display: 'block', 
                        textAlign: 'center', 
                        background: '#000', 
                        color: '#fff', 
                        padding: '18px', 
                        borderRadius: '100px',
                        textDecoration: 'none',
                        fontWeight: '700'
                    }}>
                        PROCEED TO CHECKOUT
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;