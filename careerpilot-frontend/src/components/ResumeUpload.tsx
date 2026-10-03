import React, { useState } from 'react';
import { apiClient } from '../api/client';

interface ResumeUploadProps {
  onUploadSuccess?: (resumeData: any) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type !== 'application/pdf') {
        setError('Only PDF resume files are allowed.');
        setFile(null);
        return;
      }
      if (selected.size > 5 * 1024 * 1024) {
        setError('File size must be under 5MB.');
        setFile(null);
        return;
      }
      setError(null);
      setFile(selected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccessMsg(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiClient.post('/resumes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMsg('Resume uploaded successfully and plain text extracted!');
      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload PDF resume.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '1.5rem', border: '1px dashed var(--cp-border-default)', borderRadius: 'var(--cp-radius-md)', textAlign: 'center' }}>
      <h3>Upload PDF Resume</h3>
      {error && <div style={{ color: 'var(--cp-color-danger-base)', marginBottom: '1rem' }}>{error}</div>}
      {successMsg && <div style={{ color: 'var(--cp-color-success-base)', marginBottom: '1rem' }}>{successMsg}</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ marginBottom: '1rem', display: 'block', margin: '0 auto 1rem auto' }}
        />
        <button
          type="submit"
          disabled={!file || uploading}
          style={{
            padding: '0.5rem 1.5rem',
            background: 'var(--cp-color-primary-base)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--cp-radius-sm)',
            cursor: file && !uploading ? 'pointer' : 'not-allowed',
            opacity: file && !uploading ? 1 : 0.6,
          }}
        >
          {uploading ? 'Uploading & Parsing...' : 'Upload Resume'}
        </button>
      </form>
    </div>
  );
};
