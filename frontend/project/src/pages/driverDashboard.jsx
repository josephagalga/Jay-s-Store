import React, { useEffect, useState } from 'react';
import api from '../components/axios';
import './styles/driverDashboard.css'; 

const DriverDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetchOrders now uses a timestamp to force the browser to get fresh data
    const fetchOrders = async () => {
        try {
            const res = await api.get(`orders/?t=${new Date().getTime()}`);
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        try {
            // 1. Tell the backend to update
            await api.patch(`orders/${orderId}/`, { status: newStatus });
            
            // 2. IMMEDIATELY update the local React state.
            // This ensures the order moves on the screen instantly.
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.id === orderId 
                        ? { ...order, status: newStatus, driver: 'Assigned' } 
                        : order
                )
            );

            alert(newStatus === 'S' ? "Shipment Claimed!" : "Order Delivered!");
            
            // 3. Optional: Sync with DB in the background
            fetchOrders(); 
        } catch (err) {
            console.error("Update error:", err.response?.data);
            alert("Failed to update order status.");
        }
    };

    if (loading) return <div className="loader">LOADING TASKS...</div>;

    // --- LOGIC: How orders are sorted ---
    
    // Available: Status is Pending ('P') and no driver is assigned yet
    const availableOrders = orders.filter(o => o.status === 'P' && !o.driver);

    // Active Tasks: Status is Shipped ('S') 
    // We show all 'S' status orders here so they appear immediately upon claim
    const myOrders = orders.filter(o => o.status === 'S');

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Logistics Portal</h1>
            </header>

            {/* --- SECTION 1: AVAILABLE --- */}
            <section>
                <h2 className="section-title">Available Shipments</h2>
                <div className="order-grid">
                    {availableOrders.length === 0 ? (
                        <p className="empty-msg">No shipments available for pickup.</p>
                    ) : (
                        availableOrders.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-card-header">
                                    <span className="order-id">#{order.id}</span>
                                    <span className="status-badge status-ready">Ready</span>
                                </div>
                                <div className="customer-details">
                                    <p><strong>Customer:</strong> {order.customer_details?.username}</p>
                                    <p><strong>Address:</strong> {order.customer_details?.address}</p>
                                    <p><strong>Phone:</strong> 
                                        <a href={`tel:${order.customer_details?.phone_number}`}>
                                            {order.customer_details?.phone_number || 'N/A'}
                                        </a>
                                    </p>
                                </div>
                                <button 
                                    onClick={() => updateStatus(order.id, 'S')} 
                                    className="btn-claim"
                                >
                                    CLAIM SHIPMENT
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* --- SECTION 2: ACTIVE --- */}
            <section style={{ marginTop: '50px' }}>
                <h2 className="section-title">My Active Tasks (In Transit)</h2>
                <div className="task-list">
                    {myOrders.length === 0 ? (
                        <p className="empty-msg">You have no active deliveries.</p>
                    ) : (
                        myOrders.map(order => (
                            <div key={order.id} className="task-row" style={{ borderLeft: '5px solid #2563eb' }}>
                                <div className="task-info">
                                    <h3>ORDER #{order.id}</h3>
                                    <p><strong>Deliver to:</strong> {order.customer_details?.username}</p>
                                    <p><strong>Address:</strong> {order.customer_details?.address}</p>
                                    <p><strong>Contact:</strong> {order.customer_details?.phone_number}</p>
                                </div>
                                <button 
                                    onClick={() => updateStatus(order.id, 'D')} 
                                    className="btn-deliver"
                                >
                                    MARK DELIVERED
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default DriverDashboard;