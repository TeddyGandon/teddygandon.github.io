import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { upsertDataFile } from '../../scripts/load-external-sources/merge.js';

const banner = '// banner\n';

// Reads a written data file back without going through the module cache.
function readEntries(path, exportName) {
  const source = readFileSync(path, 'utf-8');
  expect(source.startsWith(banner)).toBe(true);
  const json = source.slice(source.indexOf(`export const ${exportName} = `) + `export const ${exportName} = `.length);
  return JSON.parse(json.trim().replace(/;$/, ''));
}

describe('upsertDataFile', () => {
  let dir;
  let count = 0;
  // A fresh file name per call: merge.js reads the previous content with import(), which caches by URL.
  const newPath = () => join(dir, `data-${(count += 1)}.js`);
  const store = (path, entries) => writeFileSync(path, `export const posts = ${JSON.stringify(entries)};\n`);

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'merge-'));
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('creates the file when there is nothing stored yet', async () => {
    const path = newPath();
    const stats = await upsertDataFile({
      path,
      exportName: 'posts',
      banner,
      entries: [
        { url: 'https://a.test/1', date: '2026-01-01', title: 'One' },
        { url: 'https://a.test/2', date: '2026-02-01', title: 'Two' },
      ],
    });
    expect(stats).toEqual({ total: 2, added: 2, updated: 0, kept: 0 });
    // Most recent first.
    expect(readEntries(path, 'posts').map((entry) => entry.title)).toEqual(['Two', 'One']);
  });

  it('never deletes stored entries that are no longer fetched', async () => {
    const path = newPath();
    store(path, [{ url: 'https://a.test/old', date: '2025-01-01', title: 'Old, hand-added' }]);
    const stats = await upsertDataFile({ path, exportName: 'posts', banner, entries: [] });
    expect(stats).toEqual({ total: 1, added: 0, updated: 0, kept: 1 });
    expect(readEntries(path, 'posts')).toEqual([{ url: 'https://a.test/old', date: '2025-01-01', title: 'Old, hand-added' }]);
  });

  it('updates entries matched by URL (ignoring a trailing slash) without overwriting with empty values', async () => {
    const path = newPath();
    store(path, [{ url: 'https://a.test/1/', date: '2026-01-01', title: 'Old title', image: 'https://img.test/1.png', extra: 'kept' }]);
    const stats = await upsertDataFile({
      path,
      exportName: 'posts',
      banner,
      entries: [{ url: 'https://a.test/1', date: '', title: 'New title', image: null }],
    });
    expect(stats).toEqual({ total: 1, added: 0, updated: 1, kept: 0 });
    expect(readEntries(path, 'posts')).toEqual([
      { url: 'https://a.test/1', date: '2026-01-01', title: 'New title', image: 'https://img.test/1.png', extra: 'kept' },
    ]);
  });

  it('treats a malformed stored file as empty instead of crashing', async () => {
    const path = newPath();
    writeFileSync(path, 'this is not javascript {');
    const stats = await upsertDataFile({
      path,
      exportName: 'posts',
      banner,
      entries: [{ url: 'https://a.test/1', date: '2026-01-01' }],
    });
    expect(stats.total).toBe(1);
  });

  it('writes a file that can be imported back', async () => {
    const path = newPath();
    await upsertDataFile({ path, exportName: 'posts', banner, entries: [{ url: 'https://a.test/1', date: '2026-01-01', text: 'It’s "quoted"\nand multi-line' }] });
    const { pathToFileURL } = await import('node:url');
    const module = await import(/* @vite-ignore */ pathToFileURL(path).href);
    expect(module.posts[0].text).toBe('It’s "quoted"\nand multi-line');
  });
});
