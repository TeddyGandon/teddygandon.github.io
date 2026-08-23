export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
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
