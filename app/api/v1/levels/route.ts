import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';
import { curriculum } from '@/lib/curriculum';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('levels')
    .select('id, name, code, description')
    .order('code', { ascending: true });

  if (error || !data || data.length === 0) {
    // Fallback gracefully to curriculum data if DB not yet seeded
    return apiSuccess([
      {
        id: 'n5-static-id',
        code: curriculum.code,
        name: curriculum.title,
        description: curriculum.description,
      },
    ]);
  }

  return apiSuccess(data);
}
