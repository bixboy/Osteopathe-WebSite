import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { site } from '../data/site';
import { initials } from './format';
import { token } from './tokens';

/**
 * Images de marque générées AU BUILD (favicon, icône Apple, image de partage) :
 * mises à jour automatiquement si le nom ou les couleurs changent.
 * satori convertit le texte en tracés : le rendu ne dépend pas des polices installées.
 */

// Résolution depuis la racine du projet (le fichier compilé ne vit pas dans src/)
const require = createRequire(path.join(process.cwd(), 'package.json'));
const font = (file: string) => fs.readFileSync(require.resolve(`@fontsource/${file}`));

const fonts = [
  { name: 'Fraunces', data: font('fraunces/files/fraunces-latin-500-normal.woff'), weight: 500, style: 'normal' },
  { name: 'Fraunces', data: font('fraunces/files/fraunces-latin-500-italic.woff'), weight: 500, style: 'italic' },
  { name: 'Inter', data: font('inter/files/inter-latin-400-normal.woff'), weight: 400, style: 'normal' },
  { name: 'Inter', data: font('inter/files/inter-latin-600-normal.woff'), weight: 600, style: 'normal' },
] as const;

type Style = Record<string, string | number>;
type Node = { type: string; props: { style?: Style; children?: Node | string | (Node | string)[] } };

/** Petit équivalent de JSX pour satori. */
function h(type: string, style: Style, children?: Node['props']['children']): Node {
  return { type, props: { style: { display: 'flex', ...style }, children } };
}

function render(node: Node, width: number, height: number): Promise<string> {
  return satori(node as never, { width, height, fonts: [...fonts] });
}

export function toPng(svg: string, width: number): Promise<Buffer> {
  return sharp(Buffer.from(svg)).resize(width).png().toBuffer();
}

/** Monogramme « FG » : rond pour le favicon, carré plein pour l'icône Apple (iOS arrondit lui-même). */
export function monogramSvg(shape: 'circle' | 'square' = 'circle'): Promise<string> {
  const size = 512;
  return render(
    h(
      'div',
      {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: shape === 'circle' ? '50%' : 0,
        backgroundColor: token('color-primary'),
        color: token('color-on-primary'),
        fontFamily: 'Fraunces',
        fontStyle: 'italic',
        fontSize: 250,
        letterSpacing: -6,
      },
      initials(site.name),
    ),
    size,
    size,
  );
}

/** Image d'aperçu des liens partagés (WhatsApp, Facebook, SMS…), 1200 × 630. */
export function ogImageSvg(): Promise<string> {
  const { address } = site;
  return render(
    h('div', { width: '100%', height: '100%', backgroundColor: token('color-bg'), position: 'relative' }, [
      // Forme décorative, rappel du hero
      h('div', {
        position: 'absolute',
        right: -110,
        top: 45,
        width: 540,
        height: 540,
        borderRadius: '50%',
        backgroundImage: `linear-gradient(145deg, ${token('color-primary-soft')}, ${token('color-primary')})`,
      }),
      h('div', {
        position: 'absolute',
        right: 380,
        top: 80,
        width: 44,
        height: 44,
        borderRadius: '50%',
        backgroundColor: token('color-accent'),
      }),
      h('div', { flexDirection: 'column', justifyContent: 'center', padding: '0 80px', width: 820, gap: 28 }, [
        h(
          'div',
          {
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 26,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: token('color-accent'),
          },
          `${site.profession} · ${address.city}`,
        ),
        h('div', { fontFamily: 'Fraunces', fontSize: 92, lineHeight: 1.05, color: token('color-text') }, site.name),
        h(
          'div',
          { fontFamily: 'Inter', fontSize: 32, color: token('color-text-muted') },
          `${address.street}, ${address.postalCode} ${address.city}`,
        ),
        h(
          'div',
          {
            alignSelf: 'flex-start',
            marginTop: 12,
            padding: '18px 36px',
            borderRadius: 999,
            backgroundColor: token('color-primary'),
            color: token('color-on-primary'),
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 30,
          },
          'Rendez-vous en ligne sur Doctolib',
        ),
      ]),
    ]),
    1200,
    630,
  );
}

/** Fichier .ico minimal contenant une image PNG (format accepté par tous les navigateurs). */
export function pngToIco(png: Buffer, size: number): Buffer {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // réservé
  header.writeUInt16LE(1, 2); // type : icône
  header.writeUInt16LE(1, 4); // nombre d'images
  header.writeUInt8(size, 6); // largeur
  header.writeUInt8(size, 7); // hauteur
  header.writeUInt16LE(1, 10); // plans de couleur
  header.writeUInt16LE(32, 12); // bits par pixel
  header.writeUInt32LE(png.length, 14); // taille des données
  header.writeUInt32LE(22, 18); // position des données
  return Buffer.concat([header, png]);
}
