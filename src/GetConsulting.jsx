import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from './supabaseClient';
import './GetConsulting.css';

function GetConsulting() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // 1. Send Email Alert via Web3Forms
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "a1ac2823-55ef-4ffc-ae37-b18a8d794078",
          subject: `New Consulting Inquiry from ${formData.fullName}`,
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone || "Not provided",
          company: formData.company || "Not provided",
          service: formData.service,
          message: formData.message
        }),
      });
    } catch (err) {
      console.error("Failed to send email alert:", err);
    }

    // 2. Save to Supabase Dashboard
    const { error: dbError } = await supabase.from('contact_messages').insert([
      {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        message: formData.message
      }
    ]);

    setIsSubmitting(false);

    if (dbError) {
      console.error(dbError);
      setError("Something went wrong. Please try again.");
    } else {
      setIsSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <div className="consulting-container">
      <div className="consulting-grid">
        
        {/* Left Column: Form */}
        <div className="form-section">
          <h2>Send us a message</h2>
          <p className="subtitle">Fill out the form and our team will get back to you shortly.</p>
          
          {isSuccess && (
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ade80', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} />
              Message sent successfully! We'll be in touch soon.
            </div>
          )}

          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              {error}
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your Company" />
              </div>
            </div>
            
            <div className="form-group">
              <label>Service Interested In *</label>
              <select name="service" value={formData.service} onChange={handleChange} required>
                <option value="" disabled>Select a service</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="AI Solutions">AI Solutions</option>
                <option value="Social Media Management">Social Media Management</option>
                <option value="Web & App Development">Web & App Development</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Message *</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project and requirements..." rows="5" required></textarea>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Right Column: Info Cards */}
        <div className="info-section">
          <div className="info-card">
            <h3>Contact Information</h3>
            <p className="card-subtitle">Get in touch with us directly</p>
            
            <div className="info-item">
              <div className="info-icon"><Mail size={20} /></div>
              <div className="info-text">
                <strong>Email</strong>
                <span>info.octatribe@gmail.com</span>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon"><Phone size={20} /></div>
              <div className="info-text">
                <strong>Phone</strong>
                <span>+977-9811247700</span>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon"><MapPin size={20} /></div>
              <div className="info-text">
                <strong>Location</strong>
                <span>Tripureshwor Kathmandu<br/>Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
          
          <div className="info-card quick-response">
            <h4>Quick Response</h4>
            <p>We typically respond within 24 hours during business days. For urgent inquiries, please call us directly.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default GetConsulting;
