'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@/lib/db';
import { oturumGerekli } from '@/lib/auth';

function idOku(formData) {
  const id = Number(formData.get('id'));
  return Number.isInteger(id) && id > 0 ? id : null;
}

// "Okundu" işaretleme (UPDATE). Tekrar basınca "okunmadı"ya döner.
export async function mesajOkunduDegistir(formData) {
  await oturumGerekli();
  const id = idOku(formData);
  if (!id) return;
  await sql`UPDATE iletisim_mesajlari SET okundu = NOT okundu WHERE id = ${id}`;
  revalidatePath('/admin');
  revalidatePath('/admin/mesajlar');
}

// Silme (DELETE)
export async function mesajSil(formData) {
  await oturumGerekli();
  const id = idOku(formData);
  if (!id) return;
  await sql`DELETE FROM iletisim_mesajlari WHERE id = ${id}`;
  revalidatePath('/admin');
  revalidatePath('/admin/mesajlar');
}
