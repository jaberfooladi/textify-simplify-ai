
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("w-full py-6 px-8 flex items-center justify-between", className)}>
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-8 overflow-hidden rounded-md bg-gradient-to-br from-sky-400 to-indigo-500">
          <div className="absolute inset-0 flex items-center justify-center text-white font-medium text-lg">T</div>
        </div>
        <span className="font-semibold text-xl">Textify</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          How It Works
        </a>
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Examples
        </a>
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          About
        </a>
      </nav>
      
      <div className="flex items-center gap-4">
        <button className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-secondary">
          Sign In
        </button>
        <button className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
