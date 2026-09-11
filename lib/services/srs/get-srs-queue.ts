import type { SupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';

export interface EnrichedReviewCard {
  id: string;
  item_type: 'vocab' | 'kanji' | 'grammar';
  item_id: string;
  due_at: string;
  interval: number;
  ease_factor: number;
  reviews: number;
  prompt: string;
  reading?: string;
  meaning?: string;
  example?: string;
}

export async function getSrsQueue(supabase: SupabaseClient, userId: string) {
  const { data: cards, error } = await supabase
    .from('review_cards')
    .select('id, item_type, item_id, due_at, interval, ease_factor, reviews, created_at, updated_at, user_id')
    .eq('user_id', userId)
    .lte('due_at', new Date().toISOString())
    .order('due_at', { ascending: true })
    .limit(50);

  if (error) throw new Error('QUEUE_FETCH_FAILED');
  if (!cards || cards.length === 0) {
    return {
      totalDue: 0,
      cards: [],
    };
  }

  const vocabIds = cards.filter((c) => c.item_type === 'vocab').map((c) => c.item_id);
  const kanjiIds = cards.filter((c) => c.item_type === 'kanji').map((c) => c.item_id);

  const adminClient = createAdminClient();

  const [vocabRes, kanjiRes] = await Promise.all([
    vocabIds.length > 0
      ? adminClient.from('vocab_items').select('id, term, reading, meaning, example_sentence').in('id', vocabIds)
      : Promise.resolve({ data: [] }),
    kanjiIds.length > 0
      ? adminClient.from('kanji_items').select('id, character, readings, meaning').in('id', kanjiIds)
      : Promise.resolve({ data: [] }),
  ]);

  const vocabMap = new Map((vocabRes.data ?? []).map((v) => [v.id, v]));
  const kanjiMap = new Map((kanjiRes.data ?? []).map((k) => [k.id, k]));

  const enrichedCards: EnrichedReviewCard[] = cards.map((c) => {
    if (c.item_type === 'vocab') {
      const v = vocabMap.get(c.item_id);
      return {
        id: c.id,
        item_type: c.item_type,
        item_id: c.item_id,
        due_at: c.due_at,
        interval: c.interval,
        ease_factor: c.ease_factor,
        reviews: c.reviews,
        prompt: v?.term ?? c.item_id,
        reading: v?.reading ?? undefined,
        meaning: v?.meaning ?? 'Kosakata',
        example: v?.example_sentence ?? undefined,
      };
    }
    if (c.item_type === 'kanji') {
      const k = kanjiMap.get(c.item_id);
      return {
        id: c.id,
        item_type: c.item_type,
        item_id: c.item_id,
        due_at: c.due_at,
        interval: c.interval,
        ease_factor: c.ease_factor,
        reviews: c.reviews,
        prompt: k?.character ?? c.item_id,
        reading: k?.readings?.join(' · ') || undefined,
        meaning: k?.meaning ?? 'Kanji',
      };
    }
    return {
      id: c.id,
      item_type: c.item_type,
      item_id: c.item_id,
      due_at: c.due_at,
      interval: c.interval,
      ease_factor: c.ease_factor,
      reviews: c.reviews,
      prompt: c.item_id,
      meaning: 'Tata bahasa',
    };
  });

  return {
    totalDue: enrichedCards.length,
    cards: enrichedCards,
  };
}
