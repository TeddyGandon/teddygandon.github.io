import { describe, expect, it } from 'vitest';
import { decodeEntities, excerptFrom, stripHtml } from '../../scripts/load-external-sources/html-utils.js';

describe('html-utils', () => {
  it('decodes the entities found in titles and excerpts', () => {
    expect(decodeEntities('It&#8217;s &#8220;fine&#8221; &amp; calm &#8211; mostly&#8230;')).toBe('It’s “fine” & calm – mostly…');
    expect(decodeEntities('&quot;a&quot; &#39;b&#39;&nbsp;c')).toBe('"a" \'b\' c');
  });

  it('strips tags and collapses whitespace', () => {
    expect(stripHtml('<p>Hello <strong>world</strong></p>\n\n<p>again</p>')).toBe('Hello world again');
  });

  it('keeps short text as is and cuts long text on a word boundary', () => {
    expect(excerptFrom('<p>Short.</p>')).toBe('Short.');
    const long = `<p>${'word '.repeat(100)}</p>`;
    const excerpt = excerptFrom(long, 22);
    expect(excerpt).toBe('word word word word…');
    expect(excerpt.length).toBeLessThanOrEqual(23);
  });
});
