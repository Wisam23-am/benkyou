import type { KanjiItem, Track } from '@/types';

type KanjiCardProps = {
  item: KanjiItem;
  track?: Track;
};

export function KanjiCard({ item, track = 'shiken' }: KanjiCardProps) {
  const isShiken = track === 'shiken';
  const radiusClass = isShiken ? 'rounded-shiken' : 'rounded-seikatsu';

  return (
    <div className={`bg-paper-raised border border-neutral-300 ${radiusClass} p-4 hover:shadow-[0_4px_12px_rgba(35,38,43,0.08)] transition-shadow`}>
      <div className="flex items-center gap-4">
        <span className="font-jp text-5xl text-sumi leading-none">
          {item.character}
        </span>
        <div className="flex-1">
          <p className="text-base font-medium text-sumi">{item.meaning}</p>
          {item.stroke_count && (
            <p className="text-xs text-sumi-muted">{item.stroke_count} goresan</p>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm bg-neutral-100/60 p-2.5 rounded">
        {item.onyomi && (
          <div>
            <span className="text-xs text-sumi-muted block">On’yomi</span>
            <p className="font-jp text-sumi font-medium">{item.onyomi}</p>
          </div>
        )}
        {item.kunyomi && (
          <div>
            <span className="text-xs text-sumi-muted block">Kun’yomi</span>
            <p className="font-jp text-sumi font-medium">{item.kunyomi}</p>
          </div>
        )}
      </div>

      {item.examples && item.examples.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-sumi-muted mb-1">Contoh kata:</p>
          <div className="flex flex-wrap gap-1.5">
            {item.examples.map((ex, i) => (
              <span key={i} className="text-xs font-jp text-sumi bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
                {ex}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
