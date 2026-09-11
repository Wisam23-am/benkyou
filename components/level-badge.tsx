const levelColorMap: Record<string, string> = {
  N5: 'bg-matcha/20 text-matcha',
  N4: 'bg-ai-soft text-ai',
  N3: 'bg-yuzu/20 text-yuzu',
  N2: 'bg-hanko/10 text-hanko',
  N1: 'bg-sumi text-paper',
};

type LevelBadgeProps = {
  level: string;
  className?: string;
};

export function LevelBadge({ level, className }: LevelBadgeProps) {
  const colorClass = levelColorMap[level] ?? 'bg-neutral-100 text-sumi-muted';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClass} ${className ?? ''}`}>
      {level}
    </span>
  );
}
