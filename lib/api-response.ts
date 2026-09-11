import { NextResponse } from 'next/server';

export function apiSuccess<T>(data: T, status = 200, meta?: Record<string, unknown>) {
  return NextResponse.json(
    { success: true, data, ...(meta ? { meta } : {}) },
    { status }
  );
}

export function apiError(
  code: string,
  status: number,
  message: string,
  details?: Array<{ field: string; message: string }>
) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details: details ?? null,
        traceId: crypto.randomUUID(),
      },
    },
    { status }
  );
}
