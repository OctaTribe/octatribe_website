import React, { useState, useEffect } from 'react';
import { Calendar, Loader2 } from 'lucide-react';
import { supabase } from './supabaseClient';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', padding: '4rem 5% 8rem', background: '#000', position: 'relative', zIndex: 10 }}>
      <div className="section-header">
        <h2>Our <span className="gradient-text">Blog</span></h2>
        <p>Latest news, insights, and stories from our team.</p>
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--accent-1)' }}>
          <Loader2 size={40} className="animate-spin" style={{ margin: '0 auto', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : blogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Check back soon for our latest blog posts.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {blogs.map(item => (
            <div className="glass-card" key={item.id} style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '240px', width: '100%', background: '#1a1a1a' }}>
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>No Image</div>
                )}
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <Calendar size={14} /> {formatDate(item.created_at)}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6, flexGrow: 1, whiteSpace: 'pre-wrap' }}>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
