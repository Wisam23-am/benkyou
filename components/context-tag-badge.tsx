const tagColorMap: Record<string, string> = {
  formal: 'bg-ai-soft text-ai',
  bisnis: 'bg-ai-soft text-ai',
  kasual: 'bg-matcha/15 text-matcha',
  sosial: 'bg-matcha/15 text-matcha',
  belanja: 'bg-matcha/15 text-matcha',
  slang: 'bg-yuzu/15 text-yuzu',
  medsos: 'bg-yuzu/15 text-yuzu',
  'kansai-ben': 'bg-yuzu/15 text-yuzu',
};

type ContextTagBadgeProps = {
  tag: string;
};

export function ContextTagBadge({ tag }: ContextTagBadgeProps) {
  const colorClass = tagColorMap[tag.toLowerCase()] ?? 'bg-neutral-100 text-sumi-muted';
  const label = tag.charAt(0).toUpperCase() + tag.slice(1);

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
}
