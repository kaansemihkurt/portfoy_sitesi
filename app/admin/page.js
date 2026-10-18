import Link from 'next/link';
import { sql } from '@/lib/db';
import { oturumGerekli } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function AdminAnaSayfa() {
  await oturumGerekli();

  const [{ okunmamis }] = await sql`SELECT COUNT(*)::int AS okunmamis FROM iletisim_mesajlari WHERE okundu = false`;
  const [{ sss_sayisi }] = await sql`SELECT COUNT(*)::int AS sss_sayisi FROM sss`;
  const [{ hatali }] = await sql`
    SELECT COUNT(*)::int AS hatali FROM giris_denemeleri
    WHERE basarili = false AND zaman > now() - interval '24 hours'`;

  return (
    <>
      <h1>Hoş geldin</h1>
      <p className="alt">Sitenin içeriğini ve gelen mesajları buradan yönetebilirsin.</p>
      <div className="kutular">
        <div className="card kutu">
          <b>{okunmamis}</b>
          <span>okunmamış mesaj</span><br />
          <Link href="/admin/mesajlar">Mesajlara git →</Link>
        </div>
        <div className="card kutu">
          <b>{sss_sayisi}</b>
          <span>SSS kaydı</span><br />
          <Link href="/admin/sss">SSS&apos;yi yönet →</Link>
        </div>
        <div className="card kutu">
          <b>{hatali}</b>
          <span>hatalı giriş (son 24 saat)</span><br />
          <Link href="/admin/guvenlik">Güvenlik kaydı →</Link>
        </div>
      </div>
    </>
  );
}
