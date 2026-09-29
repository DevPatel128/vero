import * as React from "react";

interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export function Field({ label, htmlFor, hint, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-xs font-medium text-ink-1">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-xs text-signal" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-xs text-ink-3">{hint}</p>
      ) : null}
    </div>
  );
}
