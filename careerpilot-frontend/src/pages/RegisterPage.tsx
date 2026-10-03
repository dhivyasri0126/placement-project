import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../api/client';
import { registerSchema, type RegisterFormValues } from '../validations';
import { FormField, Input, Select } from '../components/ui/FormField';

export const RegisterPage: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'STUDENT',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);

    try {
      const response = await apiClient.post('/auth/register', data);
      login(response.data);
      navigate('/dashboard');
    } catch (err: unknown) {
      const apiErr = err as { response?: { data?: { message?: string } } };
      setServerError(apiErr.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '440px',
        margin: '3rem auto',
        padding: '2.5rem',
        backgroundColor: 'var(--surface-card, #FFFFFF)',
        border: '1px solid var(--surface-divider, #E5E7EB)',
        borderRadius: 'var(--radius-lg, 8px)',
        boxShadow: 'var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.07))',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-neutral-900, #18181B)',
            margin: '0 0 0.5rem 0',
          }}
        >
          Create CareerPilot Account
        </h1>
        <p style={{ margin: 0, color: 'var(--color-neutral-600, #52525B)', fontSize: '0.875rem' }}>
          Begin your structured placement readiness pathway.
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          style={{
            color: 'var(--color-danger-700, #B91C1C)',
            backgroundColor: 'var(--color-danger-50, #FEF2F2)',
            border: '1px solid var(--color-danger-100, #FEE2E2)',
            borderRadius: 'var(--radius-md, 6px)',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
          }}
        >
          {serverError}
        </div>
      )}

      {/* noValidate disables browser native popups; all validation handled via Zod inline errors without native required attribute */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          label="Full Name"
          htmlFor="reg-name"
          requiredIndicator
          error={errors.name?.message}
        >
          <Input
            id="reg-name"
            type="text"
            placeholder="e.g. Dhivyasri S"
            autoComplete="name"
            hasError={!!errors.name}
            {...register('name')}
          />
        </FormField>

        <FormField
          label="Email Address"
          htmlFor="reg-email"
          requiredIndicator
          error={errors.email?.message}
        >
          <Input
            id="reg-email"
            type="email"
            placeholder="student@university.edu"
            autoComplete="email"
            hasError={!!errors.email}
            {...register('email')}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="reg-password"
          requiredIndicator
          error={errors.password?.message}
          helperText="Minimum 6 characters with letters and numbers recommended"
        >
          <Input
            id="reg-password"
            type="password"
            placeholder="At least 6 characters"
            autoComplete="new-password"
            hasError={!!errors.password}
            {...register('password')}
          />
        </FormField>

        <FormField
          label="Account Role"
          htmlFor="reg-role"
          requiredIndicator
          error={errors.role?.message}
        >
          <Select
            id="reg-role"
            hasError={!!errors.role}
            {...register('role')}
          >
            <option value="STUDENT">Student (Placement Candidate)</option>
            <option value="STAFF">Placement Staff (Coordinator / Faculty)</option>
          </Select>
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            backgroundColor: isSubmitting
              ? 'var(--btn-primary-disabled-bg, #D9E6FF)'
              : 'var(--btn-primary-bg, #2563EB)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 'var(--radius-md, 6px)',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            marginTop: '0.5rem',
            transition: 'background-color 0.15s ease-in-out',
          }}
        >
          {isSubmitting ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-neutral-600, #52525B)' }}>
        Already have an account?{' '}
        <Link
          to="/login"
          style={{
            color: 'var(--color-primary-600, #1D4ED8)',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

