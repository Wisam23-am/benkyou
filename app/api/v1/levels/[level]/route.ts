import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';
import { curriculum } from '@/lib/curriculum';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ level: string }> }
) {
  const { level } = await params;
  const upperLevel = level.toUpperCase();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('levels')
    .select('id, name, code, description')
    .ilike('code', upperLevel)
    .single();

  if (error || !data) {
    if (upperLevel === curriculum.code) {
      return apiSuccess({
        id: 'n5-static-id',
        code: curriculum.code,
        name: curriculum.title,
        description: curriculum.description,
        tracks: curriculum.tracks,
      });
    }
    return apiError('NOT_FOUND', 404, 'Level not found');
  }

  return apiSuccess(data);
}
