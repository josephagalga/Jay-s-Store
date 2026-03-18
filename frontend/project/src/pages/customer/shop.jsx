import React, { useEffect, useState } from 'react';
import api from '../../components/axios';
import '../styles/customerShop.css'
import { useCart } from '../../context/CartContext';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('products/');
                setProducts(res.data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <p style={{ letterSpacing: '2px', fontWeight: '600' }}>LOADING COLLECTION...</p>
            </div>
        );
    }
    return (
        <div className="shop-container" style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
            <header className="shop-header" style={{ marginBottom: '60px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '-2px' }}>THE COLLECTION</h1>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Timeless pieces designed for the modern individual.</p>
            </header>

            <div className="product-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '40px' 
            }}>
                {products.length === 0 ? (
                    <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No pieces available in the vault yet.</p>
                ) : (
                    products.map((product) => (
                        <div key={product.id} className="product-card" style={{ opacity: product.stock === 0 ? 0.7 : 1 }}>
                            <div className="product-image-wrapper" style={{ 
                                position: 'relative', 
                                overflow: 'hidden', 
                                borderRadius: '12px',
                                background: '#f5f5f5',
                                aspectRatio: '3/4'
                            }}>
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease',
                                        filter: product.stock === 0 ? 'grayscale(100%)' : 'none'
                                    }} 
                                    className="hover-zoom"
                                />

                                {/* SOLD OUT OVERLAY */}
                                {product.stock === 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0, left: 0, width: '100%', height: '100%',
                                        background: 'rgba(255,255,255,0.6)',
                                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                                        zIndex: 2
                                    }}>
                                        <span style={{ 
                                            fontWeight: '900', 
                                            letterSpacing: '2px', 
                                            border: '2px solid #000', 
                                            padding: '10px 20px',
                                            background: '#fff' 
                                        }}>SOLD OUT</span>
                                    </div>
                                )}
                                
                                {/* HOVER ACTION - Only show if in stock */}
                                {product.stock > 0 && (
                                    <div className="product-overlay" style={{
                                        position: 'absolute',
                                        bottom: '0',
                                        left: '0',
                                        width: '100%',
                                        padding: '20px',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                                        opacity: '0',
                                        transition: 'opacity 0.3s',
                                        zIndex: 3
                                    }}>
                                        <button 
                                            onClick={() => addToCart(product)}
                                            className="btn-main"
                                            style={{ width: '100%', background: '#fff', color: '#000', border: 'none' }}
                                        >
                                            ADD TO BAG
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            <div className="product-info" style={{ marginTop: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: '0' }}>{product.name}</h3>
                                    <span style={{ fontWeight: '500' }}>GH₵{product.price}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                                    <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>Size: {product.size}</p>
                                    
                                    {/* STOCK INDICATORS */}
                                    {product.stock > 0 && product.stock < 5 ? (
                                        <span style={{ color: '#d97706', fontSize: '0.75rem', fontWeight: '700' }}>
                                            ONLY {product.stock} LEFT
                                        </span>
                                    ) : product.stock === 0 && (
                                        <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '700' }}>
                                            OUT OF STOCK
                                        </span>
                                    )}
                                </div>
                                
                                {/* MOBILE ACCESSIBILITY: Button visible if touch device or out of stock */}
                                {product.stock === 0 && (
                                    <button 
                                        disabled
                                        style={{ 
                                            width: '100%', 
                                            marginTop: '15px', 
                                            padding: '12px', 
                                            background: '#eee', 
                                            color: '#aaa', 
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'not-allowed',
                                            fontWeight: '700'
                                        }}
                                    >
                                        NOT AVAILABLE
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Shop;