'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  useGradient?: boolean;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  className = '',
  useGradient = false,
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const { theme } = useTheme();
  const rafRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(0);
  const cursorTimeoutRef = useRef<ReturnType<typeof setTimeout>>(0);
  const startTimeRef = useRef<number>(0);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText('');
    setShowCursor(true);

    const startTyping = () => {
      startTimeRef.current = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTimeRef.current;
        const nextIndex = Math.min(Math.floor(elapsed / speed), text.length);

        if (nextIndex > indexRef.current) {
          indexRef.current = nextIndex;
          setDisplayedText(text.slice(0, nextIndex));
        }

        if (nextIndex < text.length) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayedText(text);
          cursorTimeoutRef.current = window.setTimeout(() => {
            setShowCursor(false);
            onComplete?.();
          }, 350);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    if (delay > 0) {
      timeoutRef.current = window.setTimeout(startTyping, delay);
    } else {
      startTyping();
    }

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(cursorTimeoutRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, speed, delay, onComplete]);

  const gradientStyle = useGradient
    ? theme === 'dark'
      ? 'linear-gradient(135deg, #10b981 0%, #059669 50%, #15803d 100%)'
      : 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)'
    : null;

  return (
    <span className={className}>
      <span
        style={
          gradientStyle
            ? {
                background: gradientStyle,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }
            : {}
        }
      >
        {displayedText}
      </span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block w-[2px] sm:w-[3px] h-[0.9em] ml-0.5 align-middle rounded-sm"
          style={{
            backgroundColor: useGradient ? '#22c55e' : 'currentColor',
          }}
        />
      )}
    </span>
  );
}
