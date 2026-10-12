import { describe, expect, it } from 'vitest';
import { formatList, formatTag } from '../src/utils/format.js';

describe('formatTag', () => {
  it('capitalizes the first letter', () => {
    expect(formatTag('management')).toBe('Management');
  });

  it('replaces dashes with spaces', () => {
    expect(formatTag('mental-health')).toBe('Mental health');
  });

  it('keeps acronyms in uppercase', () => {
    expect(formatTag('ai')).toBe('AI');
  });

  it('returns an empty string for an empty tag', () => {
    expect(formatTag('')).toBe('');
    expect(formatTag(undefined)).toBe('');
  });
});

describe('formatList', () => {
  it('joins items with commas and a final ampersand', () => {
    expect(formatList([])).toBe('');
    expect(formatList(['one'])).toBe('one');
    expect(formatList(['one', 'two'])).toBe('one & two');
    expect(formatList(['one', 'two', 'three'])).toBe('one, two & three');
  });
});
