import { z } from 'zod';

export const profileSchema = z.object({
  targetCompanyId: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), 'Invalid company selected'),
  college: z
    .string()
    .trim()
    .max(255, 'College name cannot exceed 255 characters')
    .optional(),
  department: z
    .string()
    .trim()
    .max(255, 'Department cannot exceed 255 characters')
    .optional(),
  cgpa: z
    .string()
    .trim()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 10;
    }, 'CGPA must be a valid number between 0.00 and 10.00'),
  graduationYear: z
    .string()
    .trim()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const num = Number(val);
      return !isNaN(num) && Number.isInteger(num) && num >= 1980 && num <= 2100;
    }, 'Graduation year must be a valid 4-digit year (1980-2100)'),
  phone: z
    .string()
    .trim()
    .max(20, 'Phone number cannot exceed 20 characters')
    .refine(
      (val) => !val || /^[+0-9\s\-()]{7,20}$/.test(val),
      'Please enter a valid phone number (7-20 digits)'
    )
    .optional(),
  bio: z
    .string()
    .trim()
    .max(1000, 'Bio cannot exceed 1000 characters')
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
