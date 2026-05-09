import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  const siteUrl = 'https://balesaja.id';

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts
    .map((post) => {
      const lastmod = (post.data.updatedDate || post.data.pubDate).toISOString();
      return `
  <url>
    <loc>${siteUrl}/blog/${post.id}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('')}
</urlset>`.trim();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
