import { apiSuccess, apiError } from '@/lib/api-response';
import { n5Questions } from '@/lib/quiz';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ level: string }> }
) {
  const { level } = await params;
  if (level.toUpperCase() !== 'N5') {
    return apiError('NOT_FOUND', 404, 'Quiz level not found');
  }

  return apiSuccess(
    n5Questions.map((question) => ({
      id: question.id,
      category: question.category,
      prompt: question.prompt,
      options: question.options,
      explanation: question.explanation,
    }))
  );
}