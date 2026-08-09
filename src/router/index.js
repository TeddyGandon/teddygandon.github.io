import { createRouter, createWebHistory } from 'vue-router';
import { setPageMeta } from '../utils/seo';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/experience',
    name: 'experience',
    component: () => import('../views/ExperienceView.vue'),
    meta: {
      title: 'Experience',
      description:
        'Twenty years of engineering experience, certifications, and hard/soft skills — Teddy Gandon, Engineering Manager.',
    },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue'),
    meta: {
      title: 'Side projects',
      description: 'Personal games and the open-source platform behind them, built in my free time.',
    },
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('../views/ArticlesView.vue'),
    // Title/description are refined further inside ArticlesView when a tag filter is active.
    meta: {
      title: 'Articles',
      description: 'Writing on multicultural management, engineering leadership, and frameworks.',
    },
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: () => import('../views/ArticleView.vue'),
    props: true,
    // No static meta here — ArticleView sets title/description once the article is loaded.
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: 'Contact',
      description: 'Get in touch with Teddy Gandon, Engineering Manager.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'Page not found' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0, behavior: 'smooth' };
  },
});

router.afterEach((to) => {
  if (to.name === 'article') return; // ArticleView owns its own meta once the article loads
  setPageMeta({ title: to.meta.title, description: to.meta.description, path: to.path });
});

export default router;
