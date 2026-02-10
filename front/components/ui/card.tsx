'use client';

import * as React from 'react';

type CardSize = 'default' | 'sm';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, size = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-2xl border bg-background/5 shadow-lg shadow-black/5 backdrop-blur-xl transition-colors duration-300',
          size === 'sm' ? 'p-4' : 'p-6',
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = 'Card';

export const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 p-6 pb-4 md:pb-5 md:p-7',
        className,
      )}
      {...props}
    />
  );
};

export const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={cn(
        'text-lg md:text-xl font-semibold leading-tight tracking-tight',
        className,
      )}
      {...props}
    />
  );
};

export const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={cn(
        'text-sm md:text-[15px] leading-relaxed text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
};

export const CardAction = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'ml-auto flex items-center justify-end text-xs font-medium',
        className,
      )}
      {...props}
    />
  );
};

export const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('px-6 pb-4 md:px-7 md:pb-5', className)}
      {...props}
    />
  );
};

export const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-6 pb-6 pt-2 md:px-7 md:pb-7',
        className,
      )}
      {...props}
    />
  );
};

