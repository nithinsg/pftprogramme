import type { ElementType, ReactNode } from 'react';
import { useReveal } from '@/lib/hooks';
import { cn } from '@/lib/cn';

/**
 * Fades and lifts its children into view once. Uses a single
 * IntersectionObserver per element and no scroll listener; automatically
 * inert under `prefers-reduced-motion` (handled in index.css).
 */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger in milliseconds. Keep under ~240ms — longer reads as lag. */
  delay?: number;
  className?: string;
}) {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={cn('reveal', visible && 'reveal-in', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
