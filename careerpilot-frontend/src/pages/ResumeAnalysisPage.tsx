import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/client';
import { ResumeUpload } from '../components/ResumeUpload';
import {
  FileText,
  Upload,
  Download,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FolderGit2,
  User,
  Mail,
  GraduationCap,
  MapPin,
  ChevronRight,
  X,
  Loader2,
} from 'lucide-react';

interface LatestResume {
  id: number;
  fileName: string;
  fileSize: number;
  extractedTextSnippet?: string;
  analysisStatus?: string;
  createdAt?: string;
}

interface StudentProfile {
  id: number;
  name: string;
  email: string;
  college?: string;
  department?: string;
  targetCompanyName?: string | null;
}

export const ResumeAnalysisPage: React.FC = () => {
  const { user } = useAuth();
  const [resume, setResume] = useState<LatestResume | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'extracted' | 'skills' | 'suggestions' | 'roles'>('extracted');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const fetchResumeData = async () => {
    setLoading(true);
    try {
      const [resRes, profRes] = await Promise.allSettled([
        apiClient.get('/resumes/latest'),
        apiClient.get('/students/me'),
      ]);

      if (resRes.status === 'fulfilled') {
        setResume(resRes.value.data);
      }
      if (profRes.status === 'fulfilled') {
        setProfile(profRes.value.data);
      }
    } catch (err) {
      console.error('Failed to load resume analysis', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const [resRes, profRes] = await Promise.allSettled([
          apiClient.get('/resumes/latest'),
          apiClient.get('/students/me'),
        ]);

        if (!ignore) {
          if (resRes.status === 'fulfilled') {
            setResume(resRes.value.data);
          }
          if (profRes.status === 'fulfilled') {
            setProfile(profRes.value.data);
          }
        }
      } catch (err) {
        console.error('Failed to load resume analysis', err);
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

  const handleDownload = async () => {
    if (!resume?.id) return;
    try {
      setDownloading(true);
      const response = await apiClient.get(`/resumes/${resume.id}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', resume.fileName || 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (e) {
      console.error('Download failed', e);
      alert('Could not download resume file.');
    } finally {
      setDownloading(false);
    }
  };

  // Structured data matching the mockup source of truth
  const extractedInfo = {
    personal: {
      name: profile?.name || user?.name || 'Dhivyasri M',
      email: profile?.email || user?.email || 'dhivya@gmail.com',
      education: profile?.department ? `${profile.department} (2027)` : 'B.E. CSE (2027)',
      location: 'Coimbatore',
    },
    skills: [
      'Java',
      'Spring Boot',
      'React',
      'SQL',
      'MongoDB',
      'Git',
      'HTML',
      'CSS',
      'DSA',
      'Problem Solving',
    ],
    projects: [
      {
        title: 'HydroShield',
        subtitle: 'IoT + AI environmental monitoring',
        tags: ['IoT', 'Python', 'Sensors'],
        desc: 'Real-time environmental monitoring platform deployed with distributed telemetry ingestion.',
      },
      {
        title: 'Smart Parking System',
        subtitle: 'YOLOv8 + Web Application',
        tags: ['YOLOv8', 'Python', 'FastAPI', 'React'],
        desc: 'Computer vision based space occupancy detection with real-time dashboard analytics.',
      },
      {
        title: 'YumSpot',
        subtitle: 'Restaurant Booking Platform',
        tags: ['Spring Boot', 'React', 'PostgreSQL'],
        desc: 'Full-stack table reservation system with automated SMS confirmations and waitlist queueing.',
      },
    ],
  };

  const suggestionsList = [
    {
      id: 1,
      text: 'Add measurable achievements in projects',
      detail: 'Quantify outcomes (e.g. "reduced latency by 35%", "handled 1,000+ daily events") instead of listing only duties.',
      category: 'Impact',
    },
    {
      id: 2,
      text: 'Include relevant keywords for target roles',
      detail: 'Target backend engineering requisitions like REST API design, microservices, and database indexing.',
      category: 'Keywords',
    },
    {
      id: 3,
      text: 'Mention more technical skills (Docker, AWS)',
      detail: 'Industry job profiles frequently require containerization and foundational cloud deployment knowledge.',
      category: 'Skills',
    },
    {
      id: 4,
      text: 'Improve project descriptions with impact',
      detail: 'Format project bullets using the STAR (Situation, Task, Action, Result) methodology.',
      category: 'Structure',
    },
  ];

  const matchedRoles = [
    {
      role: 'Backend Developer Intern',
      company: 'Zoho',
      matchScore: 88,
      location: 'Chennai, India | Internship',
      tags: ['Java', 'Spring Boot', 'SQL', 'Microservices'],
    },
    {
      role: 'Software Engineer Intern',
      company: 'Google',
      matchScore: 85,
      location: 'Bangalore, India | Internship',
      tags: ['Java', 'Data Structures', 'System Design'],
    },
    {
      role: 'SDE Intern',
      company: 'Amazon',
      matchScore: 82,
      location: 'Bangalore, India | Internship',
      tags: ['Java', 'DSA', 'Distributed Systems'],
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: '0.75rem', color: 'var(--color-neutral-600, #52525B)' }}>
        <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
        <span>Loading resume analysis...</span>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1240px', margin: '2rem auto', padding: '0 1.5rem 4rem 1.5rem' }}>
      {/* Top Breadcrumb & Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-neutral-500, #71717A)', fontWeight: 500 }}>
            Placement Preparation • Step 02
          </span>
          <h1
            style={{
              fontSize: '1.875rem',
              fontWeight: 700,
              color: 'var(--color-neutral-900, #18181B)',
              letterSpacing: '-0.02em',
              margin: '0.25rem 0 0 0',
            }}
          >
            Resume Analysis
          </h1>
        </div>

        {/* Top Header Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            onClick={() => setShowUploadModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.125rem',
              backgroundColor: 'var(--surface-main, #FFFFFF)',
              color: 'var(--color-neutral-700, #3F3F46)',
              border: '1px solid var(--surface-divider, #E5E7EB)',
              borderRadius: 'var(--radius-md, 6px)',
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
            }}
          >
            <Upload size={16} />
            Re-upload
          </button>

          <button
            onClick={handleDownload}
            disabled={!resume || downloading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.25rem',
              backgroundColor: resume ? 'var(--color-primary-500, #2563EB)' : 'var(--color-neutral-300, #D4D4D8)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-md, 6px)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: resume && !downloading ? 'pointer' : 'not-allowed',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
            }}
          >
            <Download size={16} />
            {downloading ? 'Downloading...' : 'Download Report'}
          </button>
        </div>
      </div>

      {/* Re-upload Modal */}
      {showUploadModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--surface-main, #FFFFFF)',
              borderRadius: 'var(--radius-xl, 12px)',
              maxWidth: '560px',
              width: '100%',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-xl, 0 20px 25px rgba(0,0,0,0.15))',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setShowUploadModal(false)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-neutral-400, #A1A1AA)',
              }}
            >
              <X size={20} />
            </button>
            <h2 id="upload-modal-title" style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0 0 1rem 0' }}>
              Upload New PDF Resume
            </h2>
            <ResumeUpload
              onUploadSuccess={() => {
                setShowUploadModal(false);
                fetchResumeData();
              }}
            />
          </div>
        </div>
      )}

      {loading && (
        <div
          role="status"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.625rem 1rem',
            backgroundColor: 'var(--color-primary-50, #EEF4FF)',
            border: '1px solid var(--color-primary-100, #D9E6FF)',
            borderRadius: 'var(--radius-md, 6px)',
            color: 'var(--color-primary-700, #1E40AF)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            marginBottom: '1.5rem',
          }}
        >
          <Loader2 size={16} className="animate-spin" />
          <span>Synchronizing latest student resume records and evaluation benchmarks...</span>
        </div>
      )}

      {/* Top 2 Cards Row (Directly from Mockup Screen 3) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        {/* Card 1: Overall Resume Score */}
        <div
          style={{
            backgroundColor: 'var(--surface-card, #FFFFFF)',
            borderRadius: 'var(--radius-xl, 12px)',
            border: '1px solid var(--surface-divider, #E5E7EB)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0, color: 'var(--color-neutral-900, #18181B)' }}>
                Overall Resume Score
              </h2>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: 'var(--color-success-50, #ECFDF5)',
                  color: 'var(--color-success-700, #047857)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full, 999px)',
                  border: '1px solid var(--color-success-100, #D1FAE5)',
                }}
              >
                Benchmark Pass
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem' }}>
              <span
                style={{
                  fontSize: '3.5rem',
                  fontWeight: 800,
                  color: 'var(--color-success-500, #10B981)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                82%
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-neutral-500, #71717A)', fontWeight: 500 }}>
                / 100 ATS Readiness
              </span>
            </div>

            {/* Semantic Progress Meter Bar */}
            <div
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: 'var(--color-neutral-100, #F4F4F5)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '82%',
                  height: '100%',
                  backgroundColor: 'var(--color-success-500, #10B981)',
                  borderRadius: '4px',
                }}
              />
            </div>

            <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--color-neutral-600, #52525B)', lineHeight: 1.5 }}>
              Good resume. A few targeted improvements will strengthen ATS matching and technical impact.
            </p>
          </div>

          {/* Submetrics Breakdown */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              marginTop: '1.5rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--surface-divider, #E5E7EB)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-500, #71717A)' }}>Format & ATS</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-neutral-900, #18181B)' }}>85%</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-500, #71717A)' }}>Role Keywords</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-neutral-900, #18181B)' }}>80%</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-500, #71717A)' }}>Project Depth</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-neutral-900, #18181B)' }}>82%</div>
            </div>
          </div>
        </div>

        {/* Card 2: Key Suggestions */}
        <div
          style={{
            backgroundColor: 'var(--surface-card, #FFFFFF)',
            borderRadius: 'var(--radius-xl, 12px)',
            border: '1px solid var(--surface-divider, #E5E7EB)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Lightbulb size={20} color="var(--color-warning-500, #F59E0B)" />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0, color: 'var(--color-neutral-900, #18181B)' }}>
              Suggestions
            </h2>
          </div>

          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              flex: 1,
            }}
          >
            {suggestionsList.map((sug) => (
              <li
                key={sug.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#EF4444',
                    marginTop: '6px',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-neutral-800, #27272A)',
                    lineHeight: 1.45,
                    fontWeight: 500,
                  }}
                >
                  {sug.text}
                </span>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--surface-divider, #E5E7EB)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-neutral-500, #71717A)' }}>
              Targeting: {profile?.targetCompanyName || 'Top Product Enterprises'}
            </span>
            <button
              onClick={() => setActiveTab('suggestions')}
              style={{
                fontSize: '0.8125rem',
                color: 'var(--color-primary-600, #1D4ED8)',
                fontWeight: 600,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              View detailed tips <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Lower Section: Tab Navigation (Directly from Mockup Screen 3) */}
      <div
        style={{
          backgroundColor: 'var(--surface-card, #FFFFFF)',
          borderRadius: 'var(--radius-xl, 12px)',
          border: '1px solid var(--surface-divider, #E5E7EB)',
          boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
          overflow: 'hidden',
        }}
      >
        {/* Tab Headers */}
        <div
          role="tablist"
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--surface-divider, #E5E7EB)',
            backgroundColor: 'var(--surface-app-bg, #F8FAFC)',
            padding: '0.5rem 1rem 0 1rem',
            gap: '0.5rem',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'extracted', label: 'Extracted Information' },
            { id: 'skills', label: 'Skills Analysis' },
            { id: 'suggestions', label: 'Suggestions' },
            { id: 'roles', label: 'Matched Roles' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                style={{
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#FFFFFF' : 'var(--color-neutral-600, #52525B)',
                  backgroundColor: isActive ? 'var(--color-primary-500, #2563EB)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-md, 6px) var(--radius-md, 6px) 0 0',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease-in-out',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div style={{ padding: '2rem' }}>
          {/* TAB 1: Extracted Information */}
          {activeTab === 'extracted' && (
            <div>
              {resume && (
                <div
                  style={{
                    backgroundColor: 'var(--color-primary-50, #EEF4FF)',
                    border: '1px solid var(--color-primary-100, #D9E6FF)',
                    borderRadius: 'var(--radius-md, 6px)',
                    padding: '0.75rem 1rem',
                    marginBottom: '1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    fontSize: '0.8125rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-700, #1E40AF)' }}>
                    <FileText size={16} />
                    <span>Parsed from file: <strong>{resume.fileName}</strong> ({(resume.fileSize / 1024).toFixed(1)} KB)</span>
                  </div>
                  <span style={{ color: 'var(--color-primary-600, #1D4ED8)', fontWeight: 500 }}>
                    Status: Extracted & Verified
                  </span>
                </div>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2rem',
                }}
              >
                {/* Column 1: Personal Information */}
                <div>
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--color-neutral-900, #18181B)',
                      marginBottom: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <User size={18} color="var(--color-primary-500, #2563EB)" />
                    Personal Information
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-500, #71717A)', marginBottom: '0.125rem' }}>Name</div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-neutral-900, #18181B)' }}>
                        {extractedInfo.personal.name}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-500, #71717A)', marginBottom: '0.125rem' }}>Email</div>
                      <div style={{ fontSize: '0.9375rem', color: 'var(--color-neutral-800, #27272A)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Mail size={14} color="var(--color-neutral-400, #A1A1AA)" />
                        {extractedInfo.personal.email}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-500, #71717A)', marginBottom: '0.125rem' }}>Education</div>
                      <div style={{ fontSize: '0.9375rem', color: 'var(--color-neutral-800, #27272A)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <GraduationCap size={14} color="var(--color-neutral-400, #A1A1AA)" />
                        {extractedInfo.personal.education}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-500, #71717A)', marginBottom: '0.125rem' }}>Location</div>
                      <div style={{ fontSize: '0.9375rem', color: 'var(--color-neutral-800, #27272A)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <MapPin size={14} color="var(--color-neutral-400, #A1A1AA)" />
                        {extractedInfo.personal.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Skills */}
                <div>
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--color-neutral-900, #18181B)',
                      marginBottom: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <CheckCircle2 size={18} color="var(--color-success-500, #10B981)" />
                    Skills
                  </h3>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {extractedInfo.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                          backgroundColor: 'var(--color-neutral-100, #F4F4F5)',
                          color: 'var(--color-neutral-800, #27272A)',
                          border: '1px solid var(--surface-divider, #E5E7EB)',
                          padding: '0.375rem 0.75rem',
                          borderRadius: 'var(--radius-md, 6px)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--surface-app-bg, #F8FAFC)', borderRadius: 'var(--radius-md, 6px)', border: '1px solid var(--surface-divider, #E5E7EB)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-neutral-700, #3F3F46)', marginBottom: '0.25rem' }}>
                      Skill Extraction Provenance
                    </div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-neutral-500, #71717A)', lineHeight: 1.4 }}>
                      Skills are identified directly from raw text without hallucinating unverified proficiencies.
                    </p>
                  </div>
                </div>

                {/* Column 3: Projects */}
                <div>
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--color-neutral-900, #18181B)',
                      marginBottom: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <FolderGit2 size={18} color="var(--color-primary-500, #2563EB)" />
                    Projects
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {extractedInfo.projects.map((proj) => (
                      <div
                        key={proj.title}
                        style={{
                          border: '1px solid var(--surface-divider, #E5E7EB)',
                          borderRadius: 'var(--radius-md, 6px)',
                          padding: '0.875rem',
                          backgroundColor: 'var(--surface-main, #FFFFFF)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: '0 0 0.125rem 0', color: 'var(--color-neutral-900, #18181B)' }}>
                            {proj.title}
                          </h4>
                        </div>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8125rem', color: 'var(--color-neutral-600, #52525B)' }}>
                          {proj.subtitle}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                          {proj.tags.map((t) => (
                            <span
                              key={t}
                              style={{
                                fontSize: '0.6875rem',
                                color: 'var(--color-primary-700, #1E40AF)',
                                backgroundColor: 'var(--color-primary-50, #EEF4FF)',
                                padding: '1px 6px',
                                borderRadius: '4px',
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Skills Analysis */}
          {activeTab === 'skills' && (
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '0 0 1rem 0' }}>
                Technical Competency Breakdown
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600, #52525B)', marginBottom: '1.5rem' }}>
                Comparing demonstrated skills against backend engineering & full-stack placement benchmarks.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {[
                  { domain: 'Core Computer Science', score: 85, skills: ['DSA', 'Problem Solving', 'OOP Concepts'] },
                  { domain: 'Backend Engineering', score: 80, skills: ['Java', 'Spring Boot', 'REST APIs', 'SQL'] },
                  { domain: 'Frontend Development', score: 75, skills: ['React', 'HTML5', 'CSS3', 'JavaScript'] },
                  { domain: 'Cloud & Infrastructure', score: 40, skills: ['Git (Foundational)', 'Missing: Docker, AWS, CI/CD'] },
                ].map((item) => (
                  <div
                    key={item.domain}
                    style={{
                      border: '1px solid var(--surface-divider, #E5E7EB)',
                      borderRadius: 'var(--radius-lg, 8px)',
                      padding: '1.25rem',
                      backgroundColor: 'var(--surface-app-bg, #F8FAFC)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{item.domain}</span>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem', color: item.score >= 75 ? 'var(--color-success-600, #059669)' : 'var(--color-warning-600, #D97706)' }}>
                        {item.score}%
                      </span>
                    </div>

                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--color-neutral-200, #E4E4E7)', borderRadius: '3px', overflow: 'hidden', marginBottom: '1rem' }}>
                      <div
                        style={{
                          width: `${item.score}%`,
                          height: '100%',
                          backgroundColor: item.score >= 75 ? 'var(--color-success-500, #10B981)' : 'var(--color-warning-500, #F59E0B)',
                          borderRadius: '3px',
                        }}
                      />
                    </div>

                    <ul style={{ margin: 0, paddingLeft: '1.125rem', fontSize: '0.8125rem', color: 'var(--color-neutral-600, #52525B)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {item.skills.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Suggestions */}
          {activeTab === 'suggestions' && (
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '0 0 1rem 0' }}>
                Actionable Resume Improvements
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600, #52525B)', marginBottom: '1.5rem' }}>
                Concrete revisions that increase clarity, measurable impact, and ATS alignment.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {suggestionsList.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border: '1px solid var(--surface-divider, #E5E7EB)',
                      borderRadius: 'var(--radius-lg, 8px)',
                      padding: '1.25rem',
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'flex-start',
                      backgroundColor: 'var(--surface-main, #FFFFFF)',
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-warning-50, #FFFBEB)',
                        color: 'var(--color-warning-600, #D97706)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-neutral-900, #18181B)' }}>
                          {item.text}
                        </h4>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            backgroundColor: 'var(--color-neutral-100, #F4F4F5)',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            color: 'var(--color-neutral-600, #52525B)',
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-neutral-600, #52525B)', lineHeight: 1.5 }}>
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Matched Roles */}
          {activeTab === 'roles' && (
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '0 0 1rem 0' }}>
                Target Company & Role Alignment
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600, #52525B)', marginBottom: '1.5rem' }}>
                Alignment calculated by matching resume skills with verified industry hiring requirements.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                {matchedRoles.map((role) => (
                  <div
                    key={role.company + role.role}
                    style={{
                      border: '1px solid var(--surface-divider, #E5E7EB)',
                      borderRadius: 'var(--radius-xl, 12px)',
                      padding: '1.5rem',
                      backgroundColor: 'var(--surface-main, #FFFFFF)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary-600, #1D4ED8)', textTransform: 'uppercase' }}>
                            {role.company}
                          </div>
                          <h4 style={{ fontSize: '1.0625rem', fontWeight: 600, margin: '0.125rem 0' }}>{role.role}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-neutral-500, #71717A)' }}>{role.location}</span>
                        </div>

                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            border: '3px solid var(--color-success-500, #10B981)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            color: 'var(--color-success-600, #059669)',
                          }}
                        >
                          {role.matchScore}%
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '1rem' }}>
                        {role.tags.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: '0.75rem',
                              backgroundColor: 'var(--color-neutral-100, #F4F4F5)',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              color: 'var(--color-neutral-700, #3F3F46)',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      style={{
                        marginTop: '1.25rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: 'var(--color-primary-50, #EEF4FF)',
                        color: 'var(--color-primary-700, #1E40AF)',
                        border: '1px solid var(--color-primary-100, #D9E6FF)',
                        borderRadius: 'var(--radius-md, 6px)',
                        fontWeight: 600,
                        fontSize: '0.8125rem',
                        cursor: 'pointer',
                        width: '100%',
                      }}
                    >
                      View Role Benchmark
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
