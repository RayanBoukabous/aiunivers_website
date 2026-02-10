'use client';

import * as React from 'react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  ...props
}) => {
  const base =
    'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide uppercase';

  const variants: Record<typeof variant, string> = {
    default:
      'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    secondary:
      'border-white/10 bg-black/40 text-white dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300',
    outline:
      'border-neutral-700/60 bg-transparent text-neutral-400',
  };

  return (
    <div
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
};

