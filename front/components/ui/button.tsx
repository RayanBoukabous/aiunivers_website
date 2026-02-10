'use client';

import * as React from 'react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const base =
      'inline-flex items-center justify-center rounded-full font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60';

    const variants: Record<typeof variant, string> = {
      default:
        'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_30px_rgba(5,150,105,0.4)] hover:from-emerald-500 hover:to-emerald-400 hover:shadow-[0_0_40px_rgba(5,150,105,0.5)]',
      outline:
        'border border-emerald-500/60 bg-transparent text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400',
      ghost:
        'bg-transparent text-emerald-400 hover:bg-emerald-500/10',
    };

    const sizes: Record<typeof size, string> = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-11 px-5 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

