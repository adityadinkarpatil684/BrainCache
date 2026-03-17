import React, { useState, useEffect } from 'react';
import { X, Upload, Link, FileText, Image as ImageIcon } from 'lucide-react';
import { api } from '../api';

const NOTE_TYPES = [
  { value: 'text', label: 'Text', icon: <FileText size={14} /> },
  { value: 'image', label: 'Image', icon: <ImageIcon size={14} /> },
  { value: 'link', label: 'Link', icon: <Link size={14} /> },
  { value: 'file', label: 'File', icon: <Upload size={14} /> },
];

export default function NoteModal({ note, tags, onClose, onSave, toast }) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    type: 'text',
    link_url: '',
    selectedTags: []
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (note) {
      setForm({
        title: note.title || '',
        content: note.content || '',
        type: note.type || 'text',
        link_url: note.link_url || '',
        selectedTags: note.tags?.map(t => t.id) || []
      });
      if (note.media_url) setPreview(note.media_url);
    }
  }, [note]);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    if (f.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(f));
    }
  };

  const toggleTag = (tagId) => {
    setForm(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagId)
        ? prev.selectedTags.filter(id => id !== tagId)
        : [...prev.selectedTags, tagId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.content);
      formData.append('type', form.type);
      if (form.link_url) formData.append('link_url', form.link_url);
      formData.append('tags', JSON.stringify(form.selectedTags));
      if (file) formData.append('media', file);

      if (note) {
        await api.put(`/notes/${note.id}`, formData);
        toast.success('Note updated!');
      } else {
        await api.post('/notes', formData);
        toast.success('Note created!');
      }
      onSave();
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>{note ? 'Edit Note' : 'Create Note'}</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Type selector */}
            <div className="form-group">
              <label className="form-label">Type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {NOTE_TYPES.map(t => (
                  <button
                    key={t.value}
                    type="button"
                    className={`filter-btn ${form.type === t.value ? 'active' : ''}`}
                    onClick={() => setForm(p => ({ ...p, type: t.value }))}
                    style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                className="form-input"
                placeholder="Note title..."
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea
                className="form-input"
                placeholder="Write your note here..."
                value={form.content}
                onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                rows={4}
              />
            </div>

            {form.type === 'link' && (
              <div className="form-group">
                <label className="form-label">URL</label>
                <input
                  className="form-input"
                  placeholder="https://..."
                  value={form.link_url}
                  onChange={e => setForm(p => ({ ...p, link_url: e.target.value }))}
                />
              </div>
            )}

            {(form.type === 'image' || form.type === 'file') && (
              <div className="form-group">
                <label className="form-label">Upload {form.type === 'image' ? 'Image' : 'File'}</label>
                <label className="file-upload-area">
                  {preview && form.type === 'image' ? (
                    <img src={preview} alt="preview" style={{ maxHeight: 150, borderRadius: 8 }} />
                  ) : (
                    <>
                      <Upload size={28} />
                      <p>{file ? file.name : `Click to upload ${form.type === 'image' ? 'an image' : 'a file'}`}</p>
                    </>
                  )}
                  <input type="file" style={{ display: 'none' }}
                    accept={form.type === 'image' ? 'image/*' : '*'}
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            )}

            {tags.length > 0 && (
              <div className="form-group">
                <label className="form-label">Tags</label>
                <div className="tag-selector">
                  {tags.map(tag => (
                    <button
                      key={tag.id}
                      type="button"
                      className={`tag-option ${form.selectedTags.includes(tag.id) ? 'selected' : ''}`}
                      style={form.selectedTags.includes(tag.id)
                        ? { background: tag.color, color: 'white', borderColor: tag.color }
                        : {}}
                      onClick={() => toggleTag(tag.id)}
                    >
                      <span className="tag-dot" style={{ background: form.selectedTags.includes(tag.id) ? 'white' : tag.color }} />
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : note ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
