import React from 'react';
import './ProcessFAQ.css';

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We dive deep into your business goals, challenges, and target audience to create a strategic roadmap.' },
  { num: '02', title: 'Design & Planning', desc: 'Our team crafts detailed wireframes, prototypes, and technical specifications aligned with your vision.' },
  { num: '03', title: 'Development', desc: 'We build your solution using modern technologies with continuous testing and quality assurance.' },
  { num: '04', title: 'Launch & Support', desc: 'Seamless deployment with ongoing maintenance, monitoring, and optimization for peak performance.' }
];

function Process() {
  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', padding: '4rem 5% 8rem', background: '#000', position: 'relative', zIndex: 10 }}>
      <div className="section-header">
        <h2>Our <span className="gradient-text">Process</span></h2>
        <p>A proven methodology that delivers results, every time</p>
      </div>
      
      <div className="process-grid">
        {processSteps.map((step, idx) => (
          <div className="process-step" key={idx}>
            <div className="step-number">{step.num}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Process;
