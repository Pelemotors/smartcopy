import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  
  return (
    <div className={`inline-block ${className}`}>
      <div
        className={`${sizeStyles[size]} border-4 border-primary border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="טוען..."
      >
        <span className="sr-only">טוען...</span>
      </div>
    </div>
  );
};

