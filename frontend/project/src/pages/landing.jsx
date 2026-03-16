import React from 'react';
import { Link } from 'react-router-dom';
import './styles/landing.css';

const LandingPage = () => {
    return (
        <div className="landing">
            {/* 1. HERO SECTION */}
            <header className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <span className="hero-subtitle">ESTABLISHED 2026</span>
                    <h1>The Mastery <br/> Collection</h1>
                    <p>Where architectural precision meets street-style comfort.</p>
                    <div className="hero-btns">
                        <Link to="/register" className="btn-main">Shop Men</Link>
                        <Link to="/register" className="btn-main ghost">Shop Women</Link>
                    </div>
                </div>
            </header>

            {/* 2. STATS BAR (The Trust Builder) */}
            <section className="stats-bar">
                <div className="stat-item"><span>10k+</span> Happy Clients</div>
                <div className="stat-item"><span>24h</span> Delivery Goal</div>
                <div className="stat-item"><span>100%</span> Sustainable Cotton</div>
            </section>

            {/* 3. EDITORIAL SECTION (Visual Content) */}
            <section className="editorial-section">
                <div className="editorial-grid">
                    <div className="editorial-text">
                        <h2>Crafted for the Modern Professional</h2>
                        <p>
                            Jay’s Store isn't just a label. It's an ecosystem designed for 
                            the fast-paced life. From our logistics-first delivery model 
                            to our hand-picked inventory, every detail is engineered for excellence.
                        </p>
                        <Link to="/register" className="link-underline">Read Our Story</Link>
                    </div>
                    <div className="editorial-image">
                        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" alt="Fashion Detail" />
                    </div>
                </div>
            </section>

            {/* 4. NEW ARRIVALS PREVIEW (Teaser) */}
            <section className="featured-preview">
                <div className="section-header">
                    <h2>Latest Drops</h2>
                    <Link to="/register">View All</Link>
                </div>
                <div className="product-teaser-grid">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="teaser-card">
                            <div className="teaser-img-placeholder"></div>
                            <div className="teaser-info">
                                <span>Collection 0{item}</span>
                                <h4>Minimalist Essential</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. ROLE PORTALS (The Functional Part) */}
            <section className="portals-section">
                <h2 className="section-title">The Ecosystem</h2>
                <div className="portal-grid">
                    <Link to="/register" className="portal-card">
                        <span className="portal-num">01.</span>
                        <h3>Customer</h3>
                        <p>Secure the latest drops and manage your personal wardrobe.</p>
                    </Link>
                    <Link to="/register-driver" className="portal-card">
                        <span className="portal-num">02.</span>
                        <h3>Driver</h3>
                        <p>Turn your commute into profit. Join our elite delivery fleet.</p>
                    </Link>
                    <Link to="/login" className="portal-card">
                        <span className="portal-num">03.</span>
                        <h3>Admin</h3>
                        <p>System control, inventory oversight, and logistics management.</p>
                    </Link>
                </div>
            </section>

            {/* 6. FOOTER */}
            <footer className="main-footer">
                <div className="footer-content">
                    <div className="footer-logo">JAY'S STORE</div>
                    <div className="footer-links">
                        <Link to="/help">Support</Link>
                        <Link to="/terms">Terms</Link>
                        <Link to="/privacy">Privacy</Link>
                    </div>
                </div>
                <p className="copyright">© 2026 JAY'S STORE LOGISTICS. POWERED BY REACT + DJANGO.</p>
            </footer>
        </div>
    );
};

export default LandingPage;