import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Image as ImageIcon, LogOut, CheckCircle, Briefcase, FileText, List, Trash2, Edit2, Save, X, Loader2, MessageSquare } from 'lucide-react';
import { supabase } from './supabaseClient';

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('work'); 
  
  // Blog State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isPublishingBlog, setIsPublishingBlog] = useState(false);

  // Portfolio Work State
  const [workTitle, setWorkTitle] = useState('');
  const [workDesc, setWorkDesc] = useState('');
  const [workLink, setWorkLink] = useState('');
  const [workImage, setWorkImage] = useState(null);
  const [workSuccess, setWorkSuccess] = useState(false);
  const [isPublishingWork, setIsPublishingWork] = useState(false);

  // Manage Portfolio State
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editLink, setEditLink] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false);

  // Manage Blog State
  const [blogItems, setBlogItems] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editBlogTitle, setEditBlogTitle] = useState('');
  const [editBlogContent, setEditBlogContent] = useState('');
  const [editBlogImage, setEditBlogImage] = useState(null);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem('octatribe_admin') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'manage') {
      fetchPortfolio();
    } else if (activeTab === 'manage_blog') {
      fetchBlogs();
    } else if (activeTab === 'inquiries') {
      fetchInquiries();
    }
  }, [activeTab]);

  const fetchPortfolio = async () => {
    setIsLoadingPortfolio(true);
    const { data } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
    setPortfolioItems(data || []);
    setIsLoadingPortfolio(false);
  };

  const fetchBlogs = async () => {
    setIsLoadingBlogs(true);
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    setBlogItems(data || []);
    setIsLoadingBlogs(false);
  };

  const fetchInquiries = async () => {
    setIsLoadingInquiries(true);
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    setInquiries(data || []);
    setIsLoadingInquiries(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('octatribe_admin');
    navigate('/');
  };

  // Image to Base64 (Using this for MVP since Supabase Storage requires manual setup by user)
  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Blog Handlers
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setIsPublishingBlog(true);
    
    const { error } = await supabase.from('blogs').insert([
      { title: title, content: description, image_url: imagePreview }
    ]);

    setIsPublishingBlog(false);

    if (!error) {
      setSuccess(true);
      setTitle('');
      setDescription('');
      setImagePreview(null);
      setTimeout(() => setSuccess(false), 4000);
    } else {
      alert("Error saving blog: " + error.message);
    }
  };

  // Portfolio Handlers
  const handleWorkSubmit = async (e) => {
    e.preventDefault();
    setIsPublishingWork(true);

    const { error } = await supabase.from('portfolio').insert([
      { title: workTitle, description: workDesc, link: workLink, image_url: workImage }
    ]);

    setIsPublishingWork(false);

    if (!error) {
      setWorkSuccess(true);
      setWorkTitle('');
      setWorkDesc('');
      setWorkLink('');
      setWorkImage(null);
      setTimeout(() => setWorkSuccess(false), 4000);
    } else {
      alert("Error saving project: " + error.message);
    }
  };

  // Manage Portfolio Handlers
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project? This cannot be undone.")) {
      const { error } = await supabase.from('portfolio').delete().eq('id', id);
      if (!error) {
        setPortfolioItems(portfolioItems.filter(item => item.id !== id));
      }
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditDesc(item.description);
    setEditLink(item.link || '');
    setEditImage(item.image_url);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('portfolio')
      .update({ title: editTitle, description: editDesc, link: editLink, image_url: editImage })
      .eq('id', editingId);

    if (!error) {
      fetchPortfolio();
      setEditingId(null);
    } else {
      alert("Error updating: " + error.message);
    }
  };

  // Manage Blog Handlers
  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post? This cannot be undone.")) {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (!error) {
        setBlogItems(blogItems.filter(item => item.id !== id));
      }
    }
  };

  const startEditBlog = (item) => {
    setEditingBlogId(item.id);
    setEditBlogTitle(item.title);
    setEditBlogContent(item.content);
    setEditBlogImage(item.image_url);
  };

  const saveEditBlog = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('blogs')
      .update({ title: editBlogTitle, content: editBlogContent, image_url: editBlogImage })
      .eq('id', editingBlogId);

    if (!error) {
      fetchBlogs();
      setEditingBlogId(null);
    } else {
      alert("Error updating: " + error.message);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', padding: '4rem 5%', background: '#000' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto 2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('work')} className={`btn ${activeTab === 'work' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          <Briefcase size={16} /> Add Portfolio
        </button>
        <button onClick={() => setActiveTab('manage')} className={`btn ${activeTab === 'manage' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          <List size={16} /> Manage Portfolio
        </button>
        <button onClick={() => setActiveTab('blog')} className={`btn ${activeTab === 'blog' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          <FileText size={16} /> Create Blog
        </button>
        <button onClick={() => setActiveTab('manage_blog')} className={`btn ${activeTab === 'manage_blog' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          <List size={16} /> Manage Blogs
        </button>
        <button onClick={() => setActiveTab('inquiries')} className={`btn ${activeTab === 'inquiries' ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          <MessageSquare size={16} /> Inquiries
        </button>
      </div>

      {activeTab === 'work' && (
        <div className="form-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3>Add New Portfolio Project</h3>
          <p className="subtitle" style={{ marginBottom: '1.5rem' }}>Upload recent work to display on the "Our Work" page.</p>
          
          {workSuccess && (
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ade80', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} />
              Portfolio project successfully added!
            </div>
          )}

          <form className="contact-form" onSubmit={handleWorkSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Project Title *</label>
                <input type="text" value={workTitle} onChange={(e) => setWorkTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Project Link (Optional)</label>
                <input type="url" value={workLink} onChange={(e) => setWorkLink(e.target.value)} />
              </div>
            </div>
            
            <div className="form-group">
              <label>Project Image *</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1a1a1a', border: '1px solid #27272a', padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
                  <ImageIcon size={18} color="var(--accent-1)" />
                  <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.95rem' }}>Upload Image</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setWorkImage)} style={{ display: 'none' }} required />
                </label>
                {workImage && <img src={workImage} alt="Preview" style={{ height: '48px', width: 'auto', borderRadius: '4px', border: '1px solid #27272a' }} />}
              </div>
            </div>

            <div className="form-group">
              <label>Project Description *</label>
              <textarea value={workDesc} onChange={(e) => setWorkDesc(e.target.value)} rows="5" required></textarea>
            </div>
            
            <button type="submit" className="submit-btn" style={{ width: 'fit-content', opacity: isPublishingWork ? 0.7 : 1 }} disabled={isPublishingWork}>
              {isPublishingWork ? <Loader2 size={18} className="animate-spin" /> : <PlusCircle size={18} />}
              {isPublishingWork ? 'Publishing...' : 'Publish Project'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'manage' && (
        <div className="form-section" style={{ maxWidth: '800px', margin: '0 auto', background: 'transparent', border: 'none', padding: 0 }}>
          <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '2.5rem' }}>
            <h3>Manage Portfolio Projects</h3>
            <p className="subtitle" style={{ marginBottom: '1.5rem' }}>Edit or remove projects from the database.</p>
            
            {isLoadingPortfolio ? (
               <p style={{ color: 'var(--text-secondary)' }}>Loading projects...</p>
            ) : portfolioItems.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No projects found in the library.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {portfolioItems.map(item => (
                  <div key={item.id} style={{ border: '1px solid #27272a', borderRadius: '8px', background: '#000', overflow: 'hidden' }}>
                    
                    {editingId === item.id ? (
                      <form onSubmit={saveEdit} style={{ padding: '1.5rem' }}>
                        <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Edit Project</h4>
                        <div className="form-row" style={{ marginBottom: '1rem' }}>
                          <div className="form-group">
                            <label>Title</label>
                            <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} required />
                          </div>
                          <div className="form-group">
                            <label>Link</label>
                            <input type="url" value={editLink} onChange={e => setEditLink(e.target.value)} />
                          </div>
                        </div>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                          <label>Description</label>
                          <textarea value={editDesc} onChange={e => setEditDesc(e.target.value)} rows="3" required></textarea>
                        </div>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                          <label>Replace Image (Optional)</label>
                          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1a1a1a', border: '1px solid #27272a', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
                              <ImageIcon size={16} color="var(--accent-1)" />
                              <span style={{ color: '#fff', fontSize: '0.9rem' }}>Upload New</span>
                              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setEditImage)} style={{ display: 'none' }} />
                            </label>
                            {editImage && <img src={editImage} alt="Preview" style={{ height: '40px', borderRadius: '4px' }} />}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Save size={16} /> Save Changes</button>
                          <button type="button" onClick={() => setEditingId(null)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><X size={16} /> Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.5rem', gap: '1.5rem' }}>
                        <div style={{ width: '80px', height: '60px', background: '#1a1a1a', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                          {item.image_url ? <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#555' }}>No Img</span>}
                        </div>
                        <div style={{ flexGrow: 1 }}>
                          <h4 style={{ color: '#fff', marginBottom: '0.25rem', fontSize: '1.1rem' }}>{item.title}</h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                          <button onClick={() => startEdit(item)} style={{ background: '#1a1a1a', border: '1px solid #27272a', color: '#fff', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer' }} title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(item.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer' }} title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'blog' && (
        <div className="form-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3>Create New Blog Post</h3>
          <p className="subtitle" style={{ marginBottom: '1.5rem' }}>Publish new content to the database.</p>
          
          {success && (
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ade80', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} />
              Post successfully published!
            </div>
          )}

          <form className="contact-form" onSubmit={handleBlogSubmit}>
            <div className="form-group">
              <label>Post Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            
            <div className="form-group">
              <label>Cover Image</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1a1a1a', border: '1px solid #27272a', padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
                  <ImageIcon size={18} color="var(--accent-1)" />
                  <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.95rem' }}>Upload Featured Image</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImagePreview)} style={{ display: 'none' }} />
                </label>
                {imagePreview && <img src={imagePreview} alt="Preview" style={{ height: '48px', width: 'auto', borderRadius: '4px', border: '1px solid #27272a' }} />}
              </div>
            </div>

            <div className="form-group">
              <label>Post Content *</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="10" required></textarea>
            </div>
            
            <button type="submit" className="submit-btn" style={{ width: 'fit-content', opacity: isPublishingBlog ? 0.7 : 1 }} disabled={isPublishingBlog}>
              {isPublishingBlog ? <Loader2 size={18} className="animate-spin" /> : <PlusCircle size={18} />}
              {isPublishingBlog ? 'Publishing...' : 'Publish Post'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'manage_blog' && (
        <div className="form-section" style={{ maxWidth: '800px', margin: '0 auto', background: 'transparent', border: 'none', padding: 0 }}>
          <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '2.5rem' }}>
            <h3>Manage Blog Posts</h3>
            <p className="subtitle" style={{ marginBottom: '1.5rem' }}>Edit or remove published posts from the database.</p>
            
            {isLoadingBlogs ? (
              <p style={{ color: 'var(--text-secondary)' }}>Loading blogs...</p>
            ) : blogItems.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No blog posts found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {blogItems.map(item => (
                  <div key={item.id} style={{ border: '1px solid #27272a', borderRadius: '8px', background: '#000', overflow: 'hidden' }}>
                    
                    {editingBlogId === item.id ? (
                      <form onSubmit={saveEditBlog} style={{ padding: '1.5rem' }}>
                        <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Edit Blog Post</h4>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                          <label>Post Title</label>
                          <input type="text" value={editBlogTitle} onChange={e => setEditBlogTitle(e.target.value)} required />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                          <label>Post Content</label>
                          <textarea value={editBlogContent} onChange={e => setEditBlogContent(e.target.value)} rows="5" required></textarea>
                        </div>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                          <label>Replace Featured Image (Optional)</label>
                          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1a1a1a', border: '1px solid #27272a', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
                              <ImageIcon size={16} color="var(--accent-1)" />
                              <span style={{ color: '#fff', fontSize: '0.9rem' }}>Upload New</span>
                              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setEditBlogImage)} style={{ display: 'none' }} />
                            </label>
                            {editBlogImage && <img src={editBlogImage} alt="Preview" style={{ height: '40px', borderRadius: '4px' }} />}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Save size={16} /> Save</button>
                          <button type="button" onClick={() => setEditingBlogId(null)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><X size={16} /> Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.5rem', gap: '1.5rem' }}>
                        <div style={{ width: '80px', height: '60px', background: '#1a1a1a', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                          {item.image_url ? <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#555' }}>No Img</span>}
                        </div>
                        <div style={{ flexGrow: 1 }}>
                          <h4 style={{ color: '#fff', marginBottom: '0.25rem', fontSize: '1.1rem' }}>{item.title}</h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.content}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                          <button onClick={() => startEditBlog(item)} style={{ background: '#1a1a1a', border: '1px solid #27272a', color: '#fff', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer' }} title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDeleteBlog(item.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer' }} title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'inquiries' && (
        <div className="form-section" style={{ maxWidth: '800px', margin: '0 auto', background: 'transparent', border: 'none', padding: 0 }}>
          <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '2.5rem' }}>
            <h3>Client Inquiries</h3>
            <p className="subtitle" style={{ marginBottom: '1.5rem' }}>Messages sent from the "Get Consulting" form.</p>
            
            {isLoadingInquiries ? (
              <p style={{ color: 'var(--text-secondary)' }}>Loading inquiries...</p>
            ) : inquiries.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No messages yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {inquiries.map(msg => (
                  <div key={msg.id} style={{ border: '1px solid #27272a', borderRadius: '8px', background: '#000', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <h4 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>{msg.full_name}</h4>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <div><strong>Email:</strong> <a href={`mailto:${msg.email}`} style={{ color: 'var(--accent-1)', textDecoration: 'none' }}>{msg.email}</a></div>
                      {msg.phone && <div><strong>Phone:</strong> {msg.phone}</div>}
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {msg.company && <div><strong>Company:</strong> {msg.company}</div>}
                      <div><strong>Service:</strong> {msg.service}</div>
                    </div>

                    <div style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '6px', color: '#ccc', fontSize: '0.95rem', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
