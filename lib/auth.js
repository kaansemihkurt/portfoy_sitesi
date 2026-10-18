import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sql } from './db';

export const OTURUM_CEREZI = 'oturum';
export const OTURUM_SURESI_SN = 2 * 60 * 60; // 2 saat

// Çerezdeki token'ı oturumlar tablosunda arar; süresi dolmamışsa yöneticiyi döndürür.
export async function oturumuGetir() {
  const token = (await cookies()).get(OTURUM_CEREZI)?.value;
  if (!token) return null;

  const satirlar = await sql`
    SELECT y.id, y.eposta
    FROM oturumlar o
    JOIN yoneticiler y ON y.id = o.yonetici_id
    WHERE o.token = ${token}
      AND o.bitis > now()`;

  return satirlar[0] ?? null;
}

// /admin altındaki HER sayfa ve HER Server Action bunu çağırır.
// Geçerli oturum yoksa /giris sayfasına yönlendirir.
export async function oturumGerekli() {
  const yonetici = await oturumuGetir();
  if (!yonetici) redirect('/giris');
  return yonetici;
}
