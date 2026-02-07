/**
 * Простая транслитерация кириллицы (uk/ru) → ASCII (нижний регистр)
 */
const CYR_TO_LAT: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "h",
  ґ: "g",
  д: "d",
  е: "e",
  є: "ie",
  ж: "zh",
  з: "z",
  и: "y",
  і: "i",
  ї: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ь: "",
  ю: "iu",
  я: "ia",
  э: "e",
  ё: "io",
  ы: "y",
  ъ: "",
};

const translitCyr = (input: string) =>
  input.replace(
    /[А-ЯЁЇІЄҐа-яёїієґ]/g,
    (ch) =>
      CYR_TO_LAT[ch.toLowerCase()] ?? ch.toLowerCase(),
  );

/**
 * Делает безопасный slug: ASCII, дефисы, без повторов/хвостов, с ограничением длины.
 */
export function slugify(raw: string, maxLen = 80): string {
  const t = translitCyr(raw);
  const noDiacritics = t
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
  const dashed = noDiacritics.replace(
    /[^A-Za-z0-9]+/g,
    "-",
  );
  const compact = dashed
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  if (!compact) return "dish";
  if (compact.length <= maxLen) return compact;

  // обрезаем и прибираем дефисы на конце после обрезки
  return compact.slice(0, maxLen).replace(/-+$/g, "");
}
