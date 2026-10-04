import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiClient } from '../api/client';
import { profileSchema, type ProfileFormValues } from '../validations';
import { FormField, Input, Select, Textarea } from '../components/ui/FormField';

interface Company {
  id: number;
  name: string;
}

interface StudentProfileResponse {
  id: number;
  name: string;
  email: string;
  college?: string;
  department?: string;
  cgpa?: number;
  graduationYear?: number;
  phone?: string;
  bio?: string;
  targetCompanyId?: number | null;
  targetCompanyName?: string | null;
}

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfileResponse | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onTouched',
    defaultValues: {
      targetCompanyId: '',
      college: '',
      department: '',
      cgpa: '',
      graduationYear: '',
      phone: '',
      bio: '',
    },
  });

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const [profileRes, companiesRes] = await Promise.all([
          apiClient.get('/students/me'),
          apiClient.get('/companies'),
        ]);

        if (!ignore) {
          const p = profileRes.data;
          setProfile(p);
          setCompanies(companiesRes.data || []);

          reset({
            targetCompanyId: p.targetCompanyId ? String(p.targetCompanyId) : '',
            college: p.college ?? '',
            department: p.department ?? '',
            cgpa: p.cgpa !== null && p.cgpa !== undefined ? String(p.cgpa) : '',
            graduationYear: p.graduationYear ? String(p.graduationYear) : '',
            phone: p.phone ?? '',
            bio: p.bio ?? '',
          });
        }
      } catch (err) {
        if (!ignore) {
          console.error('Failed to load profile data', err);
          setMessage({ text: 'Failed to load profile information.', isError: true });
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, [reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    setMessage(null);

    try {
      const payload = {
        college: data.college?.trim() || null,
        department: data.department?.trim() || null,
        cgpa: data.cgpa?.trim() ? parseFloat(data.cgpa) : null,
        graduationYear: data.graduationYear?.trim() ? parseInt(data.graduationYear, 10) : null,
        phone: data.phone?.trim() || null,
        bio: data.bio?.trim() || null,
        targetCompanyId: data.targetCompanyId ? Number(data.targetCompanyId) : null,
      };

      const res = await apiClient.put('/students/me', payload);
      setProfile(res.data);
      reset({
        targetCompanyId: res.data.targetCompanyId ? String(res.data.targetCompanyId) : '',
        college: res.data.college ?? '',
        department: res.data.department ?? '',
        cgpa: res.data.cgpa !== null && res.data.cgpa !== undefined ? String(res.data.cgpa) : '',
        graduationYear: res.data.graduationYear ? String(res.data.graduationYear) : '',
        phone: res.data.phone ?? '',
        bio: res.data.bio ?? '',
      });
      setMessage({ text: 'Profile updated successfully!' });
    } catch (err: unknown) {
      const apiErr = err as { response?: { data?: { message?: string } } };
      setMessage({
        text: apiErr.response?.data?.message || 'Failed to update profile.',
        isError: true,
      });
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '640px', margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--color-neutral-600, #52525B)' }}>Loading student profile...</p>
      </div>
    );
  }

  return (
    <div
      className="cp-container"
      style={{
        maxWidth: '680px',
        margin: '1.5rem auto 3.5rem auto',
        padding: '1.25rem',
        backgroundColor: 'var(--surface-card, #FFFFFF)',
        border: '1px solid var(--surface-divider, #E5E7EB)',
        borderRadius: 'var(--radius-lg, 8px)',
        boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05))',
      }}
    >
      <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-divider, #E5E7EB)', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 700, margin: 0, color: 'var(--color-neutral-900, #18181B)' }}>
          Student Profile & Target Company
        </h1>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--color-neutral-600, #52525B)' }}>
          Manage your academic background and target company for tailored preparation roadmap.
        </p>
      </div>

      {message && (
        <div
          role="alert"
          style={{
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            borderRadius: 'var(--radius-md, 6px)',
            fontSize: '0.875rem',
            backgroundColor: message.isError
              ? 'var(--color-danger-50, #FEF2F2)'
              : 'var(--color-success-50, #ECFDF5)',
            border: `1px solid ${
              message.isError
                ? 'var(--color-danger-100, #FEE2E2)'
                : 'var(--color-success-100, #D1FAE5)'
            }`,
            color: message.isError
              ? 'var(--color-danger-700, #B91C1C)'
              : 'var(--color-success-700, #047857)',
          }}
        >
          {message.text}
        </div>
      )}

      {/* Read-Only Account Identity Info */}
      <div
        className="cp-grid-2col"
        style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          backgroundColor: 'var(--color-neutral-50, #FAFAFA)',
          borderRadius: 'var(--radius-md, 6px)',
          border: '1px solid var(--surface-divider, #E5E7EB)',
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-neutral-500, #71717A)' }}>
            Full Name
          </span>
          <p style={{ margin: '0.25rem 0 0 0', fontWeight: 600, color: 'var(--color-neutral-800, #27272A)' }}>
            {profile?.name || '—'}
          </p>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-neutral-500, #71717A)' }}>
            Email Address
          </span>
          <p style={{ margin: '0.25rem 0 0 0', fontWeight: 600, color: 'var(--color-neutral-800, #27272A)' }}>
            {profile?.email || '—'}
          </p>
        </div>
      </div>

      {/* Editable Form with Zod + React Hook Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField
          label="Target Company"
          htmlFor="profile-target-company"
          error={errors.targetCompanyId?.message}
          helperText="Select the company you are actively preparing for"
        >
          <Select
            id="profile-target-company"
            hasError={!!errors.targetCompanyId}
            {...register('targetCompanyId')}
          >
            <option value="">-- No target selected --</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </FormField>

        <div className="cp-grid-2col">
          <FormField
            label="College / Institution"
            htmlFor="profile-college"
            error={errors.college?.message}
          >
            <Input
              id="profile-college"
              type="text"
              placeholder="e.g. National Institute of Technology"
              hasError={!!errors.college}
              {...register('college')}
            />
          </FormField>

          <FormField
            label="Department / Stream"
            htmlFor="profile-dept"
            error={errors.department?.message}
          >
            <Input
              id="profile-dept"
              type="text"
              placeholder="e.g. Computer Science and Engineering"
              hasError={!!errors.department}
              {...register('department')}
            />
          </FormField>
        </div>

        <div className="cp-grid-3col">
          <FormField
            label="CGPA (out of 10.0)"
            htmlFor="profile-cgpa"
            error={errors.cgpa?.message}
          >
            <Input
              id="profile-cgpa"
              type="number"
              step="0.01"
              min="0"
              max="10"
              placeholder="e.g. 8.75"
              hasError={!!errors.cgpa}
              {...register('cgpa')}
            />
          </FormField>

          <FormField
            label="Graduation Year"
            htmlFor="profile-grad-year"
            error={errors.graduationYear?.message}
          >
            <Input
              id="profile-grad-year"
              type="number"
              step="1"
              placeholder="e.g. 2026"
              hasError={!!errors.graduationYear}
              {...register('graduationYear')}
            />
          </FormField>

          <FormField
            label="Contact Phone"
            htmlFor="profile-phone"
            error={errors.phone?.message}
          >
            <Input
              id="profile-phone"
              type="tel"
              placeholder="e.g. +91 9876543210"
              hasError={!!errors.phone}
              {...register('phone')}
            />
          </FormField>
        </div>

        <FormField
          label="Bio & Career Goals"
          htmlFor="profile-bio"
          error={errors.bio?.message}
          helperText="Brief summary of your career focus and placement aspirations"
        >
          <Textarea
            id="profile-bio"
            rows={4}
            placeholder="e.g. Aspiring full-stack engineer targeting product-based companies..."
            hasError={!!errors.bio}
            {...register('bio')}
          />
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '0.75rem 1.25rem',
            minHeight: '44px',
            backgroundColor: isSubmitting
              ? 'var(--btn-primary-disabled-bg, #D9E6FF)'
              : 'var(--btn-primary-bg, #2563EB)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 'var(--radius-md, 6px)',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.15s ease-in-out',
            marginTop: '0.5rem',
          }}
        >
          {isSubmitting ? 'Saving Profile...' : isDirty ? 'Save Changes' : 'Profile Saved'}
        </button>
      </form>
    </div>
  );
};

