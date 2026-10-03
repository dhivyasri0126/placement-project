import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/client';
import { ResumeUpload } from '../components/ResumeUpload';
import { Target, FileText, CheckCircle2, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface StudentProfile {
  id: number;
  name: string;
  email: string;
  college?: string;
  department?: string;
  targetCompanyId?: number | null;
  targetCompanyName?: string | null;
}

interface LatestResume {
  id: number;
  fileName: string;
  fileSize: number;
  extractedTextSnippet?: string;
  createdAt?: string;
}

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [latestResume, setLatestResume] = useState<LatestResume | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshDashboard = async () => {
    try {
      const [profileRes, resumeRes] = await Promise.allSettled([
        apiClient.get('/students/me'),
        apiClient.get('/resumes/latest'),
      ]);

      if (profileRes.status === 'fulfilled') {
        setProfile(profileRes.value.data);
      }
      if (resumeRes.status === 'fulfilled') {
        setLatestResume(resumeRes.value.data);
      }
    } catch (e) {
      console.error('Failed to load dashboard data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const [profileRes, resumeRes] = await Promise.allSettled([
          apiClient.get('/students/me'),
          apiClient.get('/resumes/latest'),
        ]);

        if (!ignore) {
          if (profileRes.status === 'fulfilled') {
            setProfile(profileRes.value.data);
          }
          if (resumeRes.status === 'fulfilled') {
            setLatestResume(resumeRes.value.data);
          }
        }
      } catch (e) {
        console.error('Failed to load dashboard data', e);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1.5rem 3rem 1.5rem' }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: 'var(--surface-card, #FFFFFF)',
          borderRadius: 'var(--radius-lg, 8px)',
          border: '1px solid var(--surface-divider, #E5E7EB)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-primary-600, #1D4ED8)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Student Command Center
          </span>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--color-neutral-900, #18181B)',
              margin: '0.25rem 0',
            }}
          >
            Welcome back, {user?.name || 'Student'} 👋
          </h1>
          <p style={{ margin: 0, color: 'var(--color-neutral-600, #52525B)', fontSize: '0.9375rem' }}>
            Follow your structured placement preparation path from target selection to mock interview mastery.
          </p>
        </div>

        <Link
          to="/profile"
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
          Edit Profile <ArrowRight size={16} />
        </Link>
      </div>

      {/* Grid of Core Modules */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        {/* Module 1: Target Company */}
        <div
          style={{
            backgroundColor: 'var(--surface-card, #FFFFFF)',
            borderRadius: 'var(--radius-lg, 8px)',
            border: '1px solid var(--surface-divider, #E5E7EB)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md, 6px)',
                  backgroundColor: 'var(--color-primary-50, #EEF4FF)',
                  color: 'var(--color-primary-600, #1D4ED8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Target size={20} />
              </div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Target Company</h2>
            </div>

            {loading ? (
              <p style={{ color: 'var(--color-neutral-500, #71717A)', fontSize: '0.875rem' }}>Loading target company...</p>
            ) : profile?.targetCompanyName ? (
              <div
                style={{
                  backgroundColor: 'var(--color-success-50, #ECFDF5)',
                  border: '1px solid var(--color-success-100, #D1FAE5)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md, 6px)',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success-700, #047857)', fontWeight: 600 }}>
                  <CheckCircle2 size={18} />
                  <span>Target Selected</span>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem', color: 'var(--color-neutral-900, #18181B)' }}>
                  {profile.targetCompanyName}
                </div>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: 'var(--color-warning-50, #FFFBEB)',
                  border: '1px solid var(--color-warning-100, #FEF3C7)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md, 6px)',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ color: 'var(--color-warning-700, #B45309)', fontWeight: 600, fontSize: '0.875rem' }}>
                  No target company chosen
                </div>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8125rem', color: 'var(--color-neutral-600, #52525B)' }}>
                  Selecting a company allows AI gap analysis to benchmark against real hiring criteria.
                </p>
              </div>
            )}
          </div>

          <Link
            to="/profile"
            style={{
              color: 'var(--color-primary-600, #1D4ED8)',
              fontWeight: 500,
              fontSize: '0.875rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            Manage target in profile →
          </Link>
        </div>

        {/* Module 2: Resume Management */}
        <div
          style={{
            backgroundColor: 'var(--surface-card, #FFFFFF)',
            borderRadius: 'var(--radius-lg, 8px)',
            border: '1px solid var(--surface-divider, #E5E7EB)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md, 6px)',
                  backgroundColor: 'var(--color-primary-50, #EEF4FF)',
                  color: 'var(--color-primary-600, #1D4ED8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FileText size={20} />
              </div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Resume Status</h2>
            </div>

            {latestResume ? (
              <div
                style={{
                  backgroundColor: 'var(--color-neutral-50, #FAFAFA)',
                  border: '1px solid var(--surface-divider, #E5E7EB)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md, 6px)',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success-700, #047857)', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>Latest Upload Active</span>
                </div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, marginTop: '0.25rem' }}>
                  {latestResume.fileName}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-500, #71717A)', marginTop: '0.25rem' }}>
                  File size: {(latestResume.fileSize / 1024).toFixed(1)} KB
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--color-neutral-600, #52525B)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Upload your latest PDF resume to begin extraction and skill evaluation.
              </p>
            )}
          </div>

          <ResumeUpload onUploadSuccess={() => refreshDashboard()} />
        </div>

        {/* Module 3: Placement Pipeline */}
        <div
          style={{
            backgroundColor: 'var(--surface-card, #FFFFFF)',
            borderRadius: 'var(--radius-lg, 8px)',
            border: '1px solid var(--surface-divider, #E5E7EB)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md, 6px)',
                backgroundColor: 'var(--color-primary-50, #EEF4FF)',
                color: 'var(--color-primary-600, #1D4ED8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={20} />
            </div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Preparation Journey</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {[
              { step: '1. Target Company', done: !!profile?.targetCompanyId, note: profile?.targetCompanyName || 'Pending' },
              { step: '2. Resume Upload', done: !!latestResume, note: latestResume ? 'Extracted' : 'Upload PDF' },
              { step: '3. Skill Gap Analysis', done: false, note: 'Phase 6' },
              { step: '4. Learning Roadmap', done: false, note: 'Phase 6' },
              { step: '5. AI Mock Interview', done: false, note: 'Phase 7' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-sm, 4px)',
                  backgroundColor: item.done ? 'var(--color-success-50, #ECFDF5)' : 'var(--color-neutral-50, #FAFAFA)',
                  border: `1px solid ${item.done ? 'var(--color-success-100, #D1FAE5)' : 'var(--surface-divider, #E5E7EB)'}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {item.done ? (
                    <CheckCircle2 size={16} color="var(--color-success-600, #059669)" />
                  ) : (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-neutral-400, #A1A1AA)' }} />
                  )}
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-neutral-800, #27272A)' }}>
                    {item.step}
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-neutral-500, #71717A)', fontWeight: 500 }}>
                  {item.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Design System Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-neutral-900, #18181B)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-lg, 8px)',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <BookOpen size={28} color="var(--color-primary-400, #60A5FA)" />
          <div>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Explore Design System Tokens</h3>
            <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-neutral-400, #A1A1AA)', fontSize: '0.875rem' }}>
              Inspect colors, typography, surfaces, elevation, and accessibility compliance.
            </p>
          </div>
        </div>
        <Link
          to="/design-system"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--color-primary-500, #2563EB)',
            color: '#FFFFFF',
            textDecoration: 'none',
            borderRadius: 'var(--radius-md, 6px)',
            fontWeight: 500,
            fontSize: '0.875rem',
          }}
        >
          View Design Tokens
        </Link>
      </div>
    </div>
  );
};
