import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style, onClick }) => {
  return (
    <div 
      className={`bg-white rounded-xl p-6 md:p-8 border border-secondary/10 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

