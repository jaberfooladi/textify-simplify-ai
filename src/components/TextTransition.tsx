
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TextTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down';
}

const TextTransition = ({ 
  children, 
  className, 
  delay = 0,
  direction = 'up'
}: TextTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        'transition-all duration-500 ease-out opacity-0 transform',
        isVisible && 'opacity-100 transform-none',
        direction === 'up' ? 'translate-y-4' : '-translate-y-4',
        className
      )}
    >
      {children}
    </div>
  );
};

export default TextTransition;
