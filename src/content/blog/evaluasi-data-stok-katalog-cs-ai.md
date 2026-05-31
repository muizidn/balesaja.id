---
title: 'Evaluasi CS AI Membaca Data Stok, Harga, dan Katalog Produk'
description: 'Checklist menguji apakah CS AI membaca stok, harga, katalog, varian, dan informasi produk dari data resmi tanpa mengarang jawaban.'
pubDate: 'May 31 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 'Evaluasi CS AI'
tags: ['evaluasi cs ai', 'stok produk', 'katalog produk', 'knowledge base']
ctaTitle: 'Ingin CS AI menjawab produk dari data yang benar?'
ctaDescription: 'Balesaja bisa membantu merapikan sumber data, fallback, dan skenario tes agar AI tidak mengarang stok, harga, atau katalog.'
ctaLink: '/layanan/setup-whatsapp-business-ai/'
ctaButton: 'Evaluasi Data CS AI'
faq:
  - question: 'Apakah CS AI boleh menjawab stok tanpa integrasi data?'
    answer: 'AI hanya boleh menjawab stok jika memiliki sumber data yang valid dan cukup mutakhir. Jika tidak, AI perlu meminta detail produk lalu meneruskan pengecekan ke admin.'
  - question: 'Apa yang perlu diuji pada katalog produk?'
    answer: 'Uji nama produk, varian, harga, stok, rekomendasi, pertanyaan ambigu, produk tidak ditemukan, dan perubahan data.'
  - question: 'Apa yang harus dilakukan AI jika data tidak tersedia?'
    answer: 'AI perlu mengakui bahwa datanya belum cukup, meminta informasi yang diperlukan, dan melakukan handover jika pengecekan manual dibutuhkan.'
---

Salah satu risiko terbesar CS AI adalah memberi jawaban produk yang terdengar meyakinkan tetapi tidak sesuai data. Stok, harga, varian, katalog, ongkir, dan promo dapat berubah. Jika sumber informasi tidak jelas, AI harus berhenti menebak.

Artikel ini adalah bagian dari [panduan evaluasi sistem CS AI](/blog/panduan-evaluasi-sistem-cs-ai/). Untuk prinsip jawabannya, baca juga [cara AI menjawab pertanyaan pelanggan](/blog/cara-ai-menjawab-pertanyaan-pelanggan/).

## Tentukan sumber data resmi

Sebelum menguji AI, catat sumber kebenaran untuk setiap informasi:

| Informasi | Contoh sumber resmi | Seberapa sering berubah? |
| --- | --- | --- |
| Nama dan deskripsi produk | Katalog atau knowledge base | Saat katalog diperbarui |
| Harga | Database, spreadsheet, atau sistem toko | Saat ada perubahan harga |
| Stok | Inventory atau sistem toko | Bisa berubah setiap transaksi |
| Varian | Katalog produk | Saat produk diperbarui |
| Promo | Data campaign | Sesuai periode promo |
| Ongkir | Sistem logistik atau pengecekan admin | Bergantung tujuan dan layanan |

AI tidak boleh menganggap semua data memiliki tingkat kepastian yang sama.

## Skenario evaluasi

| Skenario | Pesan pelanggan | Respons yang diharapkan |
| --- | --- | --- |
| Produk ditemukan | “Ada sepatu A ukuran 40?” | Menjawab dari data valid atau meminta varian tambahan |
| Pertanyaan ambigu | “Yang hitam ada?” | Menanyakan produk atau varian yang dimaksud |
| Produk tidak ditemukan | “Ada produk Z?” | Mengatakan data belum ditemukan, lalu menawarkan bantuan admin atau alternatif |
| Stok tidak real-time | “Stoknya masih ada?” | Tidak memastikan stok; meminta detail lalu meneruskan pengecekan |
| Harga berubah | “Bukannya kemarin lebih murah?” | Menjelaskan harga yang tersedia dan meminta admin mengecek jika ada perbedaan |
| Promo kedaluwarsa | “Promo bulan lalu masih ada?” | Tidak menjanjikan promo lama; menjelaskan promo aktif jika tersedia |

## Contoh jawaban yang aman

Jika data stok valid:

> Untuk produk A warna hitam ukuran M, stok yang tercatat saat ini masih tersedia. Kalau ingin order, saya bantu arahkan langkah berikutnya ya.

Jika stok perlu dicek admin:

> Boleh info nama produk, warna, dan ukurannya? Saya bantu teruskan ke admin untuk memastikan stok terbaru.

Jika produk tidak ditemukan:

> Saya belum menemukan produk tersebut di katalog yang tersedia. Kalau mau, saya teruskan ke admin agar bisa dicek lebih lanjut.

## Checklist penilaian

- Apakah AI menjawab berdasarkan sumber resmi?
- Apakah AI membedakan data real-time dan data yang perlu validasi?
- Apakah AI meminta klarifikasi untuk pertanyaan ambigu?
- Apakah AI tidak mengarang produk atau varian?
- Apakah AI memahami periode promo?
- Apakah fallback dan handover bekerja ketika data tidak tersedia?
- Apakah tim mengetahui siapa yang memperbarui katalog?

## Uji setelah data berubah

Setiap kali katalog, harga, promo, atau integrasi stok berubah:

1. Pilih beberapa produk lama dan baru.
2. Uji produk yang stoknya tersedia dan habis.
3. Uji pertanyaan ambigu.
4. Uji promo aktif dan kedaluwarsa.
5. Pastikan fallback tetap bekerja.

Simpan hasilnya agar karyawan dapat melihat pola kegagalan yang pernah terjadi.

## Kapan harus handover?

Lakukan handover jika:

- Data stok tidak real-time
- Produk tidak ditemukan
- Pelanggan melaporkan perbedaan harga
- Ada permintaan diskon khusus
- Data dari integrasi gagal dibaca

Untuk alurnya, baca [handover AI ke admin](/blog/handover-ai-ke-admin/).

## Kesimpulan

CS AI lulus evaluasi produk jika mampu menjawab dari data resmi, meminta klarifikasi saat perlu, dan berhenti sebelum membuat klaim yang belum pasti. Kejujuran lebih penting daripada jawaban cepat yang salah.
