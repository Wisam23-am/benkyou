import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function findUUID() {
  const targetId = '42d0edf2-144a-4d0e-91c2-51ea4df6aee5';
  const { data: kanji } = await supabase.from('kanji_items').select('*').eq('id', targetId);
  console.log('In Kanji:', kanji);
  const { data: vocab } = await supabase.from('vocab_items').select('*').eq('id', targetId);
  console.log('In Vocab:', vocab);
  const { data: review } = await supabase.from('review_cards').select('*').eq('item_id', targetId);
  console.log('In ReviewCards (item_id):', review);
  const { data: review2 } = await supabase.from('review_cards').select('*').eq('id', targetId);
  console.log('In ReviewCards (id):', review2);
}
findUUID();
