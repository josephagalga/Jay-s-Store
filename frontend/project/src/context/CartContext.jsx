import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('mastery_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('mastery_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            
            if (existingItem) {
                // CHECK: Is the user trying to add more than available stock?
                if (existingItem.quantity >= product.stock) {
                    alert(`Cannot add more. Only ${product.stock} available in stock.`);
                    return prevCart;
                }
                return prevCart.map((item) =>
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );
            }
            // First time adding: Ensure stock is at least 1
            if (product.stock > 0) {
                return [...prevCart, { ...product, quantity: 1 }];
            }
            return prevCart;
        });
    };

    const updateQuantity = (productId, delta) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === productId) {
                    const newQty = item.quantity + delta;

                    // 1. Minimum limit
                    if (newQty < 1) return item;

                    // 2. MAXIMUM STOCK LIMIT
                    // We check against item.stock (which we saved in the cart object)
                    if (newQty > item.stock) {
                        alert(`Limit reached. Only ${item.stock} items available.`);
                        return item;
                    }

                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => setCart([]);

    const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);

    const getCartTotal = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            updateQuantity, 
            removeFromCart, 
            getCartCount, 
            getCartTotal,
            clearCart 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);