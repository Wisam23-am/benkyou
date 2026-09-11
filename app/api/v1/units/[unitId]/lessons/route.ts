import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';
import { curriculum } from '@/lib/curriculum';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ unitId: string }> }
) {
  const { unitId } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('lessons')
    .select('id, title, description, unit_id, order')
    .eq('unit_id', unitId)
    .order('order', { ascending: true });

  if (!error && data && data.length > 0) {
    return apiSuccess(data);
  }

  // Fallback if matching unit slug in static curriculum
  const unit = curriculum.tracks
    .flatMap((t) => t.units)
    .find((u) => u.slug === unitId);

  if (unit) {
    return apiSuccess(
      unit.lessons.map((l, index) => ({
        id: l.slug,
        title: l.title,
        description: l.description,
        unit_id: unitId,
        order: index + 1,
      }))
    );
  }

  return apiError('NOT_FOUND', 404, 'Unit lessons not found');
}
