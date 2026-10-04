import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Target,
  BookOpen,
  Code2,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Compass,
  Award,
  Users,
  BrainCircuit,
  MessageSquareCode,
  ShieldCheck,
  Play,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface-app-bg, #F8FAFC)', color: 'var(--color-neutral-900, #18181B)' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0A1A2F 0%, #0F2A4A 60%, #163B66 100%)',
          color: '#FFFFFF',
          padding: '3rem 1rem 3.5rem 1rem',
        }}
      >
        {/* Subtle geometric ambient lighting - semantic tokens, no neon purple hype */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(0, 178, 218, 0.18) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <div className="cp-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="cp-grid-hero">
            {/* Left Column: Hero Content */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full, 999px)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--color-primary-100, #D9E6FF)',
                  marginBottom: '1.25rem',
                }}
              >
                <Compass size={16} color="#00B2DA" />
                <span>CareerPilot Placement Framework</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(1.625rem, 3.5vw, 2.375rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: '-0.025em',
                  marginBottom: '0.875rem',
                }}
              >
                Your Placement Preparation <span style={{ color: '#00B2DA' }}>Companion</span>
              </h1>

              <p
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.82)',
                  maxWidth: '520px',
                  marginBottom: '1.5rem',
                }}
              >
                Personalized learning. Smarter practice. Track your progress. Get placement ready with evidence-based guidance and actionable roadmaps.
              </p>

              {/* CTAs with Mobile Stacking and Optimal Control Sizing */}
              <div className="cp-btn-group-mobile-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1.75rem' }}>
                <Link
                  to={isAuthenticated ? '/dashboard' : '/register'}
                  className="cp-btn-mobile-full"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 1.35rem',
                    minHeight: '40px',
                    backgroundColor: '#00B2DA',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderRadius: 'var(--radius-md, 6px)',
                    textDecoration: 'none',
                    boxShadow: '0 2px 10px rgba(0, 178, 218, 0.3)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="#features-overview"
                  className="cp-btn-mobile-full"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    padding: '0.55rem 1.25rem',
                    minHeight: '40px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#FFFFFF',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    borderRadius: 'var(--radius-md, 6px)',
                    textDecoration: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Play size={15} />
                  Explore System
                </a>
              </div>

              {/* Trust points */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Evidence-Based Skills
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={14} color="#10B981" /> No Outcome Guesswork
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={14} color="#10B981" /> Institutional Ready
                </span>
              </div>
            </div>

            {/* Right Column: Hero Graphic Preview (High-fidelity Responsive Workspace Card) */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', minWidth: 0 }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '520px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: 'var(--radius-2xl, 16px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  padding: '1.25rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Window Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 500 }}>
                    student.careerpilot.io
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                    Live Active
                  </span>
                </div>

                {/* Student Overview Strip */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 600, color: '#FFFFFF' }}>Dhivyasri M</h3>
                    <p style={{ margin: 0, fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.6)' }}>B.E. CSE • Batch of 2028</p>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: 'rgba(255, 255, 255, 0.5)' }}>Target Benchmark</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#00B2DA' }}>Google / Zoho SDE</div>
                  </div>
                </div>

                {/* Live Metric Cards Grid - 2 cols, adaptive */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                  {/* Metric 1 */}
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 'var(--radius-lg, 8px)',
                      padding: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.6875rem', color: 'rgba(255, 255, 255, 0.7)' }}>Resume Score</span>
                      <span style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 600 }}>Strong</span>
                    </div>
                    <div style={{ fontSize: '1.375rem', fontWeight: 700, color: '#10B981' }}>82%</div>
                    <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', marginTop: '0.375rem', overflow: 'hidden' }}>
                      <div style={{ width: '82%', height: '100%', backgroundColor: '#10B981', borderRadius: '2px' }} />
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 'var(--radius-lg, 8px)',
                      padding: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.6875rem', color: 'rgba(255, 255, 255, 0.7)' }}>LeetCode Solved</span>
                      <span style={{ fontSize: '0.6875rem', color: '#F59E0B', fontWeight: 600 }}>247/300</span>
                    </div>
                    <div style={{ fontSize: '1.375rem', fontWeight: 700, color: '#FFFFFF' }}>247</div>
                    <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', marginTop: '0.375rem', overflow: 'hidden' }}>
                      <div style={{ width: '75%', height: '100%', backgroundColor: '#F59E0B', borderRadius: '2px' }} />
                    </div>
                  </div>
                </div>

                {/* Key Skills Extract Tags */}
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-lg, 8px)',
                    padding: '0.75rem',
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Verified Resume Skills</span>
                    <span style={{ color: '#10B981' }}>ATS Verified</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {['Java', 'Spring Boot', 'React', 'PostgreSQL', 'DSA', 'REST APIs'].map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: '0.6875rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: '#FFFFFF',
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Feature Highlight Pills below Hero */}
          <div style={{ marginTop: '2.5rem' }}>
            <div className="cp-grid-4col">
              {[
                {
                  title: 'Resume Analysis',
                  desc: 'Deep structural parsing & ATS keyword evaluation',
                  icon: FileText,
                  link: '/resume-analysis',
                  color: '#00B2DA',
                },
                {
                  title: 'Job Matching',
                  desc: 'Role requirements benchmarked against real criteria',
                  icon: Target,
                  link: '/dashboard',
                  color: '#10B981',
                },
                {
                  title: 'Personalized Plan',
                  desc: 'Targeted learning roadmap mapped to identified gaps',
                  icon: BookOpen,
                  link: '/dashboard',
                  color: '#2563EB',
                },
                {
                  title: 'Track Practice',
                  desc: 'Quantitative coding practice & repository activity',
                  icon: Code2,
                  link: '/dashboard',
                  color: '#F59E0B',
                },
              ].map((feature) => {
                const IconComp = feature.icon;
                return (
                  <Link
                    key={feature.title}
                    to={feature.link}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: 'var(--color-neutral-900, #18181B)',
                      borderRadius: 'var(--radius-xl, 12px)',
                      padding: '1rem',
                      textDecoration: 'none',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      minHeight: '48px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-lg, 8px)',
                        backgroundColor: `${feature.color}15`,
                        color: feature.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconComp size={20} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: '0 0 0.125rem 0' }}>
                        {feature.title}
                      </h2>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-neutral-600, #52525B)', lineHeight: 1.3 }}>
                        {feature.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* The 8-Step Preparation Loop Section */}
      <section id="features-overview" className="cp-container" style={{ margin: '3.5rem auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-primary-600, #1D4ED8)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            The CareerPilot System
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: '0.5rem 0 0.75rem 0',
            }}
          >
            Structured 8-Step Placement Preparation Loop
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-neutral-600, #52525B)', lineHeight: 1.6, margin: 0 }}>
            CareerPilot replaces guesswork with a systematic preparation framework designed to take candidates from company selection to mock interview mastery.
          </p>
        </div>

        {/* 8-Step Adaptive Grid */}
        <div className="cp-loop-container">
          {[
            {
              step: '01',
              title: 'Target Company',
              desc: 'Select preferred enterprise or startup profiles to benchmark verified hiring standards.',
              icon: Target,
            },
            {
              step: '02',
              title: 'Resume Analysis',
              desc: 'Extract plain text, identify demonstrated skills, evaluate ATS readiness and quantify impact.',
              icon: FileText,
            },
            {
              step: '03',
              title: 'Skill Gap Evaluation',
              desc: 'Cross-reference candidate competencies against target requirements to expose missing skills.',
              icon: BrainCircuit,
            },
            {
              step: '04',
              title: 'Learning Roadmap',
              desc: 'Transform identified gaps into structured, weekly curriculum and curated reference materials.',
              icon: BookOpen,
            },
            {
              step: '05',
              title: 'Targeted Practice',
              desc: 'Tackle domain-specific problem sets, algorithmic challenges, and technical exercises.',
              icon: Code2,
            },
            {
              step: '06',
              title: 'Mock Interview',
              desc: 'Simulate company-specific technical and behavioral interviews with real-time feedback.',
              icon: MessageSquareCode,
            },
            {
              step: '07',
              title: 'Comprehensive Feedback',
              desc: 'Receive rubric-based scoring across communication, correctness, and problem-solving.',
              icon: Award,
            },
            {
              step: '08',
              title: 'Continuous Progress',
              desc: 'Review quantitative trend charts, update profile metrics, and advance toward placement readiness.',
              icon: TrendingUp,
            },
          ].map((item) => {
            const StepIcon = item.icon;
            return (
              <div
                key={item.step}
                style={{
                  backgroundColor: 'var(--surface-card, #FFFFFF)',
                  border: '1px solid var(--surface-divider, #E5E7EB)',
                  borderRadius: 'var(--radius-xl, 12px)',
                  padding: '1.25rem',
                  boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05))',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
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
                    <StepIcon size={18} />
                  </div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-neutral-400, #A1A1AA)' }}>
                    {item.step}
                  </span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.375rem 0' }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-neutral-600, #52525B)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Institutional Role Architecture */}
      <section
        style={{
          backgroundColor: 'var(--surface-card, #FFFFFF)',
          borderTop: '1px solid var(--surface-divider, #E5E7EB)',
          borderBottom: '1px solid var(--surface-divider, #E5E7EB)',
          padding: '3.5rem 1rem',
        }}
      >
        <div className="cp-container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem auto' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 0.75rem 0' }}>
              Built for Students, Faculty & Administrators
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-neutral-600, #52525B)', margin: 0 }}>
              Role-specific workflows ensuring unified progress tracking without noisy administrative complexity.
            </p>
          </div>

          <div className="cp-grid-3col">
            {/* Student */}
            <div
              style={{
                border: '1px solid var(--surface-divider, #E5E7EB)',
                borderRadius: 'var(--radius-xl, 12px)',
                padding: '1.5rem',
                backgroundColor: 'var(--surface-app-bg, #F8FAFC)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#00B2DA15', color: '#00B2DA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={20} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Students</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600, #52525B)', marginBottom: '1rem', lineHeight: 1.5 }}>
                Prepare with structured guidance, measure ATS compatibility, identify skill deficiencies, and gain interview confidence.
              </p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--color-neutral-700, #3F3F46)', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <li>PDF Resume plain text extraction & parsing</li>
                <li>Quantitative target company matching</li>
                <li>LeetCode and GitHub activity telemetry</li>
              </ul>
            </div>

            {/* Staff / Placement Cell */}
            <div
              style={{
                border: '1px solid var(--surface-divider, #E5E7EB)',
                borderRadius: 'var(--radius-xl, 12px)',
                padding: '1.5rem',
                backgroundColor: 'var(--surface-app-bg, #F8FAFC)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#10B98115', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={20} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Placement Cell Staff</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600, #52525B)', marginBottom: '1rem', lineHeight: 1.5 }}>
                Monitor departmental cohorts, verify candidate readiness percentages, and generate batch performance reports.
              </p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--color-neutral-700, #3F3F46)', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <li>Batch readiness analytics & skill gap matrix</li>
                <li>Individual student resume report inspection</li>
                <li>Exportable departmental audit reports</li>
              </ul>
            </div>

            {/* Super Admin */}
            <div
              style={{
                border: '1px solid var(--surface-divider, #E5E7EB)',
                borderRadius: 'var(--radius-xl, 12px)',
                padding: '1.5rem',
                backgroundColor: 'var(--surface-app-bg, #F8FAFC)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2563EB15', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Institutional Admin</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600, #52525B)', marginBottom: '1rem', lineHeight: 1.5 }}>
                Maintain verified target company hiring benchmarks, configure learning resources, and govern system parameters.
              </p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: 'var(--color-neutral-700, #3F3F46)', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <li>Company profile and criteria governance</li>
                <li>Learning roadmap catalog administration</li>
                <li>Staff account provisioning & security oversight</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="cp-container" style={{ margin: '3.5rem auto', textAlign: 'center' }}>
        <div
          style={{
            backgroundColor: 'var(--color-neutral-900, #18181B)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-2xl, 16px)',
            padding: '2.5rem 1.25rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 1rem 0' }}>
            Ready to accelerate your placement preparation?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--color-neutral-300, #D4D4D8)', maxWidth: '580px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
            Upload your resume, analyze your skill coverage against target companies, and start executing your personalized roadmap today.
          </p>
          <div className="cp-btn-group-mobile-stack" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="cp-btn-mobile-full"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                minHeight: '48px',
                backgroundColor: '#00B2DA',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-md, 6px)',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
              }}
            >
              Get Started Now <ArrowRight size={18} />
            </Link>
            <Link
              to="/resume-analysis"
              className="cp-btn-mobile-full"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                minHeight: '48px',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid var(--color-neutral-700, #3F3F46)',
                borderRadius: 'var(--radius-md, 6px)',
                fontWeight: 500,
                fontSize: '1rem',
                textDecoration: 'none',
              }}
            >
              Preview Resume Analysis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--surface-divider, #E5E7EB)',
          backgroundColor: 'var(--surface-main, #FFFFFF)',
          padding: '2rem 1rem',
          fontSize: '0.875rem',
          color: 'var(--color-neutral-500, #71717A)',
        }}
      >
        <div
          className="cp-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div>
            <span style={{ fontWeight: 700, color: 'var(--color-neutral-900, #18181B)' }}>CareerPilot</span> • Placement Preparation Platform
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/design-system" style={{ color: 'inherit', textDecoration: 'none' }}>
              Design System
            </Link>
            <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
              Sign In
            </Link>
            <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
              Create Account
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
