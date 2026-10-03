import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/client';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await apiClient.post('/auth/register', { name, email, password, role });
      login(response.data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid var(--cp-border-default)', borderRadius: 'var(--cp-radius-md)' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h2>
      {error && <div style={{ color: 'var(--cp-color-danger-base)', marginBottom: '1rem', padding: '0.5rem', background: 'var(--cp-color-danger-subtle)' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--cp-radius-sm)', border: '1px solid var(--cp-border-default)' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--cp-radius-sm)', border: '1px solid var(--cp-border-default)' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--cp-radius-sm)', border: '1px solid var(--cp-border-default)' }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Account Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--cp-radius-sm)', border: '1px solid var(--cp-border-default)' }}
          >
            <option value="STUDENT">Student</option>
            <option value="STAFF">Placement Staff</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '0.75rem', background: 'var(--cp-color-primary-base)', color: '#fff', border: 'none', borderRadius: 'var(--cp-radius-sm)', cursor: 'pointer' }}
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
    </div>
  );
};
