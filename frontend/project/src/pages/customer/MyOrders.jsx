import React, { useState, useEffect } from 'react';
import api from '../../components/axios';
import '../../App.css';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyOrders = async () => {
            try {
                // Django view already filters this based on the token's user
                const res = await api.get('orders/');
                setOrders(res.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyOrders();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'P': return { color: '#d97706', bg: '#fef3c7', text: 'PENDING' };
            case 'S': return { color: '#2563eb', bg: '#dbeafe', text: 'SHIPPED' };
            case 'D': return { color: '#059669', bg: '#d1fae5', text: 'DELIVERED' };
            default: return { color: '#666', bg: '#eee', text: 'UNKNOWN' };
        }
    };

    if (loading) return <div className="loader" style={{padding: '100px', textAlign: 'center'}}>RETRIEVING YOUR ORDERS...</div>;

    return (
        <div className="orders-container" style={{ padding: '100px 40px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '40px' }}>MY ORDERS</h1>
            
            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', border: '1px dashed #ccc', borderRadius: '12px' }}>
                    <p>You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map(order => {
                        const status = getStatusStyle(order.status);
                        return (
                            <div key={order.id} style={{ 
                                border: '1px solid #eee', 
                                borderRadius: '16px', 
                                padding: '24px', 
                                marginBottom: '20px',
                                background: '#fff'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <div>
                                        <span style={{ fontSize: '0.8rem', color: '#888' }}>ORDER ID</span>
                                        <h3 style={{ margin: 0 }}>#{order.id}</h3>
                                    </div>
                                    <span style={{ 
                                        padding: '6px 16px', 
                                        borderRadius: '100px', 
                                        fontSize: '0.75rem', 
                                        fontWeight: '700',
                                        color: status.color,
                                        backgroundColor: status.bg
                                    }}>
                                        {status.text}
                                    </span>
                                </div>

                                <div className="order-items">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px' }}>
                                            <span>{item.quantity}x {item.product_details?.name || 'Product'}</span>
                                            <span>{item.price_at_purchase}</span>
                                        </div>
                                    ))}
                                </div>

                                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800' }}>
                                    <span>TOTAL</span>
                                    <span>{order.total_price}</span>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '15px' }}>
                                    Placed on: {new Date(order.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyOrders;