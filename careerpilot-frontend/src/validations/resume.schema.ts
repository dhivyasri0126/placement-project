import { z } from 'zod';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const resumeUploadSchema = z.object({
  file: z
    .custom<FileList | File | null>((val) => val !== null && val !== undefined, {
      message: 'Please select a resume file to upload',
    })
    .refine((val) => {
      if (!val) return false;
      if (val instanceof FileList) return val.length > 0;
      return val instanceof File;
    }, 'Please select a resume file to upload')
    .refine((val) => {
      const file = val instanceof FileList ? val[0] : val;
      if (!file) return false;
      return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    }, 'Only PDF files are supported')
    .refine((val) => {
      const file = val instanceof FileList ? val[0] : val;
      if (!file) return false;
      return file.size <= MAX_FILE_SIZE_BYTES;
    }, 'File size must be 5MB or less'),
});

export type ResumeUploadFormValues = z.infer<typeof resumeUploadSchema>;
