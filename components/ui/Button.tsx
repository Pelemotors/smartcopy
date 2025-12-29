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
    primary: 'bg-gradient-to-r from-primary to-accent-sky text-white hover:from-primary-dark hover:to-accent-dark focus:ring-primary hover:scale-[1.03] active:scale-[0.97] shadow-lg hover:shadow-xl transition-all duration-300',
    secondary: 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary hover:scale-[1.03] active:scale-[0.97] shadow-md hover:shadow-lg transition-all duration-300 font-semibold',
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

