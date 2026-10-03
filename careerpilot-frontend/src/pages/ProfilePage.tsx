import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

interface Company {
  id: number;
  name: string;
}

interface StudentProfile {
  id: number;
  name: string;
  email: string;
  college: string;
  department: string;
  cgpa: number;
  graduationYear: number;
  phone: string;
  bio: string;
  targetCompanyId: number | null;
  targetCompanyName: string | null;
}

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, companiesRes] = await Promise.all([
          apiClient.get('/students/me'),
          apiClient.get('/companies'),
        ]);
        setProfile(profileRes.data);
        setCompanies(companiesRes.data);
      } catch (err) {
        console.error('Failed to load profile data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await apiClient.put('/students/me', profile);
      setProfile(res.data);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading student profile...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', border: '1px solid var(--cp-border-default)', borderRadius: 'var(--cp-radius-md)' }}>
      <h2>Student Profile & Target Company</h2>
      {message && <div style={{ padding: '0.75rem', marginBottom: '1rem', background: 'var(--cp-color-success-subtle)', borderRadius: 'var(--cp-radius-sm)' }}>{message}</div>}
      <form onSubmit={handleSave}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Full Name</label>
          <input type="text" value={profile?.name || ''} disabled style={{ width: '100%', padding: '0.5rem', opacity: 0.7 }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email Address</label>
          <input type="email" value={profile?.email || ''} disabled style={{ width: '100%', padding: '0.5rem', opacity: 0.7 }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Target Company</label>
          <select
            value={profile?.targetCompanyId || ''}
            onChange={(e) => setProfile(prev => prev ? { ...prev, targetCompanyId: Number(e.target.value) || null } : null)}
            style={{ width: '100%', padding: '0.5rem' }}
          >
            <option value="">-- Select Target Company --</option>
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>College / Institution</label>
          <input
            type="text"
            value={profile?.college || ''}
            onChange={(e) => setProfile(prev => prev ? { ...prev, college: e.target.value } : null)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Department / Stream</label>
          <input
            type="text"
            value={profile?.department || ''}
            onChange={(e) => setProfile(prev => prev ? { ...prev, department: e.target.value } : null)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label>Bio / Objectives</label>
          <textarea
            value={profile?.bio || ''}
            onChange={(e) => setProfile(prev => prev ? { ...prev, bio: e.target.value } : null)}
            rows={3}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" disabled={saving} style={{ width: '100%', padding: '0.75rem', background: 'var(--cp-color-primary-base)', color: '#fff', border: 'none', cursor: 'pointer' }}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};
