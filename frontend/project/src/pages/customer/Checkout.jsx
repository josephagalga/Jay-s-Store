import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import api from '../../components/axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            // Prepare data to match your Django OrderSerializer
            const orderData = {
                items: cart.map(item => ({
                    product: item.id,
                    quantity: item.quantity
                }))
            };

            const res = await api.post('orders/', orderData);
            
            if (res.status === 201) {
                alert("Order Placed Successfully!");
                clearCart(); // Wipe the cart after success
                navigate('/shop'); // Redirect to shop or a 'Success' page
            }
        } catch (err) {
            console.error("Order Failed:", err.response?.data);
            alert("Checkout failed. Make sure you are logged in.");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) return <div className="admin-container">Your bag is empty.</div>;
    return (
        <div className="admin-container" style={{ maxWidth: '600px', margin: '80px auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '30px' }}>FINAL CHECKOUT</h2>
            
            <div className="checkout-summary" style={{ background: '#f9f9f9', padding: '30px', borderRadius: '12px' }}>
                {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>{item.name} (x{item.quantity})</span>
                        <span>GH₵{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <hr style={{ margin: '20px 0', borderColor: '#eee' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '800' }}>
                    <span>Total Amount</span>
                    <span>GH₵{getCartTotal().toFixed(2)}</span>
                </div>
            </div>

            <button 
                className="btn-main" 
                onClick={handlePlaceOrder}
                disabled={loading}
                style={{ 
                    width: '100%', 
                    marginTop: '30px', 
                    background: '#000', 
                    color: '#fff', 
                    padding: '20px', 
                    borderRadius: '100px',
                    border: 'none',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? "PROCESSING..." : "CONFIRM ORDER"}
            </button>
        </div>
    );
};

export default Checkout;