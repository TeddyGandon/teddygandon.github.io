import { defineAsyncComponent } from 'vue';
import { studies } from '../data/studies';

// Each study is a full Vue view under content/studies, loaded on demand.
// The slug is the view's file name, so the URL follows the file.
const views = import.meta.glob('../content/studies/*.vue');

const allStudies = studies.map((study) => ({
  ...study,
  slug: study.view.replace(/\.vue$/, ''),
  component: defineAsyncComponent(views[`../content/studies/${study.view}`]),
}));

export function getStudies() {
  return allStudies;
}

export function getStudyBySlug(slug) {
  return allStudies.find((study) => study.slug === slug) ?? null;
}
