import React, { useState } from 'react';
import {
  Home,
  LayoutDashboard,
  Users,
  BookOpen,
  Target,
  Code2,
  FileBarChart,
  Briefcase,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Calendar,
  User,
  LogOut,
  Copy,
  Check,
  Layers,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { colors, typography, spacing, borderRadius, shadows, charts, surfaces } from '../theme/tokens';

export const DesignSystemPage: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('colors');
  const [customText, setCustomText] = useState<string>('The quick brown fox jumps over the lazy dog');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(`${label}: ${text}`);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const iconList = [
    { name: 'Home', icon: Home },
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Students', icon: Users },
    { name: 'Materials', icon: BookOpen },
    { name: 'Practice', icon: Target },
    { name: 'LeetCode', icon: Code2 },
    { name: 'GitHub', icon: Code2 },
    { name: 'Reports', icon: FileBarChart },
    { name: 'Jobs', icon: Briefcase },
    { name: 'Analytics', icon: TrendingUp },
    { name: 'Settings', icon: Settings },
    { name: 'Notification', icon: Bell },
    { name: 'Search', icon: Search },
    { name: 'Calendar', icon: Calendar },
    { name: 'Profile', icon: User },
    { name: 'Logout', icon: LogOut },
  ];

  return (
    <div style={{ backgroundColor: surfaces.appBg, minHeight: '100vh', fontFamily: typography.fontFamily.sans, color: colors.neutral[900] }}>
      {/* Toast Notification */}
      {copiedToken && (
        <div
          role="status"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: colors.neutral[900],
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: borderRadius.lg,
            boxShadow: shadows.lg,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          <Check size={18} color={colors.success[500]} />
          <span>Copied {copiedToken}</span>
        </div>
      )}

      {/* Header Banner */}
      <header
        style={{
          backgroundColor: surfaces.surface,
          borderBottom: `1px solid ${surfaces.divider}`,
          padding: '24px 32px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: shadows.sm,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    backgroundColor: colors.primary[500],
                    color: '#FFFFFF',
                    width: '40px',
                    height: '40px',
                    borderRadius: borderRadius.md,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Layers size={24} />
                </div>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', color: colors.neutral[900] }}>
                    CareerPilot Design Tokens
                  </h1>
                  <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: colors.neutral[500] }}>
                    A consistent and scalable design system for student-staff placement preparation platform
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span
                style={{
                  backgroundColor: colors.primary[50],
                  color: colors.primary[700],
                  padding: '6px 12px',
                  borderRadius: borderRadius.full,
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ShieldCheck size={14} /> WCAG 2.2 AA
              </span>
              <span
                style={{
                  backgroundColor: colors.secondary[50],
                  color: colors.secondary[700],
                  padding: '6px 12px',
                  borderRadius: borderRadius.full,
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Cpu size={14} /> Production Ready
              </span>
              <span
                style={{
                  backgroundColor: colors.neutral[100],
                  color: colors.neutral[700],
                  padding: '6px 12px',
                  borderRadius: borderRadius.md,
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                Version 1.0.0
              </span>
            </div>
          </div>

          {/* Search & Navigation Bar */}
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {[
                { id: 'colors', label: 'Colors' },
                { id: 'typography', label: 'Typography' },
                { id: 'surfaces', label: 'Surfaces & Shadows' },
                { id: 'spacing', label: 'Spacing & Radius' },
                { id: 'components', label: 'Components' },
                { id: 'charts', label: 'Charts' },
                { id: 'icons', label: 'Icons' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: borderRadius.md,
                    border: 'none',
                    backgroundColor: activeTab === tab.id ? colors.primary[500] : 'transparent',
                    color: activeTab === tab.id ? '#FFFFFF' : colors.neutral[600],
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '280px' }}>
              <Search
                size={16}
                color={colors.neutral[400]}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search tokens (e.g. primary, 16px, shadow)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: borderRadius.md,
                  border: `1px solid ${colors.neutral[200] || surfaces.divider}`,
                  backgroundColor: surfaces.surface,
                  fontSize: '13px',
                  outline: 'none',
                  color: colors.neutral[800],
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1280px', margin: '32px auto', padding: '0 32px 64px 32px' }}>
        
        {/* =========================================================================
            SECTION 1: COLOR PALETTES
            ========================================================================= */}
        {(activeTab === 'colors' || searchQuery) && (
          <section style={{ marginBottom: '48px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: colors.neutral[900] }}>
                Semantic & Functional Color Palettes
              </h2>
              <p style={{ fontSize: '14px', color: colors.neutral[500], margin: '4px 0 0 0' }}>
                Click any swatch to copy its CSS token or hex code.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
              {[
                { title: 'Primary', scale: colors.primary, prefix: 'primary' },
                { title: 'Secondary', scale: colors.secondary, prefix: 'secondary' },
                { title: 'Success', scale: colors.success, prefix: 'success' },
                { title: 'Warning', scale: colors.warning, prefix: 'warning' },
                { title: 'Danger', scale: colors.danger, prefix: 'danger' },
              ].map((group) => (
                <div
                  key={group.title}
                  style={{
                    backgroundColor: surfaces.card,
                    borderRadius: borderRadius.lg,
                    border: `1px solid ${surfaces.divider}`,
                    padding: '20px',
                    boxShadow: shadows.sm,
                  }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 16px 0', color: colors.neutral[800] }}>
                    {group.title} Palette
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Object.entries(group.scale)
                      .filter(([shade, hex]) => matchesSearch(`${group.prefix}-${shade}`) || matchesSearch(hex))
                      .map(([shade, hex]) => (
                        <div
                          key={shade}
                          onClick={() => copyToClipboard(`var(--color-${group.prefix}-${shade})`, `${group.prefix}-${shade}`)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: borderRadius.md,
                            backgroundColor: surfaces.appBg,
                            cursor: 'pointer',
                            transition: 'transform 0.1s ease',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: borderRadius.sm,
                                backgroundColor: hex,
                                border: '1px solid rgba(0,0,0,0.1)',
                                boxShadow: shadows.sm,
                              }}
                            />
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: colors.neutral[800] }}>
                                {group.prefix}-{shade}
                              </div>
                              <div style={{ fontSize: '12px', fontFamily: typography.fontFamily.mono, color: colors.neutral[500] }}>
                                {hex}
                              </div>
                            </div>
                          </div>
                          <Copy size={14} color={colors.neutral[400]} />
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {/* Neutral Palette (Detailed) */}
              <div
                style={{
                  backgroundColor: surfaces.card,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${surfaces.divider}`,
                  padding: '20px',
                  boxShadow: shadows.sm,
                  gridColumn: '1 / -1',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 16px 0', color: colors.neutral[800] }}>
                  Neutral Palette (Grays & Contrast Base)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                  {Object.entries(colors.neutral)
                    .filter(([shade, hex]) => matchesSearch(`neutral-${shade}`) || matchesSearch(hex))
                    .map(([shade, hex]) => (
                      <div
                        key={shade}
                        onClick={() => copyToClipboard(`var(--color-neutral-${shade})`, `neutral-${shade}`)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 14px',
                          borderRadius: borderRadius.md,
                          backgroundColor: surfaces.appBg,
                          cursor: 'pointer',
                        }}
                      >
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: borderRadius.sm,
                            backgroundColor: hex,
                            border: '1px solid rgba(0,0,0,0.1)',
                          }}
                        />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: colors.neutral[800] }}>
                            neutral-{shade}
                          </div>
                          <div style={{ fontSize: '12px', fontFamily: typography.fontFamily.mono, color: colors.neutral[500] }}>
                            {hex}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 2: TYPOGRAPHY
            ========================================================================= */}
        {(activeTab === 'typography' || searchQuery) && (
          <section style={{ marginBottom: '48px' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: colors.neutral[900] }}>
                  Typography Scale & Styles
                </h2>
                <p style={{ fontSize: '14px', color: colors.neutral[500], margin: '4px 0 0 0' }}>
                  Font families: <strong style={{ color: colors.neutral[800] }}>Inter</strong> (Sans-serif) & <strong style={{ color: colors.neutral[800] }}>JetBrains Mono</strong> (Monospace)
                </p>
              </div>

              <div style={{ width: '320px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: colors.neutral[600], display: 'block', marginBottom: '4px' }}>
                  Custom Specimen Input:
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: borderRadius.md,
                    border: `1px solid ${colors.secondary[100]}`,
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div
              style={{
                backgroundColor: surfaces.card,
                borderRadius: borderRadius.lg,
                border: `1px solid ${surfaces.divider}`,
                padding: '24px',
                boxShadow: shadows.sm,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { token: 'display', size: '56px', weight: 700, lineHeight: '64px' },
                  { token: 'h1', size: '40px', weight: 700, lineHeight: '48px' },
                  { token: 'h2', size: '32px', weight: 700, lineHeight: '40px' },
                  { token: 'h3', size: '24px', weight: 600, lineHeight: '32px' },
                  { token: 'h4', size: '20px', weight: 600, lineHeight: '28px' },
                  { token: 'h5', size: '18px', weight: 600, lineHeight: '26px' },
                  { token: 'body-lg', size: '16px', weight: 500, lineHeight: '24px' },
                  { token: 'body-md', size: '14px', weight: 500, lineHeight: '20px' },
                  { token: 'body-sm', size: '12px', weight: 500, lineHeight: '18px' },
                  { token: 'caption', size: '12px', weight: 400, lineHeight: '16px' },
                  { token: 'overline', size: '11px', weight: 500, lineHeight: '16px' },
                ]
                  .filter((item) => matchesSearch(item.token) || matchesSearch(item.size))
                  .map((item) => (
                    <div
                      key={item.token}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '140px 120px 1fr',
                        alignItems: 'baseline',
                        gap: '16px',
                        paddingBottom: '16px',
                        borderBottom: `1px solid ${colors.neutral[100]}`,
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            fontFamily: typography.fontFamily.mono,
                            backgroundColor: colors.primary[50],
                            color: colors.primary[700],
                            padding: '4px 8px',
                            borderRadius: borderRadius.sm,
                          }}
                        >
                          {item.token}
                        </span>
                      </div>

                      <div style={{ fontSize: '12px', color: colors.neutral[500], fontFamily: typography.fontFamily.mono }}>
                        {item.size} / {item.weight} / {item.lineHeight}
                      </div>

                      <div
                        style={{
                          fontSize: item.size,
                          fontWeight: item.weight,
                          lineHeight: item.lineHeight,
                          color: colors.neutral[900],
                          textTransform: item.token === 'overline' ? 'uppercase' : 'none',
                          letterSpacing: item.token === 'overline' ? '0.05em' : 'normal',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {customText}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 3: SURFACES & SHADOWS
            ========================================================================= */}
        {(activeTab === 'surfaces' || searchQuery) && (
          <section style={{ marginBottom: '48px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: colors.neutral[900] }}>
                UI Surface & Shadow Elevation System
              </h2>
              <p style={{ fontSize: '14px', color: colors.neutral[500], margin: '4px 0 0 0' }}>
                Background surface tokens and layered depth shadows.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              {[
                { name: 'app-bg', hex: surfaces.appBg, label: 'App Background' },
                { name: 'surface', hex: surfaces.surface, label: 'Main Content Canvas' },
                { name: 'card', hex: surfaces.card, label: 'Card Container Fill' },
                { name: 'sidebar', hex: surfaces.sidebar, label: 'Navigation Sidebar' },
                { name: 'hover', hex: surfaces.hover, label: 'Row Hover Fill' },
                { name: 'divider', hex: surfaces.divider, label: 'Layout Separator' },
              ]
                .filter((s) => matchesSearch(s.name) || matchesSearch(s.hex))
                .map((surface) => (
                  <div
                    key={surface.name}
                    onClick={() => copyToClipboard(`var(--surface-${surface.name})`, surface.name)}
                    style={{
                      backgroundColor: surface.hex,
                      border: `1px solid ${surfaces.divider}`,
                      borderRadius: borderRadius.lg,
                      padding: '24px',
                      cursor: 'pointer',
                      boxShadow: shadows.sm,
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 700, color: colors.neutral[800] }}>{surface.name}</div>
                    <div style={{ fontSize: '12px', color: colors.neutral[500], margin: '4px 0 12px 0' }}>{surface.label}</div>
                    <div style={{ fontSize: '12px', fontFamily: typography.fontFamily.mono, color: colors.neutral[600] }}>
                      {surface.hex}
                    </div>
                  </div>
                ))}
            </div>

            {/* Shadows Showcase */}
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: colors.neutral[800] }}>
              Elevation System (Box Shadows)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
              {[
                { token: 'shadow-none', value: shadows.none, label: 'Flat Level' },
                { token: 'shadow-sm', value: shadows.sm, label: 'Low Elevation (0 1px 2px)' },
                { token: 'shadow-md', value: shadows.md, label: 'Medium Elevation (0 4px 6px)' },
                { token: 'shadow-lg', value: shadows.lg, label: 'High Elevation (0 10px 15px)' },
                { token: 'shadow-xl', value: shadows.xl, label: 'Overlay Depth (0 20px 25px)' },
              ]
                .filter((sh) => matchesSearch(sh.token))
                .map((shadow) => (
                  <div
                    key={shadow.token}
                    onClick={() => copyToClipboard(`var(--${shadow.token})`, shadow.token)}
                    style={{
                      backgroundColor: surfaces.surface,
                      borderRadius: borderRadius.lg,
                      padding: '24px',
                      boxShadow: shadow.value,
                      border: `1px solid ${surfaces.divider}`,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 600, color: colors.neutral[800] }}>{shadow.token}</div>
                    <div style={{ fontSize: '12px', color: colors.neutral[500], marginTop: '6px' }}>{shadow.label}</div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 4: SPACING & RADIUS
            ========================================================================= */}
        {(activeTab === 'spacing' || searchQuery) && (
          <section style={{ marginBottom: '48px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: colors.neutral[900] }}>
                Spacing & Border Radius Tokens
              </h2>
              <p style={{ fontSize: '14px', color: colors.neutral[500], margin: '4px 0 0 0' }}>
                Base spacing multiplier unit: <strong style={{ color: colors.neutral[800] }}>4px</strong>
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* Spacing Bars */}
              <div
                style={{
                  backgroundColor: surfaces.card,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${surfaces.divider}`,
                  padding: '24px',
                  boxShadow: shadows.sm,
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: colors.neutral[800] }}>
                  Spacing Scale
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Object.entries(spacing)
                    .filter(([key, val]) => matchesSearch(key) || matchesSearch(val))
                    .map(([key, val]) => (
                      <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '60px', fontSize: '13px', fontWeight: 600, fontFamily: typography.fontFamily.mono }}>
                          {key} ({val})
                        </div>
                        <div
                          style={{
                            height: '24px',
                            width: val,
                            backgroundColor: colors.primary[500],
                            borderRadius: borderRadius.xs,
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Radius Specimens */}
              <div
                style={{
                  backgroundColor: surfaces.card,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${surfaces.divider}`,
                  padding: '24px',
                  boxShadow: shadows.sm,
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: colors.neutral[800] }}>
                  Border Radius Specimens
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '16px' }}>
                  {Object.entries(borderRadius)
                    .filter(([name, px]) => matchesSearch(name) || matchesSearch(px))
                    .map(([name, px]) => (
                      <div
                        key={name}
                        style={{
                          height: '80px',
                          backgroundColor: colors.primary[50],
                          border: `2px solid ${colors.primary[500]}`,
                          borderRadius: px,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: colors.primary[700] }}>{name}</div>
                        <div style={{ fontSize: '11px', color: colors.primary[600], fontFamily: typography.fontFamily.mono }}>
                          {px}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 5: COMPONENTS (BUTTONS, INPUTS, BADGES)
            ========================================================================= */}
        {(activeTab === 'components' || searchQuery) && (
          <section style={{ marginBottom: '48px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: colors.neutral[900] }}>
                Interactive Component Tokens & States
              </h2>
              <p style={{ fontSize: '14px', color: colors.neutral[500], margin: '4px 0 0 0' }}>
                Buttons, form inputs, and status badges built using design system tokens.
              </p>
            </div>

            {/* Buttons Matrix */}
            <div
              style={{
                backgroundColor: surfaces.card,
                borderRadius: borderRadius.lg,
                border: `1px solid ${surfaces.divider}`,
                padding: '24px',
                boxShadow: shadows.sm,
                marginBottom: '32px',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', color: colors.neutral[800] }}>
                Button Tokens & Intent States
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                {[
                  { intent: 'Primary', bg: colors.primary[500], hover: colors.primary[600], active: colors.primary[700], dis: colors.primary[100] },
                  { intent: 'Secondary', bg: colors.secondary[500], hover: colors.secondary[600], active: colors.secondary[700], dis: colors.secondary[100] },
                  { intent: 'Success', bg: colors.success[500], hover: colors.success[600], active: colors.success[700], dis: colors.success[100] },
                  { intent: 'Warning', bg: colors.warning[500], hover: colors.warning[600], active: colors.warning[700], dis: colors.warning[100] },
                  { intent: 'Danger', bg: colors.danger[500], hover: colors.danger[600], active: colors.danger[700], dis: colors.danger[100] },
                ].map((item) => (
                  <div key={item.intent} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: colors.neutral[700] }}>{item.intent} Intent</div>
                    
                    <button style={{ backgroundColor: item.bg, color: '#FFFFFF', padding: '10px 18px', borderRadius: borderRadius.md, border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                      Default
                    </button>
                    <button style={{ backgroundColor: item.hover, color: '#FFFFFF', padding: '10px 18px', borderRadius: borderRadius.md, border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                      Hover State
                    </button>
                    <button style={{ backgroundColor: item.active, color: '#FFFFFF', padding: '10px 18px', borderRadius: borderRadius.md, border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                      Active State
                    </button>
                    <button disabled style={{ backgroundColor: item.dis, color: colors.neutral[400], padding: '10px 18px', borderRadius: borderRadius.md, border: 'none', fontWeight: 600, cursor: 'not-allowed' }}>
                      Disabled
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Inputs & Form Controls */}
            <div
              style={{
                backgroundColor: surfaces.card,
                borderRadius: borderRadius.lg,
                border: `1px solid ${surfaces.divider}`,
                padding: '24px',
                boxShadow: shadows.sm,
                marginBottom: '32px',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', color: colors.neutral[800] }}>
                Form Input Controls & States
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: colors.neutral[700], display: 'block', marginBottom: '6px' }}>
                    Default State:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter text..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: borderRadius.md,
                      border: `1px solid ${colors.secondary[100]}`,
                      backgroundColor: surfaces.surface,
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: colors.neutral[700], display: 'block', marginBottom: '6px' }}>
                    Focus State (Primary Ring):
                  </label>
                  <input
                    type="text"
                    defaultValue="Selected input focus"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: borderRadius.md,
                      border: `2px solid ${colors.primary[500]}`,
                      backgroundColor: surfaces.surface,
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: colors.danger[700], display: 'block', marginBottom: '6px' }}>
                    Error State:
                  </label>
                  <input
                    type="text"
                    defaultValue="Invalid input entry"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: borderRadius.md,
                      border: `2px solid ${colors.danger[500]}`,
                      backgroundColor: colors.danger[50],
                      fontSize: '14px',
                      color: colors.danger[700],
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: colors.neutral[400], display: 'block', marginBottom: '6px' }}>
                    Disabled State:
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Disabled field input"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: borderRadius.md,
                      border: `1px solid ${colors.neutral[200]}`,
                      backgroundColor: colors.neutral[100],
                      fontSize: '14px',
                      color: colors.neutral[400],
                      cursor: 'not-allowed',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Badges & Tags */}
            <div
              style={{
                backgroundColor: surfaces.card,
                borderRadius: borderRadius.lg,
                border: `1px solid ${surfaces.divider}`,
                padding: '24px',
                boxShadow: shadows.sm,
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', color: colors.neutral[800] }}>
                Status Badges & Category Tags
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: colors.neutral[600], marginBottom: '10px' }}>
                    Intent Status Badges:
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ backgroundColor: colors.primary[100], color: colors.primary[700], padding: '6px 14px', borderRadius: borderRadius.full, fontSize: '13px', fontWeight: 600 }}>Primary</span>
                    <span style={{ backgroundColor: colors.secondary[100], color: colors.secondary[700], padding: '6px 14px', borderRadius: borderRadius.full, fontSize: '13px', fontWeight: 600 }}>Secondary</span>
                    <span style={{ backgroundColor: colors.success[100], color: colors.success[700], padding: '6px 14px', borderRadius: borderRadius.full, fontSize: '13px', fontWeight: 600 }}>Success</span>
                    <span style={{ backgroundColor: colors.warning[100], color: colors.warning[700], padding: '6px 14px', borderRadius: borderRadius.full, fontSize: '13px', fontWeight: 600 }}>Warning</span>
                    <span style={{ backgroundColor: colors.danger[100], color: colors.danger[700], padding: '6px 14px', borderRadius: borderRadius.full, fontSize: '13px', fontWeight: 600 }}>Danger</span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: colors.neutral[600], marginBottom: '10px' }}>
                    Placement Role Badges:
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ backgroundColor: colors.primary[50], color: colors.primary[600], padding: '4px 12px', borderRadius: borderRadius.md, fontSize: '13px', fontWeight: 600 }}>Student</span>
                    <span style={{ backgroundColor: colors.secondary[50], color: colors.secondary[600], padding: '4px 12px', borderRadius: borderRadius.md, fontSize: '13px', fontWeight: 600 }}>Staff</span>
                    <span style={{ backgroundColor: colors.warning[50], color: colors.warning[700], padding: '4px 12px', borderRadius: borderRadius.md, fontSize: '13px', fontWeight: 600 }}>Recruiter</span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: colors.neutral[600], marginBottom: '10px' }}>
                    Domain Skill Tags:
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {['Java', 'Spring Boot', 'Web Development', 'Cloud', 'System Design', 'DSA', 'Aptitude'].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          backgroundColor: surfaces.appBg,
                          border: `1px solid ${surfaces.divider}`,
                          color: colors.neutral[700],
                          padding: '4px 12px',
                          borderRadius: borderRadius.md,
                          fontSize: '12px',
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 6: CHARTS
            ========================================================================= */}
        {(activeTab === 'charts' || searchQuery) && (
          <section style={{ marginBottom: '48px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: colors.neutral[900] }}>
                Chart Color Tokens & Analytics Integration
              </h2>
              <p style={{ fontSize: '14px', color: colors.neutral[500], margin: '4px 0 0 0' }}>
                Standardized colors for data visualizations, skill progress, and placement analytics.
              </p>
            </div>

            <div
              style={{
                backgroundColor: surfaces.card,
                borderRadius: borderRadius.lg,
                border: `1px solid ${surfaces.divider}`,
                padding: '24px',
                boxShadow: shadows.sm,
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                {Object.entries(charts).map(([key, hex], idx) => (
                  <div
                    key={key}
                    onClick={() => copyToClipboard(`var(--chart-color-${idx + 1})`, key)}
                    style={{
                      backgroundColor: surfaces.appBg,
                      padding: '16px',
                      borderRadius: borderRadius.md,
                      border: `1px solid ${surfaces.divider}`,
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ height: '36px', backgroundColor: hex, borderRadius: borderRadius.sm, marginBottom: '12px' }} />
                    <div style={{ fontSize: '13px', fontWeight: 600, color: colors.neutral[800] }}>chart-{idx + 1}</div>
                    <div style={{ fontSize: '12px', fontFamily: typography.fontFamily.mono, color: colors.neutral[500] }}>{hex}</div>
                  </div>
                ))}
              </div>

              {/* Sample Visual Bar Chart */}
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: colors.neutral[700] }}>
                Student Skill Progress Distribution (Preview Visualization)
              </h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '180px', padding: '16px 0', borderBottom: `1px solid ${surfaces.divider}` }}>
                {[
                  { label: 'DSA', val: '85%', color: charts.chart1 },
                  { label: 'System Design', val: '65%', color: charts.chart2 },
                  { label: 'Web Dev', val: '92%', color: charts.chart3 },
                  { label: 'Aptitude', val: '50%', color: charts.chart4 },
                  { label: 'Mock Interview', val: '78%', color: charts.chart5 },
                  { label: 'Resume Score', val: '88%', color: charts.chart6 },
                ].map((bar) => (
                  <div key={bar.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                    <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                      <div
                        style={{
                          width: '60%',
                          height: bar.val,
                          backgroundColor: bar.color,
                          borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,
                          transition: 'height 0.3s ease',
                        }}
                      />
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: colors.neutral[600], marginTop: '8px' }}>{bar.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 7: ICON GRID
            ========================================================================= */}
        {(activeTab === 'icons' || searchQuery) && (
          <section style={{ marginBottom: '48px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: colors.neutral[900] }}>
                Core Application Icon Grid
              </h2>
              <p style={{ fontSize: '14px', color: colors.neutral[500], margin: '4px 0 0 0' }}>
                Standard 24px stroke icon system for navigation, status, and features.
              </p>
            </div>

            <div
              style={{
                backgroundColor: surfaces.card,
                borderRadius: borderRadius.lg,
                border: `1px solid ${surfaces.divider}`,
                padding: '24px',
                boxShadow: shadows.sm,
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '16px' }}>
                {iconList
                  .filter((item) => matchesSearch(item.name))
                  .map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.name}
                        onClick={() => copyToClipboard(`<${item.name} size={24} />`, item.name)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '16px 12px',
                          borderRadius: borderRadius.md,
                          backgroundColor: surfaces.appBg,
                          border: `1px solid ${surfaces.divider}`,
                          cursor: 'pointer',
                          transition: 'transform 0.15s ease',
                        }}
                      >
                        <IconComponent size={24} color={colors.neutral[700]} strokeWidth={2} />
                        <span style={{ fontSize: '12px', fontWeight: 600, color: colors.neutral[800], marginTop: '8px' }}>
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DesignSystemPage;
