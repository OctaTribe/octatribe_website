import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.toLowerCase() === 'info.octatribe@gmail.com' && password === 'admin123') {
      localStorage.setItem('octatribe_admin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="consulting-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="form-section" style={{ width: '100%', maxWidth: '400px' }}>
        <h2>Admin Login</h2>
        <p className="subtitle">Sign in to manage website content.</p>
        
        {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 600 }}>{error}</p>}
        
        <form className="contact-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="info.octatribe@gmail.com" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="admin123"
              required 
            />
          </div>
          <button type="submit" className="submit-btn">Login to Dashboard</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
