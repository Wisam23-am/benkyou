'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

type AudioPlayButtonProps = {
  audioUrl: string;
  className?: string;
};

export function AudioPlayButton({ audioUrl, className }: AudioPlayButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.preload = 'none';
      audioRef.current.onended = () => setIsPlaying(false);
    }
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={handlePlay}
      aria-label={isPlaying ? 'Stop audio' : 'Putar audio'}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-ai-soft text-ai hover:bg-ai hover:text-paper transition-colors min-w-[44px] min-h-[44px] ${className ?? ''}`}
    >
      {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
}
