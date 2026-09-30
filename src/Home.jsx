import React from 'react';
import { Sparkles, TrendingUp, Cpu, Users, ArrowRight, MonitorSmartphone, Globe, Smartphone, Bot, Lightbulb, PenTool, GraduationCap, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Transforming Business with Technology</span>
          </div>
          <h1>
            Elevate Your Brand with <br/>
            <span className="gradient-text">AI-Driven Solutions</span>
          </h1>
          <p>
            We are Nepal's premier digital agency, transforming businesses through innovative digital marketing, cutting-edge AI technologies, and strategic consulting.
          </p>
          <div className="hero-btns">
            <Link to="/get-consulting">
              <button className="btn btn-primary">
                Explore Services <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <h2>Our Core <span className="gradient-text">Expertise</span></h2>
          <p>Empowering your digital journey with comprehensive technology and marketing services.</p>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <Link to="/services">
            <button className="btn btn-secondary">
              View All Our Services <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>


    </>
  );
}

export default Home;
