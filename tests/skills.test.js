// @vitest-environment happy-dom
// The hard skills list shows level-3 skills and hides the rest behind a
// per-group "See N more" toggle.
import { describe, expect, it } from 'vitest';
import { hardSkills } from '../src/data/skills.js';
import { mountView } from './flags/helpers.js';

const EXPERIENCE = '../../src/views/ExperienceView.vue';
const groupsWithHidden = hardSkills.filter(
  (group) => group.items.some((item) => item.level === 3) && group.items.some((item) => item.level < 3),
);

describe('hard skills "See more"', () => {
  it('has a group with hidden skills to test with', () => {
    expect(groupsWithHidden.length).toBeGreaterThan(0);
  });

  it('only shows level-3 skills at first, with one toggle per group that hides some', async () => {
    const view = await mountView(EXPERIENCE, {});
    const names = view.findAll('.skill-meter__name').map((name) => name.text());
    for (const group of hardSkills) {
      for (const item of group.items) {
        if (item.level === 3) expect(names).toContain(item.name);
        else expect(names).not.toContain(item.name);
      }
    }

    const toggles = view.findAll('.skill-group__toggle');
    expect(toggles).toHaveLength(groupsWithHidden.length);
    groupsWithHidden.forEach((group, i) => {
      const hidden = group.items.filter((item) => item.level < 3).length;
      expect(toggles[i].text()).toContain(`See ${hidden} more`);
      expect(toggles[i].attributes('aria-expanded')).toBe('false');
    });
  });

  it('reveals the hidden skills of a group, then hides them again', async () => {
    const view = await mountView(EXPERIENCE, {});
    const [group] = groupsWithHidden;
    const lower = group.items.filter((item) => item.level < 3).map((item) => item.name);
    const toggle = view.find('.skill-group__toggle');

    await toggle.trigger('click');
    let names = view.findAll('.skill-meter__name').map((name) => name.text());
    for (const name of lower) expect(names).toContain(name);
    expect(toggle.text()).toContain('See less');
    expect(toggle.attributes('aria-expanded')).toBe('true');

    await toggle.trigger('click');
    names = view.findAll('.skill-meter__name').map((name) => name.text());
    for (const name of lower) expect(names).not.toContain(name);
  });
});
