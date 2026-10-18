import { sql } from '@/lib/db';
import SssListesi from '@/components/SssListesi';

// Her istekte veritabanından taze veri: panelden eklenen kayıt yenileyince görünür.
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Sık Sorulan Sorular | Kaan Semih Kurt',
  description: 'Kaan Semih Kurt hakkında sık sorulan sorular ve cevapları.',
};

export default async function SssSayfasi() {
  // Yalnızca yayinda = true olan kayıtlar, kategori adıyla birlikte (LEFT JOIN: kategorisiz sorular da gelir)
  const sorular = await sql`
    SELECT s.id, s.soru, s.cevap, k.ad AS kategori, k.id AS kategori_id
    FROM sss s
    LEFT JOIN sss_kategorileri k ON k.id = s.kategori_id
    WHERE s.yayinda = true
    ORDER BY k.id ASC NULLS LAST, s.sira ASC NULLS LAST, s.id ASC`;

  // Kategorilere göre grupla (kategorisi olmayanlar "Diğer" altında)
  const gruplar = [];
  for (const s of sorular) {
    const anahtar = s.kategori_id ?? 'diger';
    let g = gruplar.find((x) => x.anahtar === anahtar);
    if (!g) {
      g = { anahtar, ad: s.kategori, sorular: [] };
      gruplar.push(g);
    }
    g.sorular.push(s);
  }

  return (
    <main id="main" className="wrap">
      <div className="page-head rv">
        <p className="eyebrow">02 / 04</p>
        <h1 data-i="faq.title">Sık sorulan sorular</h1>
        <p data-i="faq.lead">Bana en çok sorulanlar ve cevapları.</p>
        <p className="dil-notu" data-i="faq.lang"></p>
      </div>

      {gruplar.length === 0 && <p className="note" data-i="faq.empty">Henüz yayında bir soru yok.</p>}

      {gruplar.map((g) => (
        <section className="sss-grup rv" key={g.anahtar}>
          {g.ad ? <h2>{g.ad}</h2> : <h2 data-i="faq.other">Diğer</h2>}
          <SssListesi sorular={g.sorular} />
        </section>
      ))}
    </main>
  );
}
