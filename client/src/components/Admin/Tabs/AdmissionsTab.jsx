import React, { useState } from 'react';
import {
  BellRing,
  CheckCheck,
  Eye,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  User,
  X,
  GraduationCap,
  Clock
} from 'lucide-react';
import styles from '../CrudManager.module.css';

const STATUS_COLORS = {
  New: { bg: '#fef3c7', text: '#b45309', border: '#fcd34d' },
  Contacted: { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd' },
  Admitted: { bg: '#dcfce7', text: '#15803d', border: '#86efac' },
  Archived: { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' },
};

const formatDateTime = (iso) => {
  if (!iso) return 'Just now';
  try {
    return new Date(iso).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch (e) {
    return iso;
  }
};

const AdmissionsTab = ({
  admissions = [],
  unreadCount = 0,
  loading = false,
  onRefresh,
  onMarkRead,
  onMarkAllRead,
  onUpdateStatus,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = admissions.filter((item) => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (item.studentName || '').toLowerCase().includes(q) ||
      (item.phone || '').toLowerCase().includes(q) ||
      (item.email || '').toLowerCase().includes(q) ||
      (item.course || '').toLowerCase().includes(q) ||
      (item.city || '').toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleOpenDetail = async (item) => {
    setSelectedItem(item);
    if (!item.isRead && onMarkRead) {
      await onMarkRead(item._id);
    }
  };

  const countByStatus = (st) => admissions.filter((a) => a.status === st).length;

  return (
    <div>
      {/* Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '8px',
            padding: '1.1rem 1.25rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            borderLeft: '4px solid #002147',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>TOTAL APPLICATIONS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#002147', marginTop: '4px' }}>
            {admissions.length}
          </div>
        </div>

        <div
          style={{
            background: unreadCount > 0 ? '#fffbeb' : '#fff',
            borderRadius: '8px',
            padding: '1.1rem 1.25rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            borderLeft: `4px solid ${unreadCount > 0 ? '#dc2626' : '#f89e20'}`,
          }}
        >
          <div style={{ fontSize: '0.8rem', color: unreadCount > 0 ? '#b91c1c' : '#64748b', fontWeight: 700 }}>
            UNREAD ALERTS
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: unreadCount > 0 ? '#dc2626' : '#002147', marginTop: '4px' }}>
            {unreadCount}
          </div>
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: '8px',
            padding: '1.1rem 1.25rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            borderLeft: '4px solid #2563eb',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>CONTACTED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1d4ed8', marginTop: '4px' }}>
            {countByStatus('Contacted')}
          </div>
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: '8px',
            padding: '1.1rem 1.25rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            borderLeft: '4px solid #16a34a',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>ADMITTED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#15803d', marginTop: '4px' }}>
            {countByStatus('Admitted')}
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className={styles.crudWrapper}>
        <div
          className={styles.header}
          style={{ flexWrap: 'wrap', gap: '1rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BellRing size={20} color="#f89e20" />
            <h2>Admission Inquiries ({filtered.length})</h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={15}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                }}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search student, phone, course..."
                style={{
                  padding: '0.45rem 0.75rem 0.45rem 2rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.88rem',
                  minWidth: '220px',
                }}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '0.45rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.88rem',
                width: 'auto',
              }}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Admitted">Admitted</option>
              <option value="Archived">Archived</option>
            </select>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className={styles.addButton}
                style={{ backgroundColor: '#002147' }}
              >
                <CheckCheck size={16} />
                Mark All Read
              </button>
            )}

            <button
              type="button"
              onClick={onRefresh}
              className={styles.addButton}
              disabled={loading}
            >
              <RefreshCw size={16} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Submitted</th>
                <th>Student</th>
                <th>Contact</th>
                <th>Course & Qualification</th>
                <th>City</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const badgeStyle = STATUS_COLORS[item.status] || STATUS_COLORS.New;
                return (
                  <tr
                    key={item._id}
                    style={{
                      backgroundColor: !item.isRead ? '#fffbeb' : 'transparent',
                      fontWeight: !item.isRead ? 600 : 400,
                    }}
                  >
                    <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem', color: '#475569' }}>
                      {!item.isRead && (
                        <span
                          style={{
                            display: 'inline-block',
                            background: '#dc2626',
                            color: '#fff',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '9999px',
                            marginRight: '6px',
                          }}
                        >
                          NEW
                        </span>
                      )}
                      {formatDateTime(item.createdAt)}
                    </td>

                    <td>
                      <div style={{ color: '#0f172a', fontWeight: 600 }}>{item.studentName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.email}</div>
                    </td>

                    <td style={{ whiteSpace: 'nowrap' }}>
                      <a
                        href={`tel:${item.phone}`}
                        style={{ color: '#002147', textDecoration: 'none', fontWeight: 600 }}
                      >
                        {item.phone}
                      </a>
                    </td>

                    <td>
                      <div style={{ color: '#0f172a', fontSize: '0.9rem' }}>{item.course}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{item.qualification}</div>
                    </td>

                    <td>{item.city}</td>

                    <td>
                      <select
                        value={item.status || 'New'}
                        onChange={(e) => onUpdateStatus && onUpdateStatus(item._id, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          backgroundColor: badgeStyle.bg,
                          color: badgeStyle.text,
                          border: `1px solid ${badgeStyle.border}`,
                          cursor: 'pointer',
                          width: 'auto',
                        }}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Admitted">Admitted</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(item)}
                          title="View Details"
                          style={{
                            border: '1px solid #cbd5e1',
                            background: '#fff',
                            color: '#002147',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          <Eye size={14} /> View
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete admission inquiry from ${item.studentName}?`)) {
                              onDelete && onDelete(item._id);
                            }
                          }}
                          title="Delete Inquiry"
                          style={{
                            border: '1px solid #fecaca',
                            background: '#fef2f2',
                            color: '#dc2626',
                            borderRadius: '6px',
                            padding: '6px 8px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                    {loading ? 'Loading admission inquiries...' : 'No admission inquiries found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 3000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: '12px',
              maxWidth: '540px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            }}
          >
            <div
              style={{
                background: '#002147',
                color: '#fff',
                padding: '1.15rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.72rem', color: '#f89e20', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Admission Application Details
                </div>
                <h3 style={{ margin: '2px 0 0', fontSize: '1.2rem' }}>{selectedItem.studentName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.92rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Phone size={13} /> Mobile Number
                  </div>
                  <a href={`tel:${selectedItem.phone}`} style={{ fontWeight: 700, color: '#002147', textDecoration: 'none' }}>
                    {selectedItem.phone}
                  </a>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Mail size={13} /> Email
                  </div>
                  <a href={`mailto:${selectedItem.email}`} style={{ fontWeight: 600, color: '#002147', textDecoration: 'none', wordBreak: 'break-all' }}>
                    {selectedItem.email}
                  </a>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <GraduationCap size={13} /> Interested Course
                  </div>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{selectedItem.course}</div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <User size={13} /> Qualification
                  </div>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{selectedItem.qualification}</div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={13} /> City
                  </div>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{selectedItem.city}</div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={13} /> Submitted On
                  </div>
                  <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.82rem' }}>{formatDateTime(selectedItem.createdAt)}</div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>Message / Queries</div>
                <div style={{ color: '#1e293b', lineHeight: 1.5 }}>
                  {selectedItem.message && selectedItem.message.trim() ? selectedItem.message : 'No additional message provided.'}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '0.5rem' }}>
                <a
                  href={`tel:${selectedItem.phone}`}
                  style={{
                    background: '#002147',
                    color: '#fff',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.86rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Phone size={14} /> Call Applicant
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  style={{
                    background: '#e2e8f0',
                    color: '#0f172a',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionsTab;
