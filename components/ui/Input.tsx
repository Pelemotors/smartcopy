import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-dark mb-2 font-heading">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-lg border border-secondary/20 bg-background-white text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${error ? 'border-red-400' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

