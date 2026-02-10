'use client';

import * as React from 'react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('relative flex flex-col', className)}
      {...props}
    />
  );
});
InputGroup.displayName = 'InputGroup';

export const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[80px] w-full rounded-lg border px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-300 resize-none',
        className,
      )}
      style={{
        borderColor: 'var(--input)',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
      {...props}
    />
  );
});
InputGroupTextarea.displayName = 'InputGroupTextarea';

export const InputGroupAddon = ({
  align = 'block-end',
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  align?: 'block-start' | 'block-end';
}) => {
  return (
    <div
      className={cn(
        'absolute flex items-center',
        align === 'block-start' ? 'top-2 right-2' : 'bottom-2 right-2',
        className,
      )}
      {...props}
    />
  );
};

export const InputGroupText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn('text-xs text-muted-foreground', className)}
      {...props}
    />
  );
});
InputGroupText.displayName = 'InputGroupText';
