import { createApp } from 'vue';

// Self-hosted EB Garamond — regular/medium/semibold/bold, roman + italic.
// Self-hosting keeps the "quiet" brief honest: no third-party font request on load.
import '@fontsource/eb-garamond/400.css';
import '@fontsource/eb-garamond/400-italic.css';
import '@fontsource/eb-garamond/500.css';
import '@fontsource/eb-garamond/600.css';
import '@fontsource/eb-garamond/600-italic.css';
import '@fontsource/eb-garamond/700.css';

import './assets/scss/main.scss';

import App from './App.vue';
import router from './router';
import { reveal } from './directives/reveal';

const app = createApp(App);
app.use(router);
app.directive('reveal', reveal);
app.mount('#app');
