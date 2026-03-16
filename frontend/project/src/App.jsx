import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterCustomer from './pages/registerCustomer';
import RegisterDriver from './pages/registerDriver';
import RegisterAdmin from './pages/registerAdmin';
import Login from './pages/login';
import LandingPage from './pages/landing';
import Shop from './pages/customer/shop';
import './App.css';
import Navbar from './components/navbar';
import StockManager from './pages/stockManager';
import AdminRoute from './components/AdminRoute';
import DriverDashboard from './pages/driverDashboard';
import { CartProvider } from './context/CartContext';
import Cart from './components/cart'; // Import the Cart component
import Checkout from './pages/customer/Checkout'; // Import the Checkout component
import MyOrders from './pages/customer/MyOrders'; // Import the MyOrders component
import AdminStats from './pages/AdminStats'; // Import the AdminStats component

function App() {
    return (
        <CartProvider>
            <Router>
                <Navbar />
                <Routes>
                    {/* Each role has its own door */}
                    <Route path="/cart" element={<Cart />} /> {/* Add this line */}
                    <Route path="/checkout" element={<Checkout />} /> {/* Add this line */}
                    <Route path="/register" element={<RegisterCustomer />} />
                    <Route path="/register-driver" element={<RegisterDriver />} />
                    <Route path="/register-admin" element={<RegisterAdmin />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/admin/stock" element={<AdminRoute><StockManager /></AdminRoute>} />
                    <Route path="/driver/dashboard" element={<DriverDashboard />} />
                    <Route path="/admin/stats" element={<AdminRoute><AdminStats /></AdminRoute>} /> {/* Add this line */}
                    <Route path="/my-orders" element={<MyOrders />} /> {/* Add this line */}
                </Routes>
            </Router>
        </CartProvider> 
    );
}

export default App;