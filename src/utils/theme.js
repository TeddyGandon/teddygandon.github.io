// Runtime palette switcher — sets <html data-palette="..."> (see _theme-vars.scss),
// which is a separate attribute from Bulma's own <html data-theme="dark">.
// A blocking inline script in index.html applies a stored value before first
// paint (avoids a flash of the default palette); this module keeps it reactive
// for the rest of the session.
import { ref, watch } from 'vue';

export const THEMES = [
  'paper',
  'cyberpunk',
  'christmas',
  'halloween',
  'amiga',
];

export const DEFAULT_THEME = THEMES[0];

export const theme = ref(DEFAULT_THEME);

watch(
  theme,
  (value) => {
    document.documentElement.setAttribute('data-palette', value);
  },
  { immediate: true },
);
