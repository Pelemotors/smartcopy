import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  asChild = false,
  ...props
}) => {
  const baseStyles = 'font-heading font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center shadow-sm hover:shadow-md';
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-accent text-white hover:bg-accent-dark focus:ring-accent hover:scale-[1.02] active:scale-[0.98]',
  };
  
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg',
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  if (asChild && 'href' in props) {
    return (
      <Link href={props.href as string} className={combinedClassName} {...(props as any)}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
};

