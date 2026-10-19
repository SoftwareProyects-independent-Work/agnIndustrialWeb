import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const articles = JSON.parse(await readFile('src/app/components/articles/articles.json', 'utf8'));
const output = 'dist/agn-landing/browser';
const home = await readFile(`${output}/index.html`, 'utf8');
const origin = new URL(home.match(/<link rel="canonical" href="([^"]+)"/)[1]).origin;
const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

test('Cada dirección sirve título, resumen y contenido sin ejecutar JavaScript', async () => {
  for (const article of articles) {
    const html = await readFile(`${output}/articulos/${article.slug}.html`, 'utf8');
    const url = `${origin}/articulos/${article.slug}`;
    assert.ok(html.includes(`<title>${escapeHtml(article.title)} | AGN Industrial</title>`));
    assert.ok(html.includes(`<meta property="og:description" content="${escapeHtml(article.description)}">`));
    assert.ok(html.includes(`<meta property="og:url" content="${url}">`));
    assert.ok(html.includes(`<link rel="canonical" href="${url}">`));
    assert.ok(html.includes('<base href="/">'));
    for (const paragraph of article.paragraphs) assert.ok(html.includes(`<p>${escapeHtml(paragraph)}</p>`));
    for (const point of article.points ?? []) assert.ok(html.includes(`<li>${escapeHtml(point)}</li>`));
    if (!article.paragraphs.length) assert.ok(html.includes('content="noindex, follow"'));
  }
  assert.ok(home.includes('<meta property="og:type" content="website">'));
  assert.ok(home.includes('<app-root></app-root>'));
});

test('El sitemap incluye los artículos con texto y excluye los pendientes', async () => {
  const sitemap = await readFile(`${output}/sitemap.xml`, 'utf8');
  for (const article of articles) {
    assert.equal(sitemap.includes(`/articulos/${article.slug}</loc>`), article.paragraphs.length > 0);
  }
});
