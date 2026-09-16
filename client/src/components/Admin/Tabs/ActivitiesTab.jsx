import React, { useState, useEffect } from 'react';
import HeroForm from '../HeroForm';
import CrudManager from '../CrudManager';
import { FormInput, FileUploader } from '../FormInput';
import { fetchAdminData, deleteAdminData } from '../../../utils/adminApi';
import styles from '../CrudManager.module.css';
import { Plus, Trash2 } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

// Compiles structured category details (Intro, Vision, Mission, Clubs Summary, Objectives) into HTML
export const compileCategoryDescriptionHTML = (formData) => {
  if (formData.categoryMode === 'html') {
    return formData.description || '';
  }

  let html = `<div class="activitySection">\n`;

  if (formData.intro && formData.intro.trim()) {
    html += `  <p>${formData.intro.trim().replace(/\n/g, '<br/>')}</p>\n\n`;
  }

  if (formData.vision && formData.vision.trim()) {
    html += `  <h3>Vision</h3>\n  <p>${formData.vision.trim().replace(/\n/g, '<br/>')}</p>\n\n`;
  }

  if (formData.mission && formData.mission.trim()) {
    const points = formData.mission.split('\n').map(p => p.trim()).filter(Boolean);
    html += `  <h3>Mission</h3>\n  <ul>\n`;
    points.forEach(pt => {
      const cleanPt = pt.replace(/^[•\-\*\d+\.]\s*/, '');
      html += `    <li>${cleanPt}</li>\n`;
    });
    html += `  </ul>\n\n`;
  }

  if (formData.clubsSummary && formData.clubsSummary.trim()) {
    const items = formData.clubsSummary.split('\n').map(i => i.trim()).filter(Boolean);
    html += `  <h3>Our Clubs / Overview</h3>\n  <ol>\n`;
    items.forEach(item => {
      const parts = item.split(':');
      if (parts.length > 1) {
        html += `    <li><strong>${parts[0].trim()}:</strong> ${parts.slice(1).join(':').trim()}</li>\n`;
      } else {
        html += `    <li>${item}</li>\n`;
      }
    });
    html += `  </ol>\n\n`;
  }

  if (formData.objectives && formData.objectives.trim()) {
    const points = formData.objectives.split('\n').map(p => p.trim()).filter(Boolean);
    html += `  <h3>Objectives</h3>\n  <ol>\n`;
    points.forEach(pt => {
      const cleanPt = pt.replace(/^[•\-\*\d+\.]\s*/, '');
      html += `    <li>${cleanPt}</li>\n`;
    });
    html += `  </ol>\n\n`;
  }

  html += `</div>`;

  if (html === `<div class="activitySection">\n</div>` && formData.description) {
    return formData.description;
  }

  return html;
};

