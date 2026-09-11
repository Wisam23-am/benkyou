import { FuriganaText } from './furigana-text';
import { ContextTagBadge } from './context-tag-badge';
import { AudioPlayButton } from './audio-play-button';
import type { VocabItem, Track } from '@/types';

type VocabCardProps = {
  item: VocabItem;
  track?: Track;
};

export function VocabCard({ item, track = 'shiken' }: VocabCardProps) {
  const isShiken = track === 'shiken';
  const radiusClass = isShiken ? 'rounded-shiken' : 'rounded-seikatsu';

  return (
    <div className={`bg-paper-raised border border-neutral-300 ${radiusClass} p-4 hover:shadow-[0_4px_12px_rgba(35,38,43,0.08)] transition-shadow`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <FuriganaText
            kanji={item.kanji}
            reading={item.kana}
            className="font-jp text-3xl text-sumi inline-block"
          />
          {item.romaji && (
            <p className="text-sm text-sumi-muted mt-0.5">{item.romaji}</p>
          )}
        </div>
        {item.audio_url && <AudioPlayButton audioUrl={item.audio_url} />}
      </div>

      <div className="mt-3">
        <p className="text-base font-medium text-sumi">{item.meaning}</p>
        {item.part_of_speech && (
          <p className="text-xs text-sumi-muted mt-0.5">{item.part_of_speech}</p>
        )}
      </div>

      {item.example_sentence && (
        <div className="mt-3 pl-3 border-l-2 border-neutral-300">
          <p className="text-sm font-jp text-sumi">{item.example_sentence}</p>
        </div>
      )}

      {item.context_tags && item.context_tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {item.context_tags.map((tag) => (
            <ContextTagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      {item.mnemonic && (
        <details className="mt-3 group">
          <summary className="text-xs text-sumi-muted cursor-pointer hover:text-sumi flex items-center gap-1 list-none font-medium">
            <span>💡 Mnemonic: Cara mudah ingat</span>
          </summary>
          <div className="mt-2 p-2.5 bg-neutral-100 rounded text-sm text-sumi">
            {item.mnemonic}
          </div>
        </details>
      )}
    </div>
  );
}
