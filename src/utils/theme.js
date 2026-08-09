// Runtime palette switcher — sets <html data-palette="..."> (see _theme-vars.scss),
// which is a separate attribute from Bulma's own <html data-theme="dark">.
// A blocking inline script in index.html applies a stored value before first
// paint (avoids a flash of the default palette); this module keeps it reactive
// for the rest of the session.
import { ref, watch } from 'vue';

export const THEMES = [
  { value: 'paper' },
  { value: 'cyberpunk' },
  { value: 'christmas' },
  { value: 'halloween' },
];

export const theme = ref(THEMES[0].value);

watch(
  theme,
  (value) => {
    document.documentElement.setAttribute('data-palette', value);
  },
  { immediate: true },
);

// Time/date-based suggestion for the nav's emoji quick-toggle. Seasonal
// months take priority over the nightly window since they're the rarer case.
const NIGHT_START_HOUR = 23;
const NIGHT_END_HOUR = 4;
const HALLOWEEN_MONTH = 9; // October — Date#getMonth() is 0-indexed
const CHRISTMAS_MONTH = 11; // December

export function getAutoTheme(now = new Date()) {
  const month = now.getMonth();
  const hour = now.getHours();

  if (month === HALLOWEEN_MONTH) return { value: 'halloween', emoji: '🎃' };
  if (month === CHRISTMAS_MONTH) return { value: 'christmas', emoji: '🎄' };
  if (hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR) return { value: 'cyberpunk', emoji: '🌆' };
  return null;
}
