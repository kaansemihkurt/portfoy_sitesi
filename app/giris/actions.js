'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { OTURUM_CEREZI } from '@/lib/auth';

// Çıkış: oturumu tablodan sil, çerezi temizle.
export async function cikisYap() {
  const cerezler = await cookies();
  const token = cerezler.get(OTURUM_CEREZI)?.value;
  if (token) {
    await sql`DELETE FROM oturumlar WHERE token = ${token}`;
  }
  cerezler.delete(OTURUM_CEREZI);
  redirect('/giris?cikis=1');
}
