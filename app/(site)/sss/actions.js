'use server';

import { sql } from '@/lib/db';

// Ziyaretçi bir soruyu açtığında tıklanma sayısını 1 artırır.
export async function sssTiklandi(id) {
  const n = Number(id);
  if (!Number.isInteger(n) || n <= 0) return;
  await sql`UPDATE sss SET tiklanma = tiklanma + 1 WHERE id = ${n} AND yayinda = true`;
}
