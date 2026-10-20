import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const output = resolve('dist/agn-landing/browser');
const template = await readFile(resolve(output, 'index.html'), 'utf8');
const articles = JSON.parse(await readFile('src/app/components/articles/articles.json', 'utf8'));
const origin = new URL(template.match(/<link rel="canonical" href="([^"]+)"/)?.[1]).origin;
const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);
const seen = new Set();
const formatText = text => escapeHtml(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
await mkdir(resolve(output, 'articulos'), { recursive: true });

for (const article of articles) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug) || seen.has(article.slug)) {
    throw new Error(`Dirección de artículo inválida o duplicada: ${article.slug}`);
  }
  seen.add(article.slug);
  const title = escapeHtml(`${article.title} | AGNIndustrial`);
  const description = escapeHtml(article.description);
  const url = `${origin}/articulos/${article.slug}`;
  let html = template.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  const tags = [
    ['name', 'description', description],
    ['name', 'robots', article.paragraphs.length ? 'index, follow' : 'noindex, follow'],
    ['property', 'og:type', 'article'],
    ['property', 'og:url', url],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description]
  ];
  for (const [attribute, name, value] of tags) {
    const pattern = new RegExp(`<meta ${attribute}="${name}" content="[^"]*"[^>]*>`);
    if (!pattern.test(html)) throw new Error(`Falta la etiqueta ${name} en index.html`);
    html = html.replace(pattern, () => `<meta ${attribute}="${name}" content="${value}">`);
  }
  html = html.replace(/<link rel="canonical" href="[^"]*"[^>]*>/, `<link rel="canonical" href="${url}">`);
  // Visible fallback for readers and crawlers without JavaScript. Angular replaces
  // this content with the complete landing page and opens the selected card.
  const paragraphs = article.paragraphs.length
    ? article.paragraphs.map((paragraph, index) => `<p>${formatText(paragraph)}</p>${index === 0 && article.points?.length ? `<ol type="A">${article.points.map(point => `<li>${formatText(point)}</li>`).join('')}</ol>` : ''}`).join('\n')
    : '<p>Estamos preparando el contenido de este artículo.</p>';
  const fallback = `<main class="container"><article><p><strong>AGNIndustrial</strong> · Artículos</p><h1>${escapeHtml(article.title)}</h1>${paragraphs}<p><a href="/#articulos">Ver todos los artículos</a></p></article></main>`;
  html = html.replace(/<app-root><\/app-root>/, () => `<app-root>${fallback}</app-root>`);
  await writeFile(resolve(output, 'articulos', `${article.slug}.html`), html);
}

const urls = [`${origin}/`, ...articles.filter(article => article.paragraphs.length).map(article => `${origin}/articulos/${article.slug}`)];
await writeFile(resolve(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${escapeHtml(url)}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Generadas ${articles.length} direcciones de artículos con metadatos para compartir.`);
