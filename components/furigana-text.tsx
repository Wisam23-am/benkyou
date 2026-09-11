import React from 'react';

interface FuriganaTextProps {
  text?: string;
  kanji?: string;
  reading?: string;
  className?: string;
}

export function FuriganaText({ text, kanji, reading, className = '' }: FuriganaTextProps) {
  if (kanji && reading) {
    // Mode lama: pass kanji & reading secara eksplisit
    if (kanji === reading) {
      return <span className={className}>{kanji}</span>;
    }
    return (
      <ruby className={className}>
        {kanji}
        <rt className="text-[0.5em] text-sumi-muted select-none">{reading}</rt>
      </ruby>
    );
  }

  if (text) {
    // Mode baru: parsing sintaks [Kanji|Furigana]
    const regex = /\[([^|\]]+)\|([^\]]+)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const k = match[1];
      const r = match[2];
      parts.push(
        <ruby key={match.index} className="leading-none">
          {k}
          <rt className="text-[0.5em] text-sumi-muted select-none">{r}</rt>
        </ruby>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return <span className={className}>{parts}</span>;
  }
  
  return null;
}
