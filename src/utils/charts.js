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
    strong: read('--paper'),
    grid: read('--ink-line'),
    background: read('--ink'),
    font: getComputedStyle(document.body).fontFamily,
  };
}

function withAlpha(hex, alpha) {
  const value = parseInt(hex.slice(1), 16);
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
}

// Vertical wash under a line: the series color fading to transparent at the
// bottom of the plot. Scriptable, since the gradient needs the chart's size.
// Lighter when several lines share the chart, so overlapping washes don't mix
// into a muddy color.
function areaGradient(color, alpha) {
  return ({ chart }) => {
    const { ctx, chartArea } = chart;
    if (!chartArea) return withAlpha(color, alpha / 2);
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, withAlpha(color, alpha));
    gradient.addColorStop(1, withAlpha(color, 0));
    return gradient;
  };
}

function barDataset(color) {
  return {
    backgroundColor: color,
    hoverBackgroundColor: withAlpha(color, 0.85),
    borderWidth: 0,
    // Rounded at the data end only: the skipped edge (the baseline) stays square.
    borderRadius: 6,
    borderSkipped: 'start',
    maxBarThickness: 28,
    categoryPercentage: 0.7,
    barPercentage: 0.8,
  };
}

function lineDataset(color, palette, seriesCount) {
  return {
    borderColor: color,
    backgroundColor: areaGradient(color, seriesCount > 1 ? 0.08 : 0.22),
    fill: 'origin',
    borderWidth: 2.5,
    borderCapStyle: 'round',
    borderJoinStyle: 'round',
    // Smooth curve that never overshoots the data, unlike a plain tension.
    cubicInterpolationMode: 'monotone',
    pointRadius: 4,
    pointHoverRadius: 6,
    pointBackgroundColor: color,
    pointHoverBackgroundColor: color,
    // A ring in the page color keeps points legible where lines cross.
    pointBorderColor: palette.background,
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
  };
}

function pieDataset(data, palette) {
  return {
    backgroundColor: data.map((_, i) => palette.series[i % palette.series.length]),
    borderWidth: 0,
    spacing: 4,
    borderRadius: 6,
    hoverOffset: 10,
  };
}

function toChartConfig({ type = 'bar', labels = [], series = [] }, palette) {
  const isPie = type === 'pie' || type === 'doughnut';
  const isLine = type === 'line';
  const color = (i) => palette.series[i % palette.series.length];

  const datasets = series.map((s, i) => ({
    label: s.name,
    data: s.data,
    ...(isPie ? pieDataset(s.data, palette) : isLine ? lineDataset(color(i), palette, series.length) : barDataset(color(i))),
  }));

  const ticks = { color: palette.text, padding: 8 };
  const scales = {
    x: { ticks, grid: { display: false }, border: { color: palette.grid } },
    y: {
      beginAtZero: true,
      ticks: { ...ticks, maxTicksLimit: 6 },
      grid: { color: palette.grid, lineWidth: 1 },
      border: { display: false },
    },
  };

  return {
    type,
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      // Room for the hovered pie slice to pop out without being clipped.
      layout: { padding: isPie ? 12 : { top: 8 } },
      ...(type === 'doughnut' ? { cutout: '62%' } : {}),
      // On lines, hovering anywhere in a column shows every series' value.
      interaction: isLine ? { mode: 'index', intersect: false } : { mode: 'nearest', intersect: true },
      animation: { duration: 900, easing: 'easeOutQuart' },
      plugins: {
        legend: {
          display: isPie || series.length > 1,
          position: 'bottom',
          labels: {
            color: palette.text,
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 8,
            boxHeight: 8,
            padding: 18,
          },
        },
        tooltip: {
          backgroundColor: palette.background,
          borderColor: palette.grid,
          borderWidth: 1,
          titleColor: palette.strong,
          bodyColor: palette.text,
          padding: 12,
          cornerRadius: 8,
          boxPadding: 6,
          usePointStyle: true,
          titleFont: { weight: '500' },
        },
      },
      ...(isPie ? {} : { scales }),
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
