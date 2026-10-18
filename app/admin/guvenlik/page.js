import { sql } from '@/lib/db';
import { oturumGerekli } from '@/lib/auth';
import { tarih } from '@/lib/bicim';

export const dynamic = 'force-dynamic';

export default async function AdminGuvenlik() {
  await oturumGerekli();

  // Son 20 giriş denemesi
  const denemeler = await sql`
    SELECT id, eposta, ip, basarili, zaman
    FROM giris_denemeleri
    ORDER BY zaman DESC
    LIMIT 20`;

  // Son 24 saatte en çok hatalı deneme yapılan 3 IP (sorgular.sql'deki Görev 6 sorgusu)
  const ipler = await sql`
    SELECT ip, COUNT(*)::int AS hatali_deneme
    FROM giris_denemeleri
    WHERE basarili = false
      AND zaman > now() - interval '24 hours'
    GROUP BY ip
    ORDER BY hatali_deneme DESC
    LIMIT 3`;

  return (
    <>
      <h1>Güvenlik</h1>
      <p className="alt">Aynı e-posta için 15 dakika içinde 5 hatalı denemeden sonra giriş geçici olarak kilitlenir.</p>

      <h2>Son 20 giriş denemesi</h2>
      {denemeler.length === 0 ? (
        <p className="soluk">Henüz kayıt yok.</p>
      ) : (
        <div className="tablo-kap">
          <table className="tbl">
            <thead><tr><th>Zaman</th><th>E-posta</th><th>IP</th><th>Sonuç</th></tr></thead>
            <tbody>
              {denemeler.map((d) => (
                <tr key={d.id}>
                  <td className="soluk" style={{ whiteSpace: 'nowrap' }}>{tarih(d.zaman)}</td>
                  <td>{d.eposta}</td>
                  <td><code>{d.ip ?? '—'}</code></td>
                  <td>{d.basarili ? <span className="rozet yesil">Başarılı</span> : <span className="rozet kirmizi">Hatalı</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2>Son 24 saatte en çok hatalı deneme yapan IP&apos;ler</h2>
      {ipler.length === 0 ? (
        <p className="soluk">Son 24 saatte hatalı deneme yok.</p>
      ) : (
        <div className="tablo-kap">
          <table className="tbl">
            <thead><tr><th>IP</th><th>Hatalı deneme</th></tr></thead>
            <tbody>
              {ipler.map((r) => (
                <tr key={r.ip ?? 'yok'}><td><code>{r.ip ?? '—'}</code></td><td className="sayi">{r.hatali_deneme}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
