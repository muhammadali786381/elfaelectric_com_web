import * as cheerio from 'cheerio';
import * as fs from 'fs';

async function run() {
  const html = fs.readFileSync('newsroom.html', 'utf8');
  const $ = cheerio.load(html);
  const items = [];
  $('.e-loop-item, article').each((i, el) => {
    const title = $(el).find('h1, h2, h3').text().trim();
    const link = $(el).find('h1 a, h2 a, h3 a').attr('href') || $(el).find('a').attr('href');
    let image = $(el).find('img').attr('data-lazy-src') || $(el).find('img').attr('src');
    if (image && image.startsWith('data:image')) {
      image = $(el).find('noscript img').attr('src');
    }
    const date = $(el).find('.elementor-post-date, .elementor-icon-list-text').text().trim();
    const excerpt = $(el).find('.elementor-widget-theme-post-excerpt, p').text().trim();
    if (title && image) {
        items.push({ title, link, image, date, excerpt });
    }
  });
  console.log(JSON.stringify(items, null, 2));
}

run().catch(console.error);
