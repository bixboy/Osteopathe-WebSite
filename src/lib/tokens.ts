import tokensCss from '../styles/tokens.css?raw';

/**
 * Lit une variable de src/styles/tokens.css (ex. token('color-primary') -> "#3f6b5c").
 * Pour les rares endroits hors CSS qui ont besoin d'une couleur (images générées,
 * <meta name="theme-color">) : tokens.css reste la seule source.
 */
export function token(name: string): string {
  const value = tokensCss.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1].trim();
  if (!value) throw new Error(`Token CSS introuvable : --${name}`);
  return value;
}
