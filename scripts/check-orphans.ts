import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function checkOrphans() {
  const { data: cards } = await supabase.from('review_cards').select('id, item_id, item_type');
  if (!cards) return console.log('No cards');

  console.log(`Total cards: ${cards.length}`);
  
  for (const card of cards) {
    if (card.item_type === 'kanji') {
      const { data: kanji } = await supabase.from('kanji_items').select('id, character').eq('id', card.item_id).single();
      if (!kanji) {
        console.log(`Orphaned Kanji card: ${card.id}, item_id: ${card.item_id}`);
      } else {
        console.log(`Valid Kanji card: ${card.id}, character: ${kanji.character}`);
      }
    }
  }
}
checkOrphans();
