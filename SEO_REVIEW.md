# SEO Review Teknis Balesaja

Dokumen ini berisi audit teknis SEO untuk project Astro Balesaja dan daftar pekerjaan yang sebaiknya dibuat agar performa organik meningkat.

## Ringkasan Prioritas

Prioritas tertinggi:

1. Ganti `site` di `astro.config.mjs` dari `https://example.com` ke domain produksi Balesaja.
2. Tambahkan `robots.txt`.
3. Tambahkan structured data `Organization`, `WebSite`, `BreadcrumbList`, dan `Article`.
4. Buat metadata blog yang lebih lengkap: canonical, OG image per artikel, `updatedDate`, dan author.
5. Buat internal linking yang lebih terstruktur dari halaman utama ke pillar blog dan dari artikel ke CTA Balesaja.

Prioritas berikutnya:

1. Buat halaman layanan khusus untuk `setup WhatsApp Business AI`, `bot WA`, `broadcast WhatsApp`, dan `white-label`.
2. Tambahkan FAQ schema pada artikel yang cocok.
3. Buat sitemap dan RSS tetap bersih setelah domain final.
4. Optimalkan performance, heading hierarchy, dan image alt.
5. Siapkan tracking Search Console, Analytics, dan event CTA.

## Temuan Teknis Saat Ini

### 1. Domain canonical masih salah

File: `astro.config.mjs`

Saat ini:

```js
site: 'https://example.com',
```

Ini harus diganti ke domain produksi, misalnya:

```js
site: 'https://balesaja.id',
```

Dampak jika tidak diganti:

- Canonical URL akan salah.
- Sitemap akan mengarah ke domain contoh.
- OG URL dan RSS bisa salah.
- Google bisa bingung membaca versi final halaman.

Prioritas: sangat tinggi.

## 2. Robots.txt belum ada

File yang perlu dibuat:

```txt
public/robots.txt
```

Isi awal yang disarankan:

```txt
User-agent: *
Allow: /

Sitemap: https://balesaja.id/sitemap-index.xml
```

Sesuaikan domain dengan domain produksi final.

Prioritas: sangat tinggi.

## 3. Sitemap sudah ada, tetapi bergantung pada domain final

Project sudah memakai `@astrojs/sitemap` di `astro.config.mjs`. Ini bagus.

Yang perlu dipastikan:

- `site` harus domain final.
- Sitemap bisa diakses di `/sitemap-index.xml`.
- Sitemap dikirim ke Google Search Console.

Prioritas: tinggi.

## 4. BaseHead sudah ada, tetapi perlu diperkuat

File: `src/components/BaseHead.astro`

Yang sudah ada:

- `<title>`
- meta description
- canonical
- Open Graph basic
- Twitter card
- favicon
- RSS alternate

Yang perlu ditambahkan:

- `robots` meta default:

```html
<meta name="robots" content="index,follow" />
```

- optional `theme-color`
- optional `og:site_name`
- optional `twitter:site`
- support `noindex` untuk halaman tertentu jika nanti ada halaman staging/thank-you/internal.

Prioritas: medium.

## 5. Structured Data belum ada

Structured data membantu Google memahami tipe halaman. Untuk Balesaja, minimal perlu:

- `Organization`
- `WebSite`
- `Article` untuk blog post
- `BreadcrumbList`
- `FAQPage` pada artikel tertentu
- `Service` untuk halaman layanan

### Organization Schema

Tambahkan di layout global atau `BaseHead`:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Balesaja",
  "url": "https://balesaja.id",
  "description": "Setup WhatsApp Business dengan AI customer service, bot WA, broadcast WhatsApp, dan white-label untuk bisnis dan agensi."
}
```

### Article Schema

Tambahkan di `src/layouts/BlogPost.astro` untuk setiap artikel:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "datePublished": "...",
  "dateModified": "...",
  "author": {
    "@type": "Organization",
    "name": "Balesaja"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Balesaja"
  }
}
```

Prioritas: tinggi.

## 6. Blog frontmatter perlu diperluas

File: `src/content.config.ts`

Saat ini blog punya:

- `title`
- `description`
- `pubDate`
- `updatedDate`
- `heroImage`

Tambahan yang disarankan:

- `author`
- `tags`
- `category`
- `canonical`
- `ogImage`
- `featured`
- `noindex`

Contoh schema:

```ts
z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.optional(image()),
  author: z.string().default('Balesaja'),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  canonical: z.string().url().optional(),
  noindex: z.boolean().default(false),
})
```

