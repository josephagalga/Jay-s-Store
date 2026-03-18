import React, { useEffect, useState } from 'react';
import api from '../components/axios';
import './styles/adminStats.css'; // Import CSS for styling

const AdminStats = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('admin/driver-stats/');
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="stats-container" style={{ padding: '20px' }}>
            <h2>Today's Delivery Performance</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                        <th style={{ padding: '10px' }}>Driver Name</th>
                        <th style={{ padding: '10px' }}>Deliveries Completed (Today)</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '10px' }}>{stat.driver__username || "Unknown Driver"}</td>
                            <td style={{ padding: '10px' }}><strong>{stat.delivery_count}</strong></td>
                        </tr>
                    ))}
                    {stats.length === 0 && (
                        <tr>
                            <td colSpan="2" style={{ padding: '20px', textAlign: 'center' }}>No deliveries made yet today.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminStats;