// Exports a CV from public/cv/ to PDF with Puppeteer's bundled headless Chrome.
//
//   npm run export-cv-to-pdf                -> public/cv/template.pdf.html         -> public/cv/template.pdf
//   npm run export-cv-to-pdf -- headof      -> public/cv/template-headof.pdf.html  -> public/cv/template-headof.pdf
//   npm run export-cv-to-pdf -- template-headof   (same as above; a full file name works too)
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cvDir = join(__dirname, '../public/cv');
const SUFFIX = '.pdf.html';

function fail(message) {
  console.error(`export-cv-to-pdf: ${message}`);
  process.exit(1);
}

function resolveCvName(arg = 'template') {
  const name = arg.replace(/\.pdf\.html$/, '').replace(/\.html$/, '');
  const candidates = [name, `template-${name}`];
  const found = candidates.find((candidate) => existsSync(join(cvDir, `${candidate}${SUFFIX}`)));
  if (!found) {
    const available = readdirSync(cvDir)
      .filter((file) => file.endsWith(SUFFIX))
      .map((file) => file.slice(0, -SUFFIX.length));
    fail(`no CV named "${arg}" in public/cv/. Available: ${available.join(', ')}`);
  }
  return found;
}

const name = resolveCvName(process.argv[2]);
const input = join(cvDir, `${name}${SUFFIX}`);
const output = join(cvDir, `${name}.pdf`);

const browser = await puppeteer.launch();
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(input).href, { waitUntil: 'networkidle0' });
  // The self-hosted EB Garamond must be loaded, or the PDF falls back to Georgia.
  await page.evaluate(() => document.fonts.ready);
  // Page size and margins come from the CV's own @page rule (A4, no margin).
  const pdf = await page.pdf({ path: output, preferCSSPageSize: true, printBackground: true });

  // The CV is designed for exactly one A4 page: warn when content spills over.
  const pages = Math.max(
    0,
    ...[...Buffer.from(pdf).toString('latin1').matchAll(/\/Count (\d+)/g)].map((match) => Number(match[1])),
  );
  console.log(`export-cv-to-pdf: ${name}${SUFFIX} -> public/cv/${name}.pdf (${pages} page${pages === 1 ? '' : 's'})`);
  if (pages > 1) console.warn('export-cv-to-pdf: warning, the CV no longer fits on one page; trim some content.');
} finally {
  await browser.close();
}