Manfaat:

- Artikel lebih mudah dikelompokkan.
- Internal linking bisa lebih otomatis.
- Metadata lebih lengkap.
- Bisa membuat related posts berdasarkan tag.

Prioritas: medium.

## 7. Perlu halaman layanan, bukan hanya artikel blog

Artikel blog bagus untuk traffic informasional, tetapi keyword komersial sebaiknya punya landing page layanan.

Halaman yang disarankan:

1. `/layanan/setup-whatsapp-business-ai/`
2. `/layanan/bot-wa/`
3. `/layanan/broadcast-whatsapp/`
4. `/layanan/whatsapp-business-api/`
5. `/layanan/white-label-ai-customer-service/`

Kenapa penting:

- Artikel menjawab pertanyaan.
- Halaman layanan mengubah visitor menjadi lead.
- Internal link dari artikel bisa diarahkan ke halaman layanan yang relevan.

Contoh mapping:

- Artikel `cara membuat bot WA` link ke `/layanan/bot-wa/`
- Artikel `broadcast WhatsApp dan WA blast` link ke `/layanan/broadcast-whatsapp/`
- Artikel `WhatsApp Business API Indonesia` link ke `/layanan/whatsapp-business-api/`
- Artikel `AI untuk customer service awal` link ke `/layanan/setup-whatsapp-business-ai/`
- Artikel white-label link ke `/layanan/white-label-ai-customer-service/`

Prioritas: sangat tinggi untuk konversi.

## 8. Internal linking perlu dibuat lebih sistematis

Saat ini artikel sudah saling link, tetapi perlu struktur yang jelas:

- Pillar page: `chatbot-whatsapp-untuk-bisnis`
- Supporting articles: bot WA, cara membuat bot WA, broadcast, API, WhatsApp Business Web, CRM/helpdesk, metrik
- Money pages: halaman layanan Balesaja

Struktur ideal:

```txt
Homepage
  -> Halaman layanan utama
  -> Pillar blog

Pillar blog
  -> Semua supporting articles
  -> Halaman layanan utama

Supporting article
  -> Pillar blog
  -> 1-2 supporting articles terkait
  -> 1 halaman layanan yang paling relevan
```

Prioritas: tinggi.

## 9. Blog index perlu ditingkatkan

File: `src/pages/blog/index.astro`

Saat ini blog index hanya daftar artikel. Untuk SEO dan UX, sebaiknya ditambah:

- Intro singkat tentang topik blog Balesaja.
- Kategori/topik: Bot WA, AI Customer Service, Broadcast WhatsApp, WhatsApp Business API.
- Featured article untuk pillar page.
- Related cluster section.

Prioritas: medium.

## 10. Heading hierarchy perlu dijaga

Pastikan setiap halaman:

- Hanya punya satu `h1`.
- Section utama memakai `h2`.
- Subsection memakai `h3`.
- Jangan melompati struktur heading tanpa alasan.

Di artikel Markdown saat ini sudah relatif aman karena title dari layout menjadi `h1`, dan isi artikel memakai `h2`.

Prioritas: medium.

## 11. Image SEO belum optimal

Saat ini artikel memakai placeholder image dari assets. Untuk SEO dan social sharing, sebaiknya:

- Buat OG image khusus Balesaja.
- Buat image per cluster atau minimal per kategori.
- Pastikan alt text deskriptif jika gambar ditampilkan di halaman.
- Kompres gambar.
- Gunakan dimensi konsisten, misalnya 1200x630 untuk OG.

Prioritas: medium.

## 12. RSS sudah ada, tetapi perlu dicek setelah domain final

File: `src/pages/rss.xml.js`

RSS sudah dibuat dengan `@astrojs/rss`.

Yang perlu ditingkatkan:

- Sort artikel dari terbaru ke terlama.
- Pastikan `site` benar.
- Tambahkan description yang kuat.

Contoh sort:

```js
const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
);
```

Prioritas: low-medium.

## 13. Canonical untuk artikel sudah ada, tetapi belum support override

Saat ini canonical dibuat dari:

```ts
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
```

Ini bagus untuk halaman normal, tetapi belum mendukung canonical custom jika nanti ada artikel migrasi atau konten yang mirip.

Rekomendasi:

- Tambahkan prop `canonical`.
- Jika ada canonical di frontmatter, pakai itu.
- Jika tidak ada, pakai default current URL.

Prioritas: low-medium.

## 14. Perlu FAQ schema untuk artikel tertentu

