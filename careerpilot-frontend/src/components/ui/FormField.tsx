import React, { forwardRef } from 'react';

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  requiredIndicator?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  requiredIndicator = false,
  error,
  helperText,
  children,
  style,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.25rem', ...style }}>
      {label && (
        <label
          htmlFor={htmlFor}
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--color-neutral-800, #27272A)',
            marginBottom: '0.375rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <span>{label}</span>
          {requiredIndicator && (
            <span
              style={{
                color: 'var(--color-danger-500, #EF4444)',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      {children}

      {error ? (
        <p
          id={htmlFor ? `${htmlFor}-error` : undefined}
          role="alert"
          style={{
            color: 'var(--color-danger-600, #DC2626)',
            fontSize: '0.8125rem',
            marginTop: '0.375rem',
            marginBottom: 0,
            lineHeight: 1.4,
          }}
        >
          {error}
        </p>
      ) : helperText ? (
        <p
          id={htmlFor ? `${htmlFor}-helper` : undefined}
          style={{
            color: 'var(--color-neutral-500, #71717A)',
            fontSize: '0.8125rem',
            marginTop: '0.375rem',
            marginBottom: 0,
            lineHeight: 1.4,
          }}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

// Base Input Component (No native required attribute allowed)
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'required'> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, style, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={hasError ? 'true' : undefined}
        style={{
          width: '100%',
          padding: '0.625rem 0.75rem',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          color: 'var(--color-neutral-900, #18181B)',
          backgroundColor: props.disabled
            ? 'var(--input-bg-disabled, #F4F4F5)'
            : 'var(--surface-main, #FFFFFF)',
          border: hasError
            ? '1px solid var(--input-border-error, #EF4444)'
            : '1px solid var(--input-border-default, #E2E8F0)',
          borderRadius: 'var(--radius-md, 6px)',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
          ...style,
        }}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

// Base Select Component (No native required attribute allowed)
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'required'> {
  hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, style, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        aria-invalid={hasError ? 'true' : undefined}
        style={{
          width: '100%',
          padding: '0.625rem 0.75rem',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          color: 'var(--color-neutral-900, #18181B)',
          backgroundColor: props.disabled
            ? 'var(--input-bg-disabled, #F4F4F5)'
            : 'var(--surface-main, #FFFFFF)',
          border: hasError
            ? '1px solid var(--input-border-error, #EF4444)'
            : '1px solid var(--input-border-default, #E2E8F0)',
          borderRadius: 'var(--radius-md, 6px)',
          outline: 'none',
          boxSizing: 'border-box',
          ...style,
        }}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';

// Base Textarea Component (No native required attribute allowed)
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'required'> {
  hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError, style, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={hasError ? 'true' : undefined}
        style={{
          width: '100%',
          padding: '0.625rem 0.75rem',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          color: 'var(--color-neutral-900, #18181B)',
          backgroundColor: props.disabled
            ? 'var(--input-bg-disabled, #F4F4F5)'
            : 'var(--surface-main, #FFFFFF)',
          border: hasError
            ? '1px solid var(--input-border-error, #EF4444)'
            : '1px solid var(--input-border-default, #E2E8F0)',
          borderRadius: 'var(--radius-md, 6px)',
          outline: 'none',
          boxSizing: 'border-box',
          resize: 'vertical',
          ...style,
        }}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
