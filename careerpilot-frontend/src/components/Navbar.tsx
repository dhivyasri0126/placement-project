import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, LogOut, User, LayoutDashboard, Palette, FileText, Home } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header
      style={{
        backgroundColor: 'var(--surface-card, #FFFFFF)',
        borderBottom: '1px solid var(--surface-divider, #E5E7EB)',
        padding: '0.875rem 1.5rem',
        boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div
            style={{
              backgroundColor: '#00B2DA',
              color: '#FFFFFF',
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md, 6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GraduationCap size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.02em', color: 'var(--color-neutral-900, #18181B)' }}>
              CareerPilot
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-500, #71717A)', lineHeight: 1 }}>
              Placement Preparation
            </div>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {!isAuthenticated && (
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--color-neutral-700, #3F3F46)',
                textDecoration: 'none',
                padding: '0.375rem 0.75rem',
                borderRadius: 'var(--radius-md, 6px)',
              }}
            >
              <Home size={16} />
              Home
            </Link>
          )}

          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-neutral-700, #3F3F46)',
                  textDecoration: 'none',
                  padding: '0.375rem 0.75rem',
                  borderRadius: 'var(--radius-md, 6px)',
                }}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <Link
                to="/resume-analysis"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-neutral-700, #3F3F46)',
                  textDecoration: 'none',
                  padding: '0.375rem 0.75rem',
                  borderRadius: 'var(--radius-md, 6px)',
                }}
              >
                <FileText size={16} />
                Resume Analysis
              </Link>
              <Link
                to="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-neutral-700, #3F3F46)',
                  textDecoration: 'none',
                  padding: '0.375rem 0.75rem',
                  borderRadius: 'var(--radius-md, 6px)',
                }}
              >
                <User size={16} />
                Profile
              </Link>
            </>
          )}
          <Link
            to="/design-system"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-neutral-700, #3F3F46)',
              textDecoration: 'none',
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--radius-md, 6px)',
            }}
          >
            <Palette size={16} />
            Design Tokens
          </Link>
        </nav>

        {/* Right Auth Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-neutral-900, #18181B)' }}>
                  {user.name}
                </div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backgroundColor: 'var(--color-primary-50, #EEF4FF)',
                    color: 'var(--color-primary-700, #1E40AF)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full, 999px)',
                  }}
                >
                  {user.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                title="Sign out"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  backgroundColor: 'transparent',
                  border: '1px solid var(--surface-divider, #E5E7EB)',
                  borderRadius: 'var(--radius-md, 6px)',
                  color: 'var(--color-neutral-700, #3F3F46)',
                  cursor: 'pointer',
                }}
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link
                to="/login"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-neutral-700, #3F3F46)',
                  textDecoration: 'none',
                  border: '1px solid var(--surface-divider, #E5E7EB)',
                  borderRadius: 'var(--radius-md, 6px)',
                }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  backgroundColor: 'var(--color-primary-500, #2563EB)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-md, 6px)',
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

