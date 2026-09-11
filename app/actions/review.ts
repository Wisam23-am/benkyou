"use server"

import { createClient } from '@/lib/supabase/server';

export async function addToReview(itemId: string, itemType: 'kanji' | 'vocab' | 'grammar') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: 'User not authenticated' };

  // Cek apakah item sudah ada di antrean review
  const { data: existing } = await supabase
    .from('review_cards')
    .select('id')
    .eq('user_id', user.id)
    .eq('item_id', itemId)
    .eq('item_type', itemType)
    .single();

  if (existing) {
    return { success: false, message: 'Sudah ada di antrean review Anda.' };
  }

  const { error } = await supabase
    .from('review_cards')
    .insert({
      user_id: user.id,
      item_id: itemId,
      item_type: itemType,
      due_at: new Date().toISOString(), // Langsung due hari ini
      interval: 0,
      ease_factor: 2.5,
      reviews: 0
    });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, message: 'Berhasil ditambahkan ke antrean SRS.' };
}
