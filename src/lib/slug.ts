const DIACRITIC_MARKS_REGEX = /[̀-ͯ]/g;

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(DIACRITIC_MARKS_REGEX, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
