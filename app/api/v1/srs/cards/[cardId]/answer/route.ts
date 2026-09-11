import { apiSuccess, apiError } from '@/lib/api-response';
import { submitSrsAnswerSchema } from '@/lib/validations';
import { createClient } from '@/lib/supabase/server';
import { submitSrsAnswer } from '@/lib/services/srs/submit-srs-answer';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ cardId: string }> },
) {
  const { cardId } = await params;
  const parsed = submitSrsAnswerSchema.safeParse(await request.json());
  if (!parsed.success) {
    return apiError('VALIDATION_ERROR', 400, 'Invalid review answer');
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return apiError('UNAUTHORIZED', 401, 'Authentication required');

  try {
    const result = await submitSrsAnswer(supabase, {
      userId: user.id,
      cardId,
      rating: parsed.data.rating,
      responseTimeMs: parsed.data.responseTimeMs,
    });
    return apiSuccess(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Gagal memperbarui review';
    if (message === 'CARD_NOT_FOUND') {
      return apiError('NOT_FOUND', 404, 'Review card not found');
    }
    return apiError('UPDATE_FAILED', 500, message);
  }
}