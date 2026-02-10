'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { ReactNode } from 'react';

interface FuturisticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function FuturisticButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'right',
}: FuturisticButtonProps) {
  const { theme } = useTheme();

  const baseClasses = 'relative group/btn font-bold overflow-hidden transition-all duration-300 rounded-lg uppercase tracking-wider';
  
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-8 py-4 text-sm',
    lg: 'px-10 py-5 text-base',
  };

  const variantClasses = {
    primary: theme === 'dark'
      ? 'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 text-white hover:from-emerald-400 hover:via-green-400 hover:to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]'
      : 'bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 text-white hover:from-emerald-500 hover:via-green-500 hover:to-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)]',
    secondary: theme === 'dark'
      ? 'bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]'
      : 'bg-black/10 text-black border-2 border-black/30 hover:bg-black/20 hover:border-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.2)]',
    outline: theme === 'dark'
      ? 'bg-transparent text-emerald-400 border-2 border-emerald-500/50 hover:bg-emerald-500/10 hover:border-emerald-400 hover:text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
      : 'bg-transparent text-emerald-600 border-2 border-emerald-600/50 hover:bg-emerald-500/10 hover:border-emerald-500 hover:text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]',
  };

  const buttonContent = (
    <>
      {/* Animated Background Gradient */}
      <span className={`absolute inset-0 bg-gradient-to-r ${
        variant === 'primary'
          ? 'from-emerald-400 via-green-400 to-emerald-400'
          : variant === 'secondary'
          ? theme === 'dark' ? 'from-white/20 via-white/10 to-white/20' : 'from-black/20 via-black/10 to-black/20'
          : 'from-emerald-500/20 via-green-500/20 to-emerald-500/20'
      } bg-[length:200%_100%] opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[shimmer_2s_linear_infinite] transition-opacity duration-300`} />

      {/* Corner Accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

      {/* Diagonal Shine Effect */}
      <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
      
      {/* Horizontal Scan Line */}
      <span className="absolute inset-0 -translate-y-full group-hover/btn:translate-y-full transition-transform duration-700 bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100" />

      {/* Pulsing Glow */}
      {variant === 'primary' && (
        <span className="absolute -inset-1 rounded-lg opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-pulse bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 blur-xl -z-10" />
      )}

      {/* Border Gradient Animation */}
      <span className={`absolute inset-0 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ${
        variant === 'primary'
          ? 'bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 p-[2px]'
          : ''
      }`}>
        <span className="absolute inset-[2px] rounded-lg bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500" />
      </span>

      {/* Content */}
      <span className="relative flex items-center justify-center gap-2.5 z-10 font-bold">
        {icon && iconPosition === 'left' && (
          <span className="transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12">
            {icon}
          </span>
        )}
        <span className="relative">
          {children}
          {/* Text glow effect */}
          <span className="absolute inset-0 blur-sm opacity-0 group-hover/btn:opacity-70 transition-opacity duration-300">
            {children}
          </span>
        </span>
        {icon && iconPosition === 'right' && (
          <span className="transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110">
            {icon}
          </span>
        )}
      </span>

      {/* Click Ripple */}
      <span className="absolute inset-0 rounded-lg opacity-0 group-active/btn:opacity-100 group-active/btn:animate-ping bg-white/40 pointer-events-none" />

      {/* Particle Effect */}
      {[...Array(3)].map((_, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-ping"
          style={{
            top: `${20 + i * 30}%`,
            left: `${10 + i * 35}%`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </>
  );

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
    >
      {buttonContent}
    </motion.button>
  );
}
