import React from 'react';
import { TrendingUp, Users, Globe, Smartphone, Bot, Lightbulb, PenTool, GraduationCap, ShoppingCart } from 'lucide-react';

function Services() {
  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', padding: '4rem 5% 8rem', position: 'relative', zIndex: 10 }}>
      <div className="section-header">
        <h2>Our <span className="gradient-text">Services</span></h2>
        <p>Empowering your digital journey with comprehensive technology and marketing services.</p>
      </div>
      
      <div className="grid">
        <div className="glass-card">
          <div className="card-icon"><Globe size={28} /></div>
          <h3>Web Development</h3>
          <p>Building high-performance, responsive custom web applications using modern technologies tailored to your business.</p>
        </div>
        
        <div className="glass-card">
          <div className="card-icon"><Smartphone size={28} /></div>
          <h3>App Development</h3>
          <p>Creating seamless native and cross-platform mobile applications that deliver exceptional user experiences.</p>
        </div>

        <div className="glass-card">
          <div className="card-icon"><Bot size={28} /></div>
          <h3>AI Agent Development</h3>
          <p>Building intelligent AI agents and systems to automate complex business workflows and enhance productivity.</p>
        </div>
        
        <div className="glass-card">
          <div className="card-icon"><Lightbulb size={28} /></div>
          <h3>AI Consulting</h3>
          <p>Providing strategic, expert guidance for integrating artificial intelligence into your existing operations smoothly.</p>
        </div>

        <div className="glass-card">
          <div className="card-icon"><TrendingUp size={28} /></div>
          <h3>Digital Marketing</h3>
          <p>Implementing data-driven strategies and campaigns to increase brand visibility, drive traffic, and maximize ROI.</p>
        </div>
        
        <div className="glass-card">
          <div className="card-icon"><Users size={28} /></div>
          <h3>Social Media Management</h3>
          <p>Building loyal communities and amplifying your brand voice with targeted strategies across all major platforms.</p>
        </div>

        <div className="glass-card">
          <div className="card-icon"><ShoppingCart size={28} /></div>
          <h3>E-commerce Support</h3>
          <p>Scaling online stores with optimized user journeys, conversion rate optimization, and dedicated support.</p>
        </div>

        <div className="glass-card">
          <div className="card-icon"><PenTool size={28} /></div>
          <h3>Content Creation</h3>
          <p>Developing compelling content strategies and creative material designed to engage and convert your target audience.</p>
        </div>

        <div className="glass-card">
          <div className="card-icon"><GraduationCap size={28} /></div>
          <h3>Digital Learning</h3>
          <p>Through OctaTribe Digital School, we provide professional development and training in the latest digital skills.</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
