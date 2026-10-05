// Upserts freshly fetched entries into a generated src/data/ file instead of
// replacing it: sources only expose their latest items (and can fail, or
// briefly drop an item), so nothing already stored is ever deleted. Entries
// are matched by URL; a fetched entry updates the stored one field by field,
// except for empty values ('' / null), which never overwrite stored data.
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const keyOf = (entry) => entry.url.replace(/\/$/, '');
const isEmpty = (value) => value === undefined || value === null || value === '';

async function readExisting(path, exportName) {
  // A missing, empty or malformed file just means there's nothing to merge with.
  return import(pathToFileURL(path).href).then(
    (module) => (Array.isArray(module[exportName]) ? module[exportName] : []),
    () => [],
  );
}

export async function upsertDataFile({ path, exportName, banner, entries }) {
  const existing = await readExisting(path, exportName);
  const byKey = new Map(existing.map((entry) => [keyOf(entry), entry]));

  let added = 0;
  let updated = 0;
  for (const entry of entries) {
    const key = keyOf(entry);
    const stored = byKey.get(key);
    if (!stored) {
      byKey.set(key, entry);
      added += 1;
      continue;
    }
    const fresh = Object.fromEntries(Object.entries(entry).filter(([, value]) => !isEmpty(value)));
    byKey.set(key, { ...stored, ...fresh });
    updated += 1;
  }

  const merged = [...byKey.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
  writeFileSync(path, `${banner}export const ${exportName} = ${JSON.stringify(merged, null, 2)};\n`);
  return { total: merged.length, added, updated, kept: merged.length - added - updated };
}
