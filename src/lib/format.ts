import type { Day, OpeningSlot } from '../data/site';
import type { Lang } from './i18n';

const DAY_NAMES: Record<Lang, Record<Day, string>> = {
  fr: {
    Monday: 'Lundi',
    Tuesday: 'Mardi',
    Wednesday: 'Mercredi',
    Thursday: 'Jeudi',
    Friday: 'Vendredi',
    Saturday: 'Samedi',
    Sunday: 'Dimanche',
  },
  en: {
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Sunday: 'Sunday',
  },
};

/** Espace insécable + « word joiner » : le tiret autorise sinon une coupure juste après lui. */
const NBSP = '\u00a0';
const WORD_JOINER = '\u2060';

export function dayName(day: Day, lang: Lang = 'fr'): string {
  return DAY_NAMES[lang][day];
}

/** "09:00" -> "9h" (fr) / "9:00" (en) ; "13:30" -> "13h30" / "13:30" */
export function formatTime(time: string, lang: Lang = 'fr'): string {
  const [h, m] = time.split(':');
  return lang === 'en' ? `${Number(h)}:${m}` : `${Number(h)}h${m === '00' ? '' : m}`;
}

/** ["Monday", ..., "Friday"] -> "Lundi – Vendredi" (jours consécutifs supposés) */
export function formatDays(days: readonly Day[], lang: Lang = 'fr'): string {
  const first = dayName(days[0], lang);
  return days.length === 1 ? first : `${first} – ${dayName(days[days.length - 1], lang)}`;
}

/**
 * Une ligne par groupe de jours identiques :
 * ["Lundi – Vendredi : 9h – 12h, 13h – 19h", "Samedi : 9h – 12h"]
 */
export function formatOpeningHours(slots: readonly OpeningSlot[], lang: Lang = 'fr'): string[] {
  const groups = new Map<string, OpeningSlot[]>();
  for (const slot of slots) {
    const key = slot.days.join();
    groups.set(key, [...(groups.get(key) ?? []), slot]);
  }
  return [...groups.values()].map((group) => {
    const ranges = group.map(
      ({ opens, closes }) => `${formatTime(opens, lang)}${NBSP}–${WORD_JOINER}${NBSP}${formatTime(closes, lang)}`,
    );
    return `${formatDays(group[0].days, lang)}${lang === 'fr' ? ' : ' : ': '}${ranges.join(', ')}`;
  });
}

/**
 * fr : ["Espèces", "Chèque"] -> "espèces et chèque" (minuscules)
 * en : ["cash", "cheque"] -> "cash and cheque" (casse conservée)
 */
export function formatList(items: readonly string[], lang: Lang = 'fr'): string {
  const values = lang === 'fr' ? items.map((item) => item.toLowerCase()) : items;
  // en-GB : pas de virgule avant « and » (clientèle britannique)
  return new Intl.ListFormat(lang === 'en' ? 'en-GB' : 'fr', { type: 'conjunction' }).format(values);
}

/** "Fanny Gerszkourez" -> "FG", "thorgal 14400" -> "T" (seuls les mots commençant par une lettre) */
export function initials(name: string): string {
  return name
    .split(' ')
    .filter((part) => /^\p{L}/u.test(part))
    .map((part) => part[0].toUpperCase())
    .join('');
}

/** 4.86 -> "4,9" */
export function formatRating(rating: number): string {
  return rating.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

/** "2024-12" ou "2024-12-05" -> "décembre 2024" */
export function formatMonth(date: string): string {
  return new Date(`${date.slice(0, 7)}-01T12:00:00`).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
}

/** 55 -> "55 €" (fr) / "€55" (en) */
export function formatPrice(amount: number, lang: Lang = 'fr'): string {
  return new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** "02 31 00 00 00" -> "tel:+33231000000" */
export function phoneHref(phone: string): string {
  return `tel:+33${phone.replace(/\D/g, '').replace(/^0/, '')}`;
}
