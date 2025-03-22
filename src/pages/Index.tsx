
import React from 'react';
import Header from '@/components/Header';
import TextSimplifier from '@/components/TextSimplifier';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background to-background/50" />
        <div className="absolute top-0 -left-48 -z-10 h-96 w-96 rounded-full bg-purple-100 opacity-20 blur-3xl" />
        <div className="absolute bottom-0 -right-48 -z-10 h-96 w-96 rounded-full bg-cyan-100 opacity-20 blur-3xl" />
      </div>
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <TextSimplifier />
      </main>
      
      {/* Footer */}
      <footer className="py-6 px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Textify • Simplify with AI</p>
      </footer>
    </div>
  );
};

export default Index;
