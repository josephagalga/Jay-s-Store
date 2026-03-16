import React, { useState } from 'react';
import api from './axios';
import '../pages/styles/AddProductModal.css';

const AddProductModal = ({ isOpen, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        name: '', price: '', stock: '', size: 'M'
    });
    const [image, setImage] = useState(null);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('stock', formData.stock);
        data.append('size', formData.size);
        if (image) data.append('image', image);

        try {
            await api.post('products/', data);
            onRefresh(); // Refresh the table behind the modal
            onClose();   // Close modal
        } catch (err) {
            alert("Error adding piece to vault.");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <header className="modal-header">
                    <h2>Add New Piece</h2>
                    <button className="close-x" onClick={onClose}>&times;</button>
                </header>

                <form onSubmit={handleSubmit} className="modal-form">
                    <input type="text" placeholder="Product Name" required
                        onChange={e => setFormData({...formData, name: e.target.value})} />
                    
                    <div className="input-group">
                        <input type="number" placeholder="Price" required
                            onChange={e => setFormData({...formData, price: e.target.value})} />
                        <input type="number" placeholder="Stock" required
                            onChange={e => setFormData({...formData, stock: e.target.value})} />
                    </div>

                    <select onChange={e => setFormData({...formData, size: e.target.value})}>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                        <option value="XL">Extra Large</option>
                    </select>

                    <div className="file-upload">
                        <label>Product Image</label>
                        <input type="file" onChange={e => setImage(e.target.files[0])} required />
                    </div>

                    <button type="submit" className="btn-main">Add to Collection</button>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;