// Domain Types
export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
export type Track = 'shiken' | 'seikatsu' | 'both';
export type SrsRating = 'lupa' | 'sulit' | 'bisa' | 'mudah';

// Database Types
export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  display_name: string | null;
  avatar_url: string | null;
}

export interface Level {
  id: string;
  name: string;
  code: JlptLevel;
  description: string | null;
}

export interface Track_Record {
  id: string;
  name: string;
  code: Track;
  description: string | null;
  level_id: string;
}

export interface Unit {
  id: string;
  title: string;
  description: string | null;
  track_id: string;
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string | null;
  unit_id: string;
  order: number;
}

export interface VocabItem {
  id: string;
  lesson_id: string | null;
  level_id: string;
  kanji: string;
  kana: string;
  romaji?: string | null;
  meaning: string;
  example_sentence?: string | null;
  audio_url?: string | null;
  part_of_speech?: string | null;
  context_tags?: string[] | null;
  mnemonic?: string | null;
  created_at?: string;
}

export interface KanjiItem {
  id: string;
  lesson_id: string | null;
  level_id: string;
  character: string;
  onyomi: string | null;
  kunyomi: string | null;
  meaning: string;
  stroke_count?: number | null;
  stroke_order_url?: string | null;
  examples?: string[] | null;
  created_at?: string;
}

export interface GrammarPoint {
  id: string;
  lesson_id: string | null;
  level_id: string;
  pattern: string;
  meaning: string;
  example: string;
  formal_version?: string | null;
  casual_version?: string | null;
  track?: Track | null;
  created_at?: string;
}

export interface ListeningItem {
  id: string;
  lesson_id: string | null;
  level_id: string;
  audio_url: string;
  transcript: string;
  translation: string;
  annotations?: Array<{ start: number; end: number; text: string; explanation: string }> | null;
  duration_seconds?: number | null;
  created_at?: string;
}

export interface ReviewCard {
  id: string;
  user_id: string;
  item_id: string;
  item_type: 'vocab' | 'kanji' | 'grammar';
  due_at: string;
  interval: number;
  ease_factor: number;
  reviews: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewLog {
  id: string;
  card_id: string;
  user_id: string;
  rating: SrsRating;
  response_time_ms: number;
  created_at: string;
}

// API Response Types
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    traceId: string;
    details?: Array<{
      field: string;
      message: string;
    }> | null;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
