import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiClient } from '../api/client';
import { resumeUploadSchema, type ResumeUploadFormValues } from '../validations';
import { FormField } from './ui/FormField';
import { UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';

interface ResumeUploadProps {
  onUploadSuccess?: (resumeData: unknown) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResumeUploadFormValues>({
    resolver: zodResolver(resumeUploadSchema),
    mode: 'onChange',
  });

  const { onChange: formOnChange, ...restFileProps } = register('file');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formOnChange(e);
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const onSubmit = async (data: ResumeUploadFormValues) => {
    setServerError(null);
    setSuccessMsg(null);

    const file = data.file instanceof FileList ? data.file[0] : (data.file as unknown as File);
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiClient.post('/resumes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMsg(`Resume "${file.name}" uploaded successfully and plain text extracted!`);
      reset();
      setSelectedFile(null);
      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }
    } catch (err: unknown) {
      const apiErr = err as { response?: { data?: { message?: string } } };
      setServerError(apiErr.response?.data?.message || 'Failed to upload PDF resume. Please try again.');
    }
  };

  return (
    <div
      style={{
        padding: 'clamp(1.25rem, 3vw, 1.75rem)',
        border: '1px dashed var(--surface-divider, #CBD5E1)',
        borderRadius: 'var(--radius-lg, 8px)',
        backgroundColor: 'var(--color-neutral-50, #FAFAFA)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary-50, #EEF4FF)',
          color: 'var(--color-primary-600, #1D4ED8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 0.75rem auto',
        }}
      >
        <UploadCloud size={24} />
      </div>

      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '0 0 0.25rem 0', color: 'var(--color-neutral-900, #18181B)' }}>
        Upload PDF Resume
      </h3>
      <p style={{ margin: '0 0 1.25rem 0', color: 'var(--color-neutral-500, #71717A)', fontSize: '0.8125rem' }}>
        Supported format: PDF only. Maximum size: 5MB.
      </p>

      {serverError && (
        <div
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'var(--color-danger-700, #B91C1C)',
            backgroundColor: 'var(--color-danger-50, #FEF2F2)',
            border: '1px solid var(--color-danger-100, #FEE2E2)',
            padding: '0.625rem 1rem',
            borderRadius: 'var(--radius-md, 6px)',
            marginBottom: '1rem',
            fontSize: '0.8125rem',
          }}
        >
          <AlertCircle size={16} />
          <span>{serverError}</span>
        </div>
      )}

      {successMsg && (
        <div
          role="status"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'var(--color-success-700, #047857)',
            backgroundColor: 'var(--color-success-50, #ECFDF5)',
            border: '1px solid var(--color-success-100, #D1FAE5)',
            padding: '0.625rem 1rem',
            borderRadius: 'var(--radius-md, 6px)',
            marginBottom: '1rem',
            fontSize: '0.8125rem',
          }}
        >
          <CheckCircle2 size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* noValidate disables browser native popups, guaranteeing inline Zod validation with zero native required attribute */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          htmlFor="resume-file-input"
          error={errors.file?.message}
          style={{ marginBottom: '1rem', alignItems: 'center' }}
        >
          <input
            id="resume-file-input"
            type="file"
            accept="application/pdf,.pdf"
            aria-invalid={errors.file ? 'true' : undefined}
            onChange={handleFileChange}
            style={{
              display: 'block',
              margin: '0 auto',
              maxWidth: '100%',
              fontSize: '0.875rem',
              color: 'var(--color-neutral-700, #3F3F46)',
            }}
            {...restFileProps}
          />
        </FormField>

        {selectedFile && (
          <p style={{ fontSize: '0.75rem', color: 'var(--color-neutral-600, #52525B)', margin: '0 0 1rem 0' }}>
            Selected: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(1)} KB)
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="cp-btn-mobile-full"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.625rem 1.5rem',
            minHeight: '44px',
            backgroundColor: isSubmitting
              ? 'var(--btn-primary-disabled-bg, #D9E6FF)'
              : 'var(--btn-primary-bg, #2563EB)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 'var(--radius-md, 6px)',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.15s ease-in-out',
          }}
        >
          {isSubmitting ? 'Uploading & Parsing...' : 'Upload Resume'}
        </button>
      </form>
    </div>
  );
};

