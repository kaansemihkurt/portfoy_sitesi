'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@/lib/db';

const SINIR = { ad_soyad: 100, eposta: 254, mesaj: 1000 };
const EPOSTA_DESENI = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// İletişim formu: alanlar SUNUCU tarafında da kontrol edilir (tarayıcıdaki kontroller atlatılabilir).
export async function mesajGonder(onceki, formData) {
  // Bot tuzağı: gizli alan doluysa sessizce başarılı say, kaydetme.
  if (String(formData.get('_gotcha') ?? '') !== '') return { durum: 'ok' };

  const ad_soyad = String(formData.get('ad_soyad') ?? '').trim();
  const eposta = String(formData.get('eposta') ?? '').trim();
  const mesaj = String(formData.get('mesaj') ?? '').trim();
  const kvkk_onay = formData.get('kvkk_onay') === 'on';

  if (!ad_soyad || !eposta || !mesaj) return { durum: 'hata', kod: 'f.err.bos' };
  if (ad_soyad.length > SINIR.ad_soyad || eposta.length > SINIR.eposta || mesaj.length > SINIR.mesaj) {
    return { durum: 'hata', kod: 'f.err.uzun' };
  }
  if (!EPOSTA_DESENI.test(eposta)) return { durum: 'hata', kod: 'f.err.eposta' };
  if (!kvkk_onay) return { durum: 'hata', kod: 'f.err.kvkk' };

  try {
    await sql`
      INSERT INTO iletisim_mesajlari (ad_soyad, eposta, mesaj, kvkk_onay)
      VALUES (${ad_soyad}, ${eposta}, ${mesaj}, ${kvkk_onay})`;
  } catch (e) {
    console.error('Mesaj kaydedilemedi:', e);
    return { durum: 'hata', kod: 'f.err' };
  }

  revalidatePath('/admin');
  revalidatePath('/admin/mesajlar');
  return { durum: 'ok', zaman: Date.now() };
}
