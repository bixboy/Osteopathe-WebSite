import type { APIRoute } from 'astro';
import { monogramSvg } from '../lib/brand-images';

export const GET: APIRoute = async () =>
  new Response(await monogramSvg(), { headers: { 'Content-Type': 'image/svg+xml' } });
