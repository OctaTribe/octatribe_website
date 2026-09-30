import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Services from './Services';
import Process from './Process';
import FAQ from './FAQ';
import OurWork from './OurWork';
import Blog from './Blog';
import GetConsulting from './GetConsulting';
import Login from './Login';
import Admin from './Admin';
import { Lock } from 'lucide-react';
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logo">
            <img src="/logo-icon.svg" alt="OctaTribe" className="nav-logo-icon" />
            <span style={{ color: '#5872FF', fontWeight: 800 }}>OctaTribe Pvt. Ltd.</span>
          </div>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/process">Process</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/work">Our Work</Link></li>
        </ul>
        <Link to="/get-consulting">
          <button className="btn btn-primary">Get Consulting</button>
        </Link>
      </nav>

      <div style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process" element={<Process />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/work" element={<OurWork />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/get-consulting" element={<GetConsulting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
      
      <footer className="footer-new">
        <div className="footer-top">
          <div className="footer-col brand-col">
            <h3 style={{ color: '#5872FF', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>OctaTribe</h3>
            <p>Transforming businesses through innovative technology solutions. Let's build the future together.</p>
          </div>
          <div className="footer-col links-col">
            <h4>Quick Links</h4>
            <Link to="/services">Services</Link>
            <Link to="/process">Process</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <div className="footer-col social-col">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter size={18} /></a>
              <a href="https://www.linkedin.com/company/octa-tribe/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn size={18} /></a>
              <a href="https://www.facebook.com/octatribe" target="_blank" rel="noopener noreferrer"><FaFacebookF size={18} /></a>
              <a href="http://instagram.com/octatribe/" target="_blank" rel="noopener noreferrer"><FaInstagram size={18} /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 OctaTribe. All rights reserved.</p>
          <Link to="/login" style={{ color: 'inherit', display: 'flex', alignItems: 'center', position: 'absolute', right: '0', top: '2rem' }}>
            <Lock size={12} opacity={0.3} />
          </Link>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
