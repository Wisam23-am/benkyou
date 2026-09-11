import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(url, key);

async function check() {
  const { data } = await supabase.rpc('get_schema_info', {}); 
  // Wait, if no rpc, we can try inserting a bad row to get an error, or just checking the info schema if postgres is accessible.
  // Actually, we can just insert a card!
}
