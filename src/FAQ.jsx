import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './ProcessFAQ.css';

const faqs = [
  { q: 'What technologies do you specialize in?', a: 'We specialize in modern web technologies including React, TypeScript, Node.js, and cloud platforms like AWS and Azure. We stay current with the latest industry trends to deliver cutting-edge solutions.' },
  { q: 'How long does a typical project take?', a: 'Project timelines vary based on scope and complexity. A standard web application typically takes 8-12 weeks from discovery to launch, while larger enterprise solutions may take 3-6 months. We provide detailed timelines during the planning phase.' },
  { q: 'Do you provide ongoing support after launch?', a: 'Yes! We offer comprehensive post-launch support including maintenance, monitoring, updates, and optimization. Our team ensures your application runs smoothly and evolves with your business needs.' },
  { q: 'What is your pricing structure?', a: 'We offer flexible pricing models including fixed-price projects, time and materials, and retainer agreements. Pricing depends on project scope, complexity, and timeline. Contact us for a detailed proposal tailored to your needs.' },
  { q: 'Can you work with our existing team?', a: 'Absolutely! We seamlessly integrate with existing teams and workflows. Whether you need full project ownership or augmentation of your current team, we adapt to your collaboration preferences.' }
];

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item" onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <h4>{faq.q}</h4>
        {isOpen ? <ChevronUp size={20} color="var(--accent-1)" /> : <ChevronDown size={20} color="var(--accent-1)" />}
      </div>
      {isOpen && (
        <div className="faq-answer">
          <p>{faq.a}</p>
        </div>
      )}
    </div>
  );
}

function FAQ() {
  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', padding: '4rem 5% 8rem', background: '#000', position: 'relative', zIndex: 10 }}>
      <div className="section-header">
        <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
        <p>Everything you need to know about working with OctaTribe</p>
      </div>
      
      <div className="faq-list">
        {faqs.map((faq, idx) => (
          <FAQItem key={idx} faq={faq} />
        ))}
      </div>
    </div>
  );
}

export default FAQ;
