import React from 'react';
import styles from './FormInput.module.css';

export const FormGroup = ({ label, children }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>{label}</label>
    {children}
  </div>
);

export const FormInput = ({ type = 'text', label, options, ...props }) => {
  let inputElement;

  if (type === 'textarea') {
    inputElement = <textarea className={styles.input} rows={4} {...props} />;
  } else if (type === 'select') {
    inputElement = (
      <select className={styles.input} {...props}>
        {options && options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    );
  } else {
    inputElement = <input type={type} className={styles.input} {...props} />;
  }

  if (label) {
    return (
      <FormGroup label={label}>
        {inputElement}
      </FormGroup>
    );
  }
  return inputElement;
};

export const FileUploader = ({ label, onChange, previewUrl, accept = "image/*" }) => {
  const isVideo = accept.includes('video') || (typeof previewUrl === 'string' && previewUrl.match(/\.(mp4|webm|ogg|mov)$/i));

  return (
    <FormGroup label={label}>
      <input type="file" accept={accept} onChange={onChange} className={styles.fileInput} />
      {previewUrl && (
        <div className={styles.previewContainer}>
          {isVideo ? (
            <video src={previewUrl} controls className={styles.preview} style={{ maxHeight: '180px', width: '100%', objectFit: 'contain' }} />
          ) : (
            <img src={previewUrl} alt="Preview" className={styles.preview} onError={(e) => { e.target.style.display = 'none'; }} />
          )}
        </div>
      )}
    </FormGroup>
  );
};

