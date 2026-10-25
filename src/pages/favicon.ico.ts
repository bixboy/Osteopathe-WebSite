import type { APIRoute } from 'astro';
import { monogramSvg, pngToIco, toPng } from '../lib/brand-images';

export const GET: APIRoute = async () => {
  const png = await toPng(await monogramSvg(), 48);
  return new Response(new Uint8Array(pngToIco(png, 48)), { headers: { 'Content-Type': 'image/x-icon' } });
};
