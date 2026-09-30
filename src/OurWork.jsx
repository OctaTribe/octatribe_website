import React, { useState, useEffect } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from './supabaseClient';

function OurWork() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPortfolio(data || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', padding: '4rem 5% 8rem', background: '#000', position: 'relative', zIndex: 10 }}>
      <div className="section-header">
        <h2>Our <span className="gradient-text">Work</span></h2>
        <p>Explore our recent projects and success stories.</p>
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--accent-1)' }}>
          <Loader2 size={40} className="animate-spin" style={{ margin: '0 auto', animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>
      ) : portfolio.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Check back soon to see our latest projects.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {portfolio.map(item => (
            <div className="glass-card" key={item.id} style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '240px', width: '100%', background: '#1a1a1a' }}>
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>No Image</div>
                )}
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6, flexGrow: 1 }}>{item.description}</p>
                
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ 
                    color: 'var(--accent-1)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
                    textDecoration: 'none', fontWeight: 600, marginTop: 'auto'
                  }}>
                    View Project <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OurWork;
