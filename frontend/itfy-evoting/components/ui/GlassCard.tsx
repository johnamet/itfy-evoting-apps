'use client';

import { motion } from 'framer-motion';
import { ReactNode, MouseEventHandler } from 'react';

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function GlassCard({ children, className = '', onClick }: GlassCardProps) {
  return (
    <motion.div
      className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl overflow-hidden ${className} ${onClick ? 'cursor-pointer' : ''}`}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}