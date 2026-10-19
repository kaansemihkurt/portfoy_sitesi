import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sql } from '@/lib/db';
import { oturumGerekli } from '@/lib/auth';
import SssFormu from '@/components/SssFormu';
import { sssGuncelle } from '../actions';

export const dynamic = 'force-dynamic';

const HATA = {
  'soru-bos': 'Soru alanı boş olamaz.',
  uzun: 'Soru en fazla 500, cevap en fazla 3000 karakter olabilir.',
  sayi: 'Sıra ve kategori tam sayı olmalı.',
};

export default async function SssDuzenle({ params, searchParams }) {
  await oturumGerekli();
  const { id } = await params;
  const sp = await searchParams;
  const n = Number(id);
  if (!Number.isInteger(n) || n <= 0) notFound();

  const [kayit] = await sql`SELECT id, soru, cevap, sira, kategori_id, yayinda, soru_en, cevap_en, soru_ja, cevap_ja FROM sss WHERE id = ${n}`;
  if (!kayit) notFound();
  const kategoriler = await sql`SELECT id, ad FROM sss_kategorileri ORDER BY id`;

  return (
    <>
      <p><Link className="geri" href="/admin/sss">← SSS listesine dön</Link></p>
      <h1>Kaydı düzenle <span className="soluk">#{kayit.id}</span></h1>
      {HATA[sp?.hata] && <p className="uyari hata" role="alert">{HATA[sp.hata]}</p>}
      <div style={{ marginTop: 20 }}>
        <SssFormu action={sssGuncelle} kategoriler={kategoriler} kayit={kayit} dugme="Kaydet" />
      </div>
    </>
  );
}
