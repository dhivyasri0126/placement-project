import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email('Please enter a valid email address')
    .trim()
    .min(1, 'Email address is required'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name cannot exceed 100 characters'),
  email: z
    .email('Please enter a valid email address')
    .trim()
    .min(1, 'Email address is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password cannot exceed 100 characters'),
  role: z.enum(['STUDENT', 'STAFF'], {
    message: 'Please select a valid account role',
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
