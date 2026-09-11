import { apiSuccess, apiError } from '@/lib/api-response';
import { createClient } from '@/lib/supabase/server';
import { curriculum } from '@/lib/curriculum';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ level: string }> }
) {
  const { level } = await params;
  const upperLevel = level.toUpperCase();
  const track = new URL(request.url).searchParams.get('track');

  const supabase = await createClient();

  // Try fetching from DB
  const { data: levelData } = await supabase
    .from('levels')
    .select('id')
    .ilike('code', upperLevel)
    .single();

  if (levelData) {
    let query = supabase
      .from('units')
      .select('id, title, description, track_id, order')
      .order('order', { ascending: true });

    if (track) {
      const { data: trackData } = await supabase
        .from('tracks')
        .select('id')
        .eq('code', track)
        .eq('level_id', levelData.id)
        .single();

      if (trackData) {
        query = query.eq('track_id', trackData.id);
      }
    }

    const { data: units, error } = await query;
    if (!error && units && units.length > 0) {
      return apiSuccess(units);
    }
  }

  // Fallback to static curriculum
  if (upperLevel !== curriculum.code) {
    return apiError('NOT_FOUND', 404, 'Level not found');
  }

  const tracks = track
    ? curriculum.tracks.filter((item) => item.code === track)
    : curriculum.tracks;

  const data = tracks.flatMap((item) =>
    item.units.map((unit) => ({ ...unit, track: item.code }))
  );

  return apiSuccess(data);
}
