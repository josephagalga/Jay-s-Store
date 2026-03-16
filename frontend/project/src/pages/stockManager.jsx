import React, { useEffect, useState } from 'react';
import api from '../components/axios';
import AddProductModal from '../components/AddProductModal';
import './styles/stockManager.css';


const StockManager = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchStock();
    }, []);

    const fetchStock = async () => {
        try {
            const res = await api.get('products/');
            setProducts(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching stock:", err);
            setLoading(false);
        }
    };

    const handleUpdateStock = async (id, currentStock, change) => {
        const newQuantity = currentStock + change;
        if (newQuantity < 0) return; // Prevent negative stock

        try {
            // PATCH updates only the specific field in Django
            await api.patch(`products/${id}/`, { stock: newQuantity });
            
            // Optimistic UI update: update local state so it feels instant
            setProducts(products.map(p => 
                p.id === id ? { ...p, stock: newQuantity } : p
            ));
        } catch (err) {
            alert("Failed to update stock. Check backend permissions.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this piece from the vault?")) {
            try {
                await api.delete(`products/${id}/`);
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                alert("Error deleting product.");
            }
        }
    };

    return (
        <div className="admin-container">
            <header className="admin-header">
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>INVENTORY</h1>
                    <p style={{ color: '#666' }}>Manage your collection and stock levels.</p>
                </div>
                <button className="btn-main" onClick={() => setIsModalOpen(true)}>
                    + ADD NEW PIECE
                </button>
            </header>

            {loading ? (
                <div className="loader-container">
                    <p>Syncing with Vault...</p>
                </div>
            ) : (
                <div className="stock-table-wrapper">
                    <table className="stock-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Stock Level</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="product-cell">
                                        <img src={product.image} alt={product.name} />
                                        <span className="product-name">{product.name}</span>
                                    </td>
                                    <td><span className="size-tag">{product.size}</span></td>
                                    <td>GH₵{product.price}</td>
                                    <td>
                                        <div className="stock-controls">
                                            <button 
                                                className="qty-btn"
                                                onClick={() => handleUpdateStock(product.id, product.stock, -1)}
                                            >–</button>
                                            <span className="qty-number">{product.stock}</span>
                                            <button 
                                                className="qty-btn"
                                                onClick={() => handleUpdateStock(product.id, product.stock, 1)}
                                            >+</button>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${product.stock <= 0 ? 'out' : product.stock <= 5 ? 'low' : 'healthy'}`}>
                                            {product.stock <= 0 ? 'Out of Stock' : product.stock <= 5 ? 'Low Stock' : 'Healthy'}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal remains hidden until isModalOpen is true */}
            <AddProductModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onRefresh={fetchStock} 
            />
        </div>
    );
};

export default StockManager;