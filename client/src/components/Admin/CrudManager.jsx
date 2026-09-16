import React, { useState } from 'react';
import styles from './CrudManager.module.css';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

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
      alert("Failed to save data. Please check the console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCell = (item, column) => {
    const value = item[column.key];
    if (column.type === 'image' || column.type === 'media') {
      if (!value) return <span style={{ color: '#999', fontSize: '12px' }}>No Media</span>;
      const mediaUrl = (typeof value === 'string' && (value.startsWith('http') || value.startsWith('.'))) 
        ? value 
        : `${BASE_URL}/${String(value).replace(/^\/+/, '')}`;
      
      const isVideo = item.type === 'video' || (typeof value === 'string' && value.match(/\.(mp4|webm|ogg|mov)$/i));
      
      if (isVideo) {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <video 
              src={mediaUrl} 
              className={styles.thumbnail} 
              muted 
              preload="metadata"
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
            <span className={styles.badge} style={{ fontSize: '10px', padding: '2px 6px', background: '#3b82f6', color: '#fff', borderRadius: '4px' }}>Video</span>
          </div>
        );
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
    if (column.type === 'video') {
      return <span className={styles.badge} style={{ background: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '4px' }}>Video</span>;
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
    </div>
  );
};

export default CrudManager;