// Compiles structured card inputs (Vision, Mission, Objectives, Roles Table, Members List/Table) into HTML
export const compileCardHTML = (card) => {
  if (card.mode === 'html') {
    return card.description || '';
  }

  let html = `<div class="modalDescContent">\n`;

  if (card.vision && card.vision.trim()) {
    html += `  <h3 style="color:var(--gold); margin-top:0;">Vision</h3>\n`;
    html += `  <p>${card.vision.trim().replace(/\n/g, '<br/>')}</p>\n\n`;
  }

  if (card.mission && card.mission.trim()) {
    const points = card.mission.split('\n').map(p => p.trim()).filter(Boolean);
    html += `  <h3 style="color:var(--gold);">Mission</h3>\n`;
    html += `  <ul style="padding-left: 20px;">\n`;
    points.forEach(pt => {
      const cleanPt = pt.replace(/^[•\-\*\d+\.]\s*/, '');
      html += `    <li>${cleanPt}</li>\n`;
    });
    html += `  </ul>\n\n`;
  }

  if (card.objectives && card.objectives.trim()) {
    const points = card.objectives.split('\n').map(p => p.trim()).filter(Boolean);
    html += `  <h3 style="color:var(--gold);">Objectives</h3>\n`;
    html += `  <ol style="padding-left: 20px;">\n`;
    points.forEach(pt => {
      const cleanPt = pt.replace(/^[•\-\*\d+\.]\s*/, '');
      html += `    <li>${cleanPt}</li>\n`;
    });
    html += `  </ol>\n\n`;
  }

  if (card.showRoles && card.roles && card.roles.length > 0) {
    html += `  <h3 style="color:var(--gold);">Role of the Club & Responsibilities</h3>\n`;
    html += `  <div class="table-wrapper">\n`;
    html += `    <table class="eco-club-table">\n`;
    html += `      <thead>\n        <tr><th>Role of the Club</th><th>Responsibilities</th></tr>\n      </thead>\n`;
    html += `      <tbody>\n`;
    card.roles.forEach(r => {
      if (r.role || r.responsibility) {
        html += `        <tr><td>${r.role || ''}</td><td>${r.responsibility || ''}</td></tr>\n`;
      }
    });
    html += `      </tbody>\n    </table>\n  </div>\n\n`;
  }

  if (card.showMembers) {
    html += `  <div class="team-details">\n`;
    html += `    <h3 style="color:var(--gold);">Committee Members</h3>\n`;

    if (card.memberFormat === 'list') {
      if (card.coordinator && card.coordinator.trim()) {
        html += `    <p><strong>Coordinator:</strong> ${card.coordinator.trim()}</p>\n`;
      }
      if (card.memberList && card.memberList.trim()) {
        const mLines = card.memberList.split('\n').map(l => l.trim()).filter(Boolean);
        html += `    <p><strong>Members:</strong></p>\n`;
        html += `    <ol style="padding-left: 20px;">\n`;
        mLines.forEach(line => {
          const cleanLine = line.replace(/^\d+[\.\)]\s*/, '');
          html += `      <li>${cleanLine}</li>\n`;
        });
        html += `    </ol>\n`;
      }
    } else {
      if (card.members && card.members.length > 0) {
        html += `    <div class="table-wrapper">\n`;
        html += `      <table class="eco-club-table">\n`;
        html += `        <thead>\n          <tr><th>S.NO</th><th>NAME</th><th>DESIGNATION</th><th>PHONE NUMBER</th><th>MAIL ID</th></tr>\n        </thead>\n`;
        html += `        <tbody>\n`;
        card.members.forEach((m, idx) => {
          if (m.name || m.designation) {
            const phoneCell = m.phone && m.phone.trim() ? `<a href="tel:${m.phone.trim()}">${m.phone.trim()}</a>` : '-';
            const emailCell = m.email && m.email.trim() ? `<a href="mailto:${m.email.trim()}">${m.email.trim()}</a>` : '-';
            html += `          <tr>
            <td>${idx + 1}</td>
            <td>${m.name || ''}</td>
            <td>${m.designation || ''}</td>
            <td>${phoneCell}</td>
            <td>${emailCell}</td>
          </tr>\n`;
          }
        });
        html += `        </tbody>\n      </table>\n    </div>\n`;
      }
    }

    html += `  </div>\n`;
  }

  html += `</div>`;

  if (html === `<div class="modalDescContent">\n</div>` && card.description) {
    return card.description;
  }

  return html;
};

// Builds FormData exactly as the backend controller expects:
// - bannerImage (file)
// - cardImages  (multiple files, one per card)
// - cardTitles  (JSON string array of titles, same length as cardImages)
const buildActivityFormData = (formData) => {
  const fd = new FormData();
  fd.append('category', formData.category || '');
  fd.append('description', compileCategoryDescriptionHTML(formData));

  if (formData.bannerImage instanceof File) {
    fd.append('bannerImage', formData.bannerImage);
  }

  const cardTitles = [];
  const cardDescriptions = [];
  (formData.cards || []).forEach((card) => {
    cardTitles.push(card.title || '');
    cardDescriptions.push(compileCardHTML(card));
    if (card.image instanceof File) {
      fd.append('cardImages', card.image);
    }
  });
  fd.append('cardTitles', JSON.stringify(cardTitles));
  fd.append('cardDescriptions', JSON.stringify(cardDescriptions));

  return fd;
};

