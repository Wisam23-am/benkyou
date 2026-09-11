import type { CSSProperties } from 'react';

interface ReadinessGaugeProps {
  label: string;
  value: number;
  description: string;
  tone: 'ai' | 'matcha';
}

export function ReadinessGauge({
  label,
  value,
  description,
  tone,
}: ReadinessGaugeProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const toneColor = tone === 'ai' ? 'var(--ai)' : 'var(--matcha)';
  const trackColor = tone === 'ai' ? 'var(--ai-soft)' : 'var(--matcha-soft)';
  const style = {
    '--gauge-color': toneColor,
    '--gauge-track': trackColor,
    '--gauge-progress': `${clampedValue * 0.75}%`,
  } as CSSProperties;

  return (
    <article className="rounded-neutral border border-neutral-300 bg-paper-raised p-6 sm:p-8">
      <p className="text-sm font-semibold text-[var(--gauge-color)]">{label}</p>
      <div className="mt-5 flex items-center gap-5">
        <div
          className="relative grid size-32 shrink-0 place-items-center"
          style={style}
          aria-label={`${label}: ${clampedValue} persen`}
          role="img"
        >
          <svg
            className="absolute inset-0 size-full -rotate-[135deg]"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="var(--gauge-track)"
              strokeWidth="9"
              strokeDasharray="75 25"
              pathLength="100"
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="var(--gauge-color)"
              strokeWidth="9"
              strokeDasharray="var(--gauge-progress) 100"
              pathLength="100"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-3xl font-semibold text-[var(--gauge-color)]">
            {clampedValue}
          </span>
        </div>
        <p className="max-w-xs text-sm leading-6 text-sumi-muted">
          {description}
        </p>
      </div>
    </article>
  );
}
