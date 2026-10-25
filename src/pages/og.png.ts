import type { APIRoute } from 'astro';
import { ogImageSvg, toPng } from '../lib/brand-images';

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await toPng(await ogImageSvg(), 1200)), {
    headers: { 'Content-Type': 'image/png' },
  });
