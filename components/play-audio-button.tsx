"use client";

import { Volume2 } from 'lucide-react';

export function PlayAudioButton({ text }: { text: string }) {
  const playAudio = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // Batalkan suara yang sedang berjalan agar tidak menumpuk
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP'; // Set bahasa Jepang
    utterance.rate = 0.9; // Sedikit lebih lambat untuk pembelajaran
    
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button 
      onClick={playAudio}
      className="rounded-full bg-neutral-100 p-2 text-sumi-muted hover:bg-matcha hover:text-white transition-colors"
      title="Dengarkan pengucapan"
    >
      <Volume2 size={18} />
    </button>
  );
}
