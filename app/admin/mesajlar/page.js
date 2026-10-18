import { sql } from '@/lib/db';
import { oturumGerekli } from '@/lib/auth';
import { tarih } from '@/lib/bicim';
import OnayliButon from '@/components/OnayliButon';
import { mesajOkunduDegistir, mesajSil } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminMesajlar() {
  await oturumGerekli();

  // Yeniden eskiye
  const mesajlar = await sql`
    SELECT id, ad_soyad, eposta, mesaj, kvkk_onay, okundu, gonderim_zamani
    FROM iletisim_mesajlari
    ORDER BY gonderim_zamani DESC`;
  const okunmamis = mesajlar.filter((m) => !m.okundu).length;

  return (
    <>
      <h1>Mesajlar</h1>
      <p className="alt">{mesajlar.length} mesaj · {okunmamis} okunmamış</p>
      {mesajlar.length === 0 ? (
        <p className="soluk">Henüz mesaj yok.</p>
      ) : (
        <div className="tablo-kap">
          <table className="tbl">
            <thead>
              <tr><th>Zaman</th><th>Gönderen</th><th>Mesaj</th><th>KVKK</th><th>Durum</th><th>İşlemler</th></tr>
            </thead>
            <tbody>
              {mesajlar.map((m) => (
                <tr key={m.id} className={m.okundu ? '' : 'okunmamis'}>
                  <td className="soluk" style={{ whiteSpace: 'nowrap' }}>{tarih(m.gonderim_zamani)}</td>
                  <td>
                    <strong>{m.ad_soyad}</strong><br />
                    <a href={`mailto:${m.eposta}`} className="soluk">{m.eposta}</a>
                  </td>
                  <td className="kisa"><p className="mesaj-metni">{m.mesaj}</p></td>
                  <td>{m.kvkk_onay ? <span className="rozet yesil">Onaylı</span> : <span className="rozet kirmizi">Yok</span>}</td>
                  <td>{m.okundu ? <span className="rozet gri">Okundu</span> : <span className="rozet yesil">Yeni</span>}</td>
                  <td>
                    <div className="islemler">
                      <form action={mesajOkunduDegistir}>
                        <input type="hidden" name="id" value={m.id} />
                        <button type="submit" className="kbtn">{m.okundu ? 'Okunmadı yap' : 'Okundu işaretle'}</button>
                      </form>
                      <form action={mesajSil}>
                        <input type="hidden" name="id" value={m.id} />
                        <OnayliButon mesaj={`${m.ad_soyad} adlı kişinin mesajı silinsin mi?`}>Sil</OnayliButon>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
