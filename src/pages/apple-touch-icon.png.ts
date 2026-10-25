import type { APIRoute } from 'astro';
import { monogramSvg, toPng } from '../lib/brand-images';

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await toPng(await monogramSvg('square'), 180)), {
    headers: { 'Content-Type': 'image/png' },
  });
