// Mounts a view with a given set of flags. Every module is re-imported per
// call (vi.resetModules), since several of them read the flags — and the
// current date — once, at import time (experience.js, articles.js).
import { vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';

export const ALL_OFF = {
  displayAllArticles: false,
  displayCertifications: false,
  displayNewRole: false,
  displayArticlesTags: false,
  displayChangingTheme: false,
};

const Stub = { render: () => null };

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: Stub },
      { path: '/experience', name: 'experience', component: Stub },
      { path: '/projects', name: 'projects', component: Stub },
      { path: '/articles', name: 'articles', component: Stub },
      { path: '/articles/:slug', name: 'article', component: Stub },
    ],
  });
}

// Sets the clock, so date-gated logic sees `date` from the very first import.
export function setToday(date) {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(date);
}

export async function importWithFlags(modulePath, flags) {
  vi.resetModules();
  vi.doMock('../../src/data/flags.js', () => ({ flags: { ...ALL_OFF, ...flags } }));
  return (await import(/* @vite-ignore */ modulePath)).default;
}

export async function mountView(viewPath, flags, { route = '/', props } = {}) {
  const component = await importWithFlags(viewPath, flags);
  const router = createTestRouter();
  await router.push(route);
  await router.isReady();
  const wrapper = mount(component, {
    props,
    global: { plugins: [router], directives: { reveal: {} } },
  });
  await flushPromises();
  return wrapper;
}

export async function mountComponent(componentPath, flags) {
  return mount(await importWithFlags(componentPath, flags));
}
