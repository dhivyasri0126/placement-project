import { z } from 'zod';

export const companySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Company name is required')
    .max(255, 'Company name cannot exceed 255 characters'),
  description: z
    .string()
    .trim()
    .max(2000, 'Company description cannot exceed 2000 characters')
    .optional()
    .or(z.literal('')),
  website: z
    .string()
    .trim()
    .url('Please enter a valid website URL (e.g. https://company.com)')
    .optional()
    .or(z.literal('')),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
