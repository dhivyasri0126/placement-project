import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  LogOut,
  User,
  LayoutDashboard,
  Palette,
  FileText,
  Home,
  Menu,
  X,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <header
      style={{
        backgroundColor: 'var(--surface-card, #FFFFFF)',
        borderBottom: '1px solid var(--surface-divider, #E5E7EB)',
        padding: '0.5rem 1rem',
        boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
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
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div
            style={{
              backgroundColor: '#00B2DA',
              color: '#FFFFFF',
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md, 6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <GraduationCap size={18} />
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: '0.9375rem',
                letterSpacing: '-0.02em',
                color: 'var(--color-neutral-900, #18181B)',
                lineHeight: 1.2,
              }}
            >
              CareerPilot
            </div>
            <div style={{ fontSize: '0.625rem', color: 'var(--color-neutral-500, #71717A)', lineHeight: 1 }}>
              Placement Preparation
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="cp-navbar-desktop-nav" aria-label="Main Navigation">
          {!isAuthenticated && (
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: location.pathname === '/' ? 'var(--color-primary-600, #1D4ED8)' : 'var(--color-neutral-700, #3F3F46)',
                textDecoration: 'none',
                padding: '0.375rem 0.625rem',
                borderRadius: 'var(--radius-md, 6px)',
                minHeight: '34px',
              }}
            >
              <Home size={15} />
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
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: location.pathname === '/dashboard' ? 'var(--color-primary-600, #1D4ED8)' : 'var(--color-neutral-700, #3F3F46)',
                  textDecoration: 'none',
                  padding: '0.375rem 0.625rem',
                  borderRadius: 'var(--radius-md, 6px)',
                  minHeight: '34px',
                }}
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
              <Link
                to="/resume-analysis"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: location.pathname === '/resume-analysis' ? 'var(--color-primary-600, #1D4ED8)' : 'var(--color-neutral-700, #3F3F46)',
                  textDecoration: 'none',
                  padding: '0.375rem 0.625rem',
                  borderRadius: 'var(--radius-md, 6px)',
                  minHeight: '34px',
                }}
              >
                <FileText size={15} />
                Resume Analysis
              </Link>
              <Link
                to="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: location.pathname === '/profile' ? 'var(--color-primary-600, #1D4ED8)' : 'var(--color-neutral-700, #3F3F46)',
                  textDecoration: 'none',
                  padding: '0.375rem 0.625rem',
                  borderRadius: 'var(--radius-md, 6px)',
                  minHeight: '34px',
                }}
              >
                <User size={15} />
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
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: location.pathname === '/design-system' ? 'var(--color-primary-600, #1D4ED8)' : 'var(--color-neutral-700, #3F3F46)',
              textDecoration: 'none',
              padding: '0.375rem 0.625rem',
              borderRadius: 'var(--radius-md, 6px)',
              minHeight: '34px',
            }}
          >
            <Palette size={15} />
            Design Tokens
          </Link>
        </nav>

        {/* Desktop Auth Controls */}
        <div className="cp-navbar-desktop-nav">
          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-neutral-900, #18181B)' }}>
                  {user.name}
                </div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    backgroundColor: 'var(--color-primary-50, #EEF4FF)',
                    color: 'var(--color-primary-700, #1E40AF)',
                    padding: '1px 5px',
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
                  gap: '0.35rem',
                  padding: '0.375rem 0.625rem',
                  minHeight: '32px',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  backgroundColor: 'transparent',
                  border: '1px solid var(--surface-divider, #E5E7EB)',
                  borderRadius: 'var(--radius-md, 6px)',
                  color: 'var(--color-neutral-700, #3F3F46)',
                  cursor: 'pointer',
                }}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.375rem 0.75rem',
                  minHeight: '32px',
                  fontSize: '0.8125rem',
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
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.375rem 0.875rem',
                  minHeight: '32px',
                  fontSize: '0.8125rem',
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

        {/* Mobile Toggle Button */}
        <button
          className="cp-navbar-mobile-toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="cp-mobile-navigation"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md, 6px)',
          }}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown (Apple HIG / NN/g Standards) */}
      {mobileMenuOpen && (
        <div
          className="cp-mobile-drawer"
          id="cp-mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="cp-mobile-drawer-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* User Identity Row */}
            {isAuthenticated && user && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '0.625rem',
                  marginBottom: '0.5rem',
                  borderBottom: '1px solid var(--surface-divider, #E5E7EB)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary-50, #EEF4FF)',
                      color: 'var(--color-primary-700, #1E40AF)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      flexShrink: 0,
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--color-neutral-900, #18181B)', fontSize: '0.8125rem', lineHeight: 1.2 }}>
                      {user.name}
                    </div>
                    <span
                      style={{
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        backgroundColor: 'var(--color-primary-50, #EEF4FF)',
                        color: 'var(--color-primary-700, #1E40AF)',
                        padding: '1px 5px',
                        borderRadius: 'var(--radius-full, 999px)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: '0.25rem',
                    cursor: 'pointer',
                    color: 'var(--color-neutral-400, #A1A1AA)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Mobile Nav Links - Refined 36px height, 13.5px text */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {!isAuthenticated && (
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    fontSize: '0.84375rem',
                    fontWeight: 500,
                    color: 'var(--color-neutral-800, #27272A)',
                    textDecoration: 'none',
                    padding: '0.4rem 0.625rem',
                    borderRadius: 'var(--radius-md, 6px)',
                    minHeight: '36px',
                    backgroundColor: location.pathname === '/' ? 'var(--color-primary-50, #EEF4FF)' : 'transparent',
                  }}
                >
                  <Home size={15} color="var(--color-primary-600, #1D4ED8)" />
                  Home
                </Link>
              )}

              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      fontSize: '0.84375rem',
                      fontWeight: 500,
                      color: location.pathname === '/dashboard' ? 'var(--color-primary-700, #1E40AF)' : 'var(--color-neutral-800, #27272A)',
                      textDecoration: 'none',
                      padding: '0.4rem 0.625rem',
                      borderRadius: 'var(--radius-md, 6px)',
                      minHeight: '36px',
                      backgroundColor: location.pathname === '/dashboard' ? 'var(--color-primary-50, #EEF4FF)' : 'transparent',
                    }}
                  >
                    <LayoutDashboard size={15} color="var(--color-primary-600, #1D4ED8)" />
                    Dashboard
                  </Link>

                  <Link
                    to="/resume-analysis"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      fontSize: '0.84375rem',
                      fontWeight: 500,
                      color: location.pathname === '/resume-analysis' ? 'var(--color-primary-700, #1E40AF)' : 'var(--color-neutral-800, #27272A)',
                      textDecoration: 'none',
                      padding: '0.4rem 0.625rem',
                      borderRadius: 'var(--radius-md, 6px)',
                      minHeight: '36px',
                      backgroundColor: location.pathname === '/resume-analysis' ? 'var(--color-primary-50, #EEF4FF)' : 'transparent',
                    }}
                  >
                    <FileText size={15} color="var(--color-primary-600, #1D4ED8)" />
                    Resume Analysis
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.625rem',
                      fontSize: '0.84375rem',
                      fontWeight: 500,
                      color: location.pathname === '/profile' ? 'var(--color-primary-700, #1E40AF)' : 'var(--color-neutral-800, #27272A)',
                      textDecoration: 'none',
                      padding: '0.4rem 0.625rem',
                      borderRadius: 'var(--radius-md, 6px)',
                      minHeight: '36px',
                      backgroundColor: location.pathname === '/profile' ? 'var(--color-primary-50, #EEF4FF)' : 'transparent',
                    }}
                  >
                    <User size={15} color="var(--color-primary-600, #1D4ED8)" />
                    Profile
                  </Link>
                </>
              )}

              <Link
                to="/design-system"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  fontSize: '0.84375rem',
                  fontWeight: 500,
                  color: location.pathname === '/design-system' ? 'var(--color-primary-700, #1E40AF)' : 'var(--color-neutral-800, #27272A)',
                  textDecoration: 'none',
                  padding: '0.4rem 0.625rem',
                  borderRadius: 'var(--radius-md, 6px)',
                  minHeight: '36px',
                  backgroundColor: location.pathname === '/design-system' ? 'var(--color-primary-50, #EEF4FF)' : 'transparent',
                }}
              >
                <Palette size={15} color="var(--color-primary-600, #1D4ED8)" />
                Design Tokens
              </Link>
            </nav>

            {/* Mobile Auth Actions - Calm, refined styling per NN/g and Apple HIG */}
            <div
              style={{
                marginTop: '0.625rem',
                paddingTop: '0.5rem',
                borderTop: '1px solid var(--surface-divider, #E5E7EB)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    width: '100%',
                    padding: '0.4rem 0.75rem',
                    minHeight: '34px',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    backgroundColor: 'var(--surface-app-bg, #F8FAFC)',
                    color: 'var(--color-neutral-700, #3F3F46)',
                    border: '1px solid var(--surface-divider, #E5E7EB)',
                    borderRadius: 'var(--radius-md, 6px)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease-in-out',
                  }}
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      padding: '0.45rem 0.75rem',
                      minHeight: '34px',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--color-neutral-800, #27272A)',
                      textDecoration: 'none',
                      border: '1px solid var(--surface-divider, #E5E7EB)',
                      borderRadius: 'var(--radius-md, 6px)',
                      backgroundColor: 'var(--surface-main, #FFFFFF)',
                    }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      padding: '0.45rem 0.75rem',
                      minHeight: '34px',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
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
        </div>
      )}
    </header>
  );
};