Artikel yang cocok diberi FAQ:

- `bot-whatsapp-bot-wa`
- `cara-membuat-bot-wa`
- `broadcast-whatsapp-wa-blast`
- `whatsapp-business-api-indonesia`
- `bot-whatsapp-gratis`

Contoh FAQ:

- Apa itu bot WA?
- Apakah bot WhatsApp bisa gratis?
- Apa bedanya bot WhatsApp dan WhatsApp Business API?
- Apakah WA blast aman?
- Kapan bisnis perlu AI customer service?

Prioritas: medium-high.

## 15. Perlu CTA yang konsisten

Setiap artikel sebaiknya punya CTA yang jelas dan relevan:

- Artikel bot WA: konsultasi pembuatan bot WA.
- Artikel broadcast: konsultasi broadcast WhatsApp.
- Artikel API: konsultasi setup WhatsApp Business API.
- Artikel AI CS: konsultasi AI customer service.
- Artikel white-label: konsultasi kemitraan white-label.

CTA bisa dibuat sebagai komponen reusable:

```txt
src/components/BlogCTA.astro
```

Isi CTA:

- Judul singkat.
- Kalimat manfaat.
- Tombol menuju WhatsApp/contact.
- Link ke halaman layanan terkait.

Prioritas: tinggi.

## 16. Perlu halaman kontak atau lead capture

Jika CTA mengarah ke `mailto:` atau link tidak jelas, konversi bisa rendah.

Minimal buat:

- `/kontak/`
- tombol WhatsApp
- form singkat
- tracking event CTA

Prioritas: tinggi.

## 17. Performance dan Core Web Vitals

Hal yang perlu dicek setelah UI final:

- LCP homepage dan artikel.
- Ukuran CSS.
- Font loading.
- Image optimization.
- Layout shift dari image tanpa width/height.
- Tidak memakai script client-side yang tidak perlu.

Astro sudah bagus untuk performance, tetapi image dan font tetap perlu dijaga.

Prioritas: medium.

## 18. Search Console dan Analytics

Setelah deploy:

1. Daftarkan domain ke Google Search Console.
2. Submit sitemap.
3. Pasang analytics.
4. Track CTA click:
   - klik WhatsApp
   - klik form konsultasi
   - klik halaman layanan
   - klik white-label inquiry

Prioritas: sangat tinggi setelah domain live.

## Backlog Implementasi

### Sprint 1: Fondasi Teknis

- [ ] Ganti `site` di `astro.config.mjs` ke domain final.
- [ ] Buat `public/robots.txt`.
- [ ] Tambahkan `Organization` dan `WebSite` schema.
- [ ] Tambahkan `Article` schema di blog layout.
- [ ] Sort RSS dari artikel terbaru.
- [ ] Tambahkan `robots` meta default.

### Sprint 2: Konversi dan Internal Linking

- [ ] Buat halaman layanan `setup WhatsApp Business AI`.
- [ ] Buat halaman layanan `bot WA`.
- [ ] Buat halaman layanan `broadcast WhatsApp`.
- [ ] Buat halaman layanan `WhatsApp Business API`.
- [ ] Buat halaman layanan `white-label AI customer service`.
- [ ] Buat komponen `BlogCTA.astro`.
- [ ] Tambahkan CTA relevan di semua artikel.

### Sprint 3: Blog UX dan Schema Lanjutan

- [ ] Upgrade blog index dengan kategori dan featured article.
- [ ] Tambahkan tag/category di frontmatter.
- [ ] Tambahkan related posts.
- [ ] Tambahkan FAQ section di artikel utama.
- [ ] Tambahkan FAQ schema.
- [ ] Buat OG image Balesaja.

### Sprint 4: Measurement

- [ ] Setup Google Search Console.
- [ ] Submit sitemap.
- [ ] Setup analytics.
- [ ] Track CTA click.
- [ ] Review query dan halaman tiap 2-4 minggu.

## Catatan Konten

Artikel blog harus tetap visitor-first. Hindari kalimat seperti:

- “Artikel ini menargetkan keyword...”
- “Keyword ini memiliki volume...”
- “Artikel ini dibuat untuk cluster...”

Gunakan pendekatan:

- Masalah yang dialami visitor.
- Penjelasan sederhana.
- Kapan solusi dibutuhkan.
- Risiko yang perlu dihindari.
- Bagaimana Balesaja bisa membantu.

Dengan begitu artikel tetap membantu pembaca, tetapi tetap mendukung SEO dan konversi.