const CardBuilder = ({ cards, setCards }) => {
  const addCard = () => setCards([
    ...cards, 
    { 
      title: '', 
      mode: 'structured', 
      vision: '', 
      mission: '', 
      objectives: '', 
      showRoles: false, 
      roles: [{ role: '', responsibility: '' }], 
      showMembers: false,
      memberFormat: 'table',
      coordinator: '',
      memberList: '',
      members: [{ name: '', designation: '', phone: '', email: '' }], 
      description: '', 
      image: null 
    }
  ]);

  const removeCard = (idx) => setCards(cards.filter((_, i) => i !== idx));

  const updateCard = (idx, field, val) => {
    const updated = [...cards];
    updated[idx] = { ...updated[idx], [field]: val };
    setCards(updated);
  };

  const addRoleRow = (cardIdx) => {
    const updated = [...cards];
    const roles = updated[cardIdx].roles || [];
    updated[cardIdx].roles = [...roles, { role: '', responsibility: '' }];
    setCards(updated);
  };
  const updateRoleRow = (cardIdx, rIdx, field, val) => {
    const updated = [...cards];
    const roles = [...(updated[cardIdx].roles || [])];
    roles[rIdx] = { ...roles[rIdx], [field]: val };
    updated[cardIdx].roles = roles;
    setCards(updated);
  };
  const removeRoleRow = (cardIdx, rIdx) => {
    const updated = [...cards];
    updated[cardIdx].roles = updated[cardIdx].roles.filter((_, i) => i !== rIdx);
    setCards(updated);
  };

  const addMemberRow = (cardIdx) => {
    const updated = [...cards];
    const members = updated[cardIdx].members || [];
    updated[cardIdx].members = [...members, { name: '', designation: '', phone: '', email: '' }];
    setCards(updated);
  };
  const updateMemberRow = (cardIdx, mIdx, field, val) => {
    const updated = [...cards];
    const members = [...(updated[cardIdx].members || [])];
    members[mIdx] = { ...members[mIdx], [field]: val };
    updated[cardIdx].members = members;
    setCards(updated);
  };
  const removeMemberRow = (cardIdx, mIdx) => {
    const updated = [...cards];
    updated[cardIdx].members = updated[cardIdx].members.filter((_, i) => i !== mIdx);
    setCards(updated);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <label style={{ fontWeight: 600, color: '#333', fontSize: '0.9rem' }}>Cards (Unlimited)</label>
        <button type="button" className={styles.addButton}
          style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}
          onClick={addCard}>
          <Plus size={14} /> Add Card
        </button>
      </div>
      {cards.map((card, idx) => (
        <div key={idx} style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem', background: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
            <h4 style={{ margin: 0, color: '#111827', fontSize: '1rem' }}>Card #{idx + 1}: {card.title || 'Untitled Card'}</h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                type="button"
                onClick={() => updateCard(idx, 'mode', card.mode === 'html' ? 'structured' : 'html')}
                style={{ background: '#e5e7eb', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600, color: '#374151' }}
              >
                {card.mode === 'html' ? 'Switch to Structured Form' : 'Switch to Custom HTML / Plain Text'}
              </button>
              <button type="button" onClick={() => removeCard(idx)}
                style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem' }}>
                <Trash2 size={13} /> Remove Card
              </button>
            </div>
          </div>

          <FormInput
            label={`Card ${idx + 1} Title`}
            value={card.title || ''}
            onChange={(e) => updateCard(idx, 'title', e.target.value)}
            placeholder="e.g. Eco Club"
          />

          <div style={{ margin: '0.75rem 0' }}>
            <FileUploader
              label={`Card ${idx + 1} Cover Image`}
              onChange={(e) => updateCard(idx, 'image', e.target.files[0])}
              previewUrl={
                typeof card.image === 'string'
                  ? `${BASE_URL}/${card.image.replace(/^\/+/, '')}`
                  : (card.image ? URL.createObjectURL(card.image) : null)
              }
            />
          </div>

          {card.mode === 'html' ? (
            <FormInput
              label={`Card ${idx + 1} Custom Description / HTML`}
              type="textarea"
              value={card.description || ''}
              onChange={(e) => updateCard(idx, 'description', e.target.value)}
              placeholder="Enter custom HTML or text..."
            />
          ) : (
            <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '6px', border: '1px solid #e5e7eb', marginTop: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0a1264', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Structured Card Details (Vision, Mission, Objectives & Tables)
              </div>

              <FormInput
                label="Vision"
                type="textarea"
                value={card.vision || ''}
                onChange={(e) => updateCard(idx, 'vision', e.target.value)}
                placeholder="Enter vision statement..."
              />

              <FormInput
                label="Mission (Enter 1 point per line)"
                type="textarea"
                value={card.mission || ''}
                onChange={(e) => updateCard(idx, 'mission', e.target.value)}
                placeholder="• To develop environmental awareness...&#10;• To encourage active participation..."
              />

              <FormInput
                label="Objectives (Enter 1 point per line)"
                type="textarea"
                value={card.objectives || ''}
                onChange={(e) => updateCard(idx, 'objectives', e.target.value)}
                placeholder="1. To create awareness about environmental issues...&#10;2. To encourage students to participate..."
              />

              {/* Roles & Responsibilities */}
              <div style={{ marginTop: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, cursor: 'pointer', color: '#1f2937' }}>
                  <input
                    type="checkbox"
                    checked={!!card.showRoles}
                    onChange={(e) => updateCard(idx, 'showRoles', e.target.checked)}
                  />
                  Include "Role of the Club & Responsibilities" Table
                </label>

                {card.showRoles && (
                  <div style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid #0a1264' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4b5563' }}>Role vs Responsibilities Rows</span>
                      <button type="button" onClick={() => addRoleRow(idx)} style={{ fontSize: '0.78rem', background: '#0a1264', color: 'white', border: 'none', padding: '0.25rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}>
                        + Add Role Row
                      </button>
                    </div>

                    {(card.roles || []).map((r, rIdx) => (
                      <div key={rIdx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="Role (e.g. Tree Plantation)"
                          value={r.role || ''}
                          onChange={(e) => updateRoleRow(idx, rIdx, 'role', e.target.value)}
                          style={{ flex: 1, padding: '0.4rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.85rem' }}
                        />
                        <input
                          type="text"
                          placeholder="Responsibilities (e.g. Conduct plantation drives...)"
                          value={r.responsibility || ''}
                          onChange={(e) => updateRoleRow(idx, rIdx, 'responsibility', e.target.value)}
                          style={{ flex: 2, padding: '0.4rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.85rem' }}
                        />
                        <button type="button" onClick={() => removeRoleRow(idx, rIdx)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer' }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Committee Members */}
              <div style={{ marginTop: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, cursor: 'pointer', color: '#1f2937' }}>
                  <input
                    type="checkbox"
                    checked={!!card.showMembers}
                    onChange={(e) => updateCard(idx, 'showMembers', e.target.checked)}
                  />
                  Include "Committee / Members" Section
                </label>

                {card.showMembers && (
                  <div style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid #d97706' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>Member Display Format:</span>
                      <label style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <input
                          type="radio"
                          name={`memberFormat_${idx}`}
                          value="table"
                          checked={card.memberFormat !== 'list'}
                          onChange={() => updateCard(idx, 'memberFormat', 'table')}
                        />
                        Full Table (S.No, Name, Designation, Phone, Mail)
                      </label>
                      <label style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <input
                          type="radio"
                          name={`memberFormat_${idx}`}
                          value="list"
                          checked={card.memberFormat === 'list'}
                          onChange={() => updateCard(idx, 'memberFormat', 'list')}
                        />
                        Simple List (Coordinator & Members List)
                      </label>
                    </div>

                    {card.memberFormat === 'list' ? (
                      <div>
                        <FormInput
                          label="Coordinator Name & Designation"
                          value={card.coordinator || ''}
                          onChange={(e) => updateCard(idx, 'coordinator', e.target.value)}
                          placeholder="e.g. Mr. K. Manikandan, Physical Director"
                        />
                        <FormInput
                          label="Members List (Enter 1 member per line)"
                          type="textarea"
                          value={card.memberList || ''}
                          onChange={(e) => updateCard(idx, 'memberList', e.target.value)}
                          placeholder="1. Mr. V. Ashok Kumar, AP/English&#10;2. Ms. M. Miruthila, AP/PG Commerce&#10;3. Mr. D. Shyamsundar, AP/BCA"
                        />
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4b5563' }}>
                            Table Rows (Phone & Email are optional)
                          </span>
                          <button type="button" onClick={() => addMemberRow(idx)} style={{ fontSize: '0.78rem', background: '#d97706', color: 'white', border: 'none', padding: '0.25rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}>
                            + Add Member
                          </button>
                        </div>

                        {(card.members || []).map((m, mIdx) => (
                          <div key={mIdx} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.2fr auto', gap: '0.4rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                            <input
                              type="text"
                              placeholder="Name (e.g. Mrs. K.S. MALATHI)"
                              value={m.name || ''}
                              onChange={(e) => updateMemberRow(idx, mIdx, 'name', e.target.value)}
                              style={{ padding: '0.4rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.82rem' }}
                            />
                            <input
                              type="text"
                              placeholder="Designation (e.g. COORDINATOR)"
                              value={m.designation || ''}
                              onChange={(e) => updateMemberRow(idx, mIdx, 'designation', e.target.value)}
                              style={{ padding: '0.4rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.82rem' }}
                            />
                            <input
                              type="text"
                              placeholder="Phone (Optional)"
                              value={m.phone || ''}
                              onChange={(e) => updateMemberRow(idx, mIdx, 'phone', e.target.value)}
                              style={{ padding: '0.4rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.82rem' }}
                            />
                            <input
                              type="email"
                              placeholder="Email (Optional)"
                              value={m.email || ''}
                              onChange={(e) => updateMemberRow(idx, mIdx, 'email', e.target.value)}
                              style={{ padding: '0.4rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.82rem' }}
                            />
                            <button type="button" onClick={() => removeMemberRow(idx, mIdx)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer' }}>
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      ))}

      {cards.length === 0 && (
        <p style={{ color: '#999', fontStyle: 'italic', fontSize: '0.88rem' }}>No cards added yet. Click "Add Card" above.</p>
      )}
    </div>
  );
};

const CategoryForm = (formData, setFormData, pageKey) => (
  <>
    <FormInput
      label="Category Name (e.g. College Club, SVASC Cells, Committee)"
      value={formData.category || ''}
      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      required
    />

    <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid #e5e7eb' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <label style={{ fontWeight: 700, color: '#0a1264', fontSize: '0.92rem', textTransform: 'uppercase' }}>
          Category Header & Overview Details
        </label>
        <button 
          type="button"
          onClick={() => setFormData({ ...formData, categoryMode: formData.categoryMode === 'html' ? 'structured' : 'html' })}
          style={{ background: '#d1d5db', border: 'none', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600, color: '#1f2937' }}
        >
          {formData.categoryMode === 'html' ? 'Switch to Structured Fields' : 'Switch to Custom HTML / Plain Text'}
        </button>
      </div>

      {formData.categoryMode === 'html' ? (
        <FormInput
          label="Category Description / Custom HTML"
          type="textarea"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      ) : (
        <div>
          <FormInput
            label="1. Introduction / Overview"
            type="textarea"
            value={formData.intro || ''}
            onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
            placeholder="e.g. SVASC College Clubs provide a vibrant platform for students to explore their interests, develop leadership skills..."
          />

          <FormInput
            label="2. Vision"
            type="textarea"
            value={formData.vision || ''}
            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            placeholder="e.g. To nurture well-rounded students who excel academically..."
          />

          <FormInput
            label="3. Mission (Enter 1 point per line)"
            type="textarea"
            value={formData.mission || ''}
            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
            placeholder="• To provide platforms for students to discover their talents...&#10;• To foster leadership, teamwork..."
          />

          <FormInput
            label="4. Our Clubs / Our Cells Overview (Enter 1 item per line with 'Name: Summary')"
            type="textarea"
            value={formData.clubsSummary || ''}
            onChange={(e) => setFormData({ ...formData, clubsSummary: e.target.value })}
            placeholder="Literary Club: Promotes reading, writing, debate...&#10;Fine Arts Club: Nurtures artistic talent..."
          />

          <FormInput
            label="5. Objectives (Enter 1 point per line)"
            type="textarea"
            value={formData.objectives || ''}
            onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
            placeholder="1. To provide a co-curricular platform...&#10;2. To cultivate leadership, communication..."
          />
        </div>
      )}
    </div>

    <FileUploader
      label="Banner Image"
      onChange={(e) => setFormData({ ...formData, bannerImage: e.target.files[0] })}
      previewUrl={
        typeof formData.bannerImage === 'string'
          ? `${BASE_URL}/${formData.bannerImage.replace(/^\/+/, '')}`
          : (formData.bannerImage ? URL.createObjectURL(formData.bannerImage) : null)
      }
    />

    <CardBuilder
      cards={formData.cards || []}
      setCards={(cards) => setFormData({ ...formData, cards })}
    />
  </>
);

const ActivitiesTab = () => {
  const [activities, setActivities] = useState([]);

  const loadData = async () => {
    try {
      const aRes = await fetchAdminData('/api/activities');
      setActivities(aRes || []);
    } catch (err) {
      console.error('Error loading activities data', err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async (endpoint, formData, id) => {
    const fd = buildActivityFormData(formData);
    const url = id ? `${BASE_URL}${endpoint}/${id}` : `${BASE_URL}${endpoint}`;
    const res = await fetch(url, { method: id ? 'PUT' : 'POST', body: fd });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Server error');
    }
    loadData();
  };

  const handleDelete = async (endpoint, id) => {
    await deleteAdminData(endpoint, id);
    loadData();
  };

  const activityColumns = [
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'bannerImage', label: 'Banner', type: 'image' }
  ];
  const initialState = { 
    category: '', 
    categoryMode: 'structured',
    intro: '', 
    vision: '', 
    mission: '', 
    clubsSummary: '', 
    objectives: '', 
    description: '', 
    bannerImage: null, 
    cards: [] 
  };

  return (
    <div>
      <HeroForm pageKey="activities" title="Activities Page Hero Section" />

      <CrudManager
        title="Campus Activities Categories & Cards"
        data={activities}
        columns={activityColumns}
        onSave={(data, id) => handleSave('/api/activities', data, id)}
        onDelete={(id) => handleDelete('/api/activities', id)}
        initialFormState={initialState}
        renderForm={(formData, setFormData) => CategoryForm(formData, setFormData, 'activities')}
      />
    </div>
  );
};

export default ActivitiesTab;
