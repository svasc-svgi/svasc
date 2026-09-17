import React, { useState } from 'react';
import styles from './CrudManager.module.css';
import { Plus, Edit2, Trash2, X, Play } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const CrudManager = ({ 
  title, 
  data, 
  columns, 
  onSave, 
  onDelete, 
  renderForm, 
  initialFormState = {} 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewVideoUrl, setPreviewVideoUrl] = useState(null);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item._id || item.ID || item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData, editingId);
      handleCloseModal();
    } catch (error) {
      console.error("Error saving data:", error);
      alert(error.message || "Failed to save data. Please check the console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderVideoThumbnail = (mediaUrl) => (
    <div 
      onClick={() => setPreviewVideoUrl(mediaUrl)}
      title="Click to preview video"
      style={{
        position: 'relative',
        width: '64px',
        height: '42px',
        borderRadius: '6px',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#0f172a',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #cbd5e1',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <video 
        src={mediaUrl} 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        muted 
        preload="metadata"
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s ease',
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '50%',
          width: '22px',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          <Play size={11} fill="#0f172a" color="#0f172a" style={{ marginLeft: '1px' }} />
        </div>
      </div>
    </div>
  );

  const renderCell = (item, column) => {
    const value = item[column.key];

    if (column.type === 'video') {
      if (!value) return <span style={{ color: '#999', fontSize: '12px' }}>No Video</span>;
      const mediaUrl = (typeof value === 'string' && (value.startsWith('http') || value.startsWith('.'))) 
        ? value 
        : `${BASE_URL}/${String(value).replace(/^\/+/, '')}`;
      return renderVideoThumbnail(mediaUrl);
    }

    if (column.type === 'image' || column.type === 'media') {
      if (!value) return <span style={{ color: '#999', fontSize: '12px' }}>No Media</span>;
      const mediaUrl = (typeof value === 'string' && (value.startsWith('http') || value.startsWith('.'))) 
        ? value 
        : `${BASE_URL}/${String(value).replace(/^\/+/, '')}`;
      
      const isVideo = item.type === 'video' || (typeof value === 'string' && value.match(/\.(mp4|webm|ogg|mov)$/i));
      
      if (isVideo) {
        return renderVideoThumbnail(mediaUrl);
      }

      return (
        <img 
          src={mediaUrl} 
          alt="thumbnail" 
          className={styles.thumbnail} 
          onError={(e) => { 
            e.target.src = 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg'; 
          }} 
        />
      );
    }

    if (column.type === 'text') {
       return <span className={styles.truncate}>{value || '-'}</span>;
    }
    return value || '-';
  };

  return (
    <div className={styles.crudWrapper}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <button className={styles.addButton} onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add New
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={idx}>
                  {columns.map((col, cIdx) => (
                    <td key={cIdx}>{renderCell(item, col)}</td>
                  ))}
                  <td className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => handleOpenModal(item)}>
                      <Edit2 size={16} />
                    </button>
                    <button className={styles.deleteBtn} onClick={() => {
                      if (window.confirm('Are you sure you want to delete this item?')) {
                        onDelete(item._id || item.ID || item.id);
                      }
                    }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className={styles.noData}>
                  No items found. Click "Add New" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? 'Edit' : 'Add New'} {title}</h3>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.modalBody}>
              {renderForm(formData, setFormData)}
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={handleCloseModal} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? '⏳ Uploading & Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {previewVideoUrl && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1.5rem'
          }}
          onClick={() => setPreviewVideoUrl(null)}
        >
          <div 
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '12px',
              maxWidth: '800px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid #334155'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              borderBottom: '1px solid #1e293b',
              color: '#f8fafc'
            }}>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Video Preview</span>
              <button 
                onClick={() => setPreviewVideoUrl(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '6px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#000' }}>
              <video 
                src={previewVideoUrl} 
                controls 
                autoPlay 
                style={{
                  width: '100%',
                  maxHeight: '65vh',
                  borderRadius: '6px',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudManager;
