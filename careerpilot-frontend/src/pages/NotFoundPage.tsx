import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '6rem auto',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: 'var(--surface-card, #FFFFFF)',
        borderRadius: 'var(--radius-lg, 8px)',
        border: '1px solid var(--surface-divider, #E5E7EB)',
        boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-danger-50, #FEF2F2)',
          color: 'var(--color-danger-600, #DC2626)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
        }}
      >
        <AlertCircle size={28} />
      </div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--color-neutral-900, #18181B)' }}>
        Page Not Found
      </h1>
      <p style={{ color: 'var(--color-neutral-600, #52525B)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1.25rem',
          backgroundColor: 'var(--color-primary-500, #2563EB)',
          color: '#FFFFFF',
          textDecoration: 'none',
          borderRadius: 'var(--radius-md, 6px)',
          fontWeight: 500,
          fontSize: '0.875rem',
        }}
      >
        <ArrowLeft size={16} /> Return to Home
      </Link>
    </div>
  );
};

