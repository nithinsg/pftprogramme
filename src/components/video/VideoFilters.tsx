import { categories, categoryCounts } from '@/data/talks';
import type { CategoryId } from '@/data/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

export type FilterValue = CategoryId | 'all';

/**
 * Library filters (§20).
 *
 * A horizontally scrolling rail on phones — never a dropdown, never wrapped
 * into three cramped rows. Rendered as a radio group so arrow keys move between
 * options and the active filter is announced.
 */
export function VideoFilters({
  value,
  onChange,
  className,
}: {
  value: FilterValue;
  onChange: (next: FilterValue) => void;
  className?: string;
}) {
  const counts = categoryCounts();
  const options: Array<{ id: FilterValue; label: string }> = [
    { id: 'all', label: 'All' },
    ...categories.map((c) => ({ id: c.id as FilterValue, label: c.label })),
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Filter recorded sessions by topic"
      className={cn(
        'no-scrollbar rail-fade -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0',
        className,
      )}
    >
      {options.map((option) => {
        const active = value === option.id;
        const count = counts[option.id] ?? 0;

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={count === 0}
            onClick={() => {
              onChange(option.id);
              track({ name: 'library_filter', filter: option.id });
            }}
            className={cn(
              'inline-flex h-11 shrink-0 items-center gap-2 rounded-pill border px-4 text-sm font-medium',
              'transition-colors duration-250 ease-editorial disabled:opacity-40',
              active
                ? 'border-ink-900 bg-ink-900 text-white'
                : 'border-line bg-white text-ink-700 hover:border-ink-300 hover:bg-mist-100',
            )}
          >
            {option.label}
            <span
              className={cn(
                'tabular-nums text-[0.6875rem]',
                active ? 'text-white/60' : 'text-ink-400',
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
