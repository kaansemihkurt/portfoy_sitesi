'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { oturumGerekli } from '@/lib/auth';

function sayiVeyaNull(v) {
  const s = String(v ?? '').trim();
  if (s === '') return null;
  const n = Number(s);
  return Number.isInteger(n) ? n : NaN;
}

// Formdan gelen alanları okur ve sunucu tarafında doğrular.
function formuOku(formData) {
  const soru = String(formData.get('soru') ?? '').trim();
  const cevapHam = String(formData.get('cevap') ?? '').trim();
  const sira = sayiVeyaNull(formData.get('sira'));
  const kategori_id = sayiVeyaNull(formData.get('kategori_id'));
  const yayinda = formData.get('yayinda') === 'on';
  // Çeviriler isteğe bağlı: boş bırakılırsa NULL kaydedilir, sitede Türkçesi gösterilir.
  const ceviri = {};
  for (const alan of ['soru_en', 'cevap_en', 'soru_ja', 'cevap_ja']) {
    const v = String(formData.get(alan) ?? '').trim();
    if (v.length > (alan.startsWith('soru') ? 500 : 3000)) return { hata: 'uzun' };
    ceviri[alan] = v === '' ? null : v;
  }

  if (!soru) return { hata: 'soru-bos' };
  if (soru.length > 500 || cevapHam.length > 3000) return { hata: 'uzun' };
  if (Number.isNaN(sira) || Number.isNaN(kategori_id)) return { hata: 'sayi' };

  return { soru, cevap: cevapHam === '' ? null : cevapHam, sira, kategori_id, yayinda, ...ceviri };
}

function idOku(formData) {
  const id = Number(formData.get('id'));
  return Number.isInteger(id) && id > 0 ? id : null;
}

function yenile() {
  revalidatePath('/admin');
  revalidatePath('/admin/sss');
  revalidatePath('/');
  revalidatePath('/sss');
}

// INSERT
export async function sssEkle(formData) {
  await oturumGerekli();
  const v = formuOku(formData);
  if (v.hata) redirect(`/admin/sss?hata=${v.hata}`);

  await sql`
    INSERT INTO sss (soru, cevap, sira, kategori_id, yayinda, soru_en, cevap_en, soru_ja, cevap_ja)
    VALUES (${v.soru}, ${v.cevap}, ${v.sira}, ${v.kategori_id}, ${v.yayinda},
            ${v.soru_en}, ${v.cevap_en}, ${v.soru_ja}, ${v.cevap_ja})`;

  yenile();
  redirect('/admin/sss?ok=eklendi');
}

// UPDATE
export async function sssGuncelle(formData) {
  await oturumGerekli();
  const id = idOku(formData);
  if (!id) redirect('/admin/sss');
  const v = formuOku(formData);
  if (v.hata) redirect(`/admin/sss/${id}?hata=${v.hata}`);

  await sql`
    UPDATE sss
    SET soru = ${v.soru}, cevap = ${v.cevap}, sira = ${v.sira},
        kategori_id = ${v.kategori_id}, yayinda = ${v.yayinda},
        soru_en = ${v.soru_en}, cevap_en = ${v.cevap_en}, soru_ja = ${v.soru_ja}, cevap_ja = ${v.cevap_ja}
    WHERE id = ${id}`;

  yenile();
  redirect('/admin/sss?ok=guncellendi');
}

// "Yayında / yayında değil" düğmesi
export async function sssYayinDegistir(formData) {
  await oturumGerekli();
  const id = idOku(formData);
  if (!id) return;
  await sql`UPDATE sss SET yayinda = NOT yayinda WHERE id = ${id}`;
  yenile();
}

// DELETE
export async function sssSil(formData) {
  await oturumGerekli();
  const id = idOku(formData);
  if (!id) return;
  await sql`DELETE FROM sss WHERE id = ${id}`;
  yenile();
  redirect('/admin/sss?ok=silindi');
}
