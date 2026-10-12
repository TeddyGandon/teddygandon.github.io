export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Tags are stored as lowercase slugs ("mental-health") for URLs and filtering;
// this is only how they're displayed ("Mental health"). Acronyms are listed
// explicitly, so "ai" reads "AI" and not "Ai".
const TAG_ACRONYMS = { ai: 'AI' };

export function formatTag(tag) {
  if (!tag) return '';
  if (TAG_ACRONYMS[tag]) return TAG_ACRONYMS[tag];
  const words = tag.replace(/-/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

// Joins items for running text: "a", "a & b", "a, b & c".
export function formatList(items) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} & ${items.at(-1)}`;
}

const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(html) {
  if (!html) return '';
  const wordCount = html
    .replace(/<[^>]*>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// Parses loose "Mon YYYY" style dates (e.g. "Sept 2026", "Oct 2026") into a
// sortable Date. Only the month's first three letters are matched, so both
// "Sep" and "Sept" resolve to the same month.
export function parseMonthYear(dateStr) {
  if (!dateStr) return null;
  const [monthStr, yearStr] = dateStr.trim().split(/\s+/);
  const monthIndex = MONTHS.indexOf(monthStr?.slice(0, 3).toLowerCase());
  if (monthIndex === -1 || !yearStr) return null;
  return new Date(Number(yearStr), monthIndex);
}
