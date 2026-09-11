import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Track } from '@/types';

interface UiState {
  furiganaEnabled: boolean;
  setFuriganaEnabled: (enabled: boolean) => void;
  activeTrack: Track;
  setActiveTrack: (track: Track) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      furiganaEnabled: true,
      setFuriganaEnabled: (enabled) => set({ furiganaEnabled: enabled }),
      activeTrack: 'shiken',
      setActiveTrack: (track) => set({ activeTrack: track }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
