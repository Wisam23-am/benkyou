import { NextResponse } from 'next/server';
import { curriculum } from '@/lib/curriculum';

export async function GET(_request: Request, { params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = await params;
  for (const track of curriculum.tracks) { const unit = track.units.find((item) => item.slug === unitId); if (unit) return NextResponse.json({ success: true, data: { ...unit, track: track.code } }); }
  return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Unit not found' } }, { status: 404 });
}
