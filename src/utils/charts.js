// Mounts Chart.js charts into the `.md-chart` placeholders rendered from ```chart
// fences (see articles.js). Chart.js is imported lazily, so articles without
// charts never download it.
// Series colors, in order. Fixed rather than read from the theme; text, grid
// and borders still follow the theme below.
const SERIES_COLORS = ['#f8c965', '#c85467', '#8154c4', '#f5a9b8', '#5bcefa'];

function readPalette() {
  const style = getComputedStyle(document.documentElement);
  const read = (name) => style.getPropertyValue(name).trim();
  return {
    series: SERIES_COLORS,
    text: read('--paper-muted'),
    grid: read('--ink-line'),
    background: read('--ink'),
    font: getComputedStyle(document.body).fontFamily,
  };
}

function toChartConfig({ type = 'bar', labels = [], series = [] }, palette) {
  const isPie = type === 'pie' || type === 'doughnut';
  const color = (i) => palette.series[i % palette.series.length];

  const datasets = series.map((s, i) => ({
    label: s.name,
    data: s.data,
    ...(isPie
      ? { backgroundColor: s.data.map((_, j) => color(j)), borderColor: palette.background, borderWidth: 2 }
      : { backgroundColor: color(i), borderColor: color(i), borderWidth: 2, tension: 0.3, pointRadius: 3 }),
  }));

  const axis = { ticks: { color: palette.text }, grid: { color: palette.grid } };

  return {
    type,
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: isPie || series.length > 1, labels: { color: palette.text } },
      },
      ...(isPie ? {} : { scales: { x: axis, y: { ...axis, beginAtZero: true } } }),
    },
  };
}

// Returns a cleanup function that destroys every chart it created.
export async function mountCharts(root) {
  const placeholders = root?.querySelectorAll('.md-chart[data-chart]') ?? [];
  if (!placeholders.length) return () => {};

  const { default: Chart } = await import('chart.js/auto');
  const palette = readPalette();
  Chart.defaults.font.family = palette.font;
  const charts = [];

  for (const figure of placeholders) {
    const container = figure.querySelector('.md-chart__canvas');
    if (!container || container.querySelector('canvas')) continue;
    const canvas = document.createElement('canvas');
    const title = figure.querySelector('figcaption')?.textContent;
    canvas.setAttribute('role', 'img');
    if (title) canvas.setAttribute('aria-label', title);
    container.appendChild(canvas);
    charts.push(new Chart(canvas, toChartConfig(JSON.parse(figure.dataset.chart), palette)));
  }

  return () => charts.forEach((chart) => chart.destroy());
}
