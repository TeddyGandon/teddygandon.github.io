// v-reveal: fades/lifts an element in once it scrolls into view. Pairs with the
// `.reveal` / `.reveal.is-visible` CSS in main.scss. Kept as a directive rather
// than a wrapper component so it can be dropped on any element without adding
// markup, matching the "quiet" spirit of the design (no orchestration confetti,
// just a single gentle transition per section).
const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      )
    : null;

export const reveal = {
  mounted(el) {
    el.classList.add('reveal');
    if (observer) {
      observer.observe(el);
    } else {
      // No IntersectionObserver support — show content immediately rather than hide it forever.
      el.classList.add('is-visible');
    }
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
