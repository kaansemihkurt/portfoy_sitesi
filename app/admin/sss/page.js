import Link from 'next/link';
import { sql } from '@/lib/db';
import { oturumGerekli } from '@/lib/auth';
import SssFormu from '@/components/SssFormu';
import OnayliButon from '@/components/OnayliButon';
import { sssEkle, sssSil, sssYayinDegistir } from './actions';

export const dynamic = 'force-dynamic';

const BILDIRIM = {
  eklendi: { tur: 'basari', metin: 'Kayıt eklendi. Sitede görmek için sayfayı yenileyin.' },
  guncellendi: { tur: 'basari', metin: 'Kayıt güncellendi.' },
  silindi: { tur: 'basari', metin: 'Kayıt silindi.' },
};
const HATA = {
  'soru-bos': 'Soru alanı boş olamaz.',
  uzun: 'Soru en fazla 500, cevap en fazla 3000 karakter olabilir.',
  sayi: 'Sıra ve kategori tam sayı olmalı.',
};

export default async function AdminSss({ searchParams }) {
  await oturumGerekli();
  const sp = await searchParams;

  // Kayıtları kategori adıyla birlikte listele (JOIN). LEFT JOIN: kategorisi olmayanlar da görünür.
  const kayitlar = await sql`
    SELECT s.id, s.soru, s.cevap, s.sira, s.tiklanma, s.yayinda, k.ad AS kategori
    FROM sss s
    LEFT JOIN sss_kategorileri k ON k.id = s.kategori_id
    ORDER BY s.sira ASC NULLS LAST, s.id ASC`;
  const kategoriler = await sql`SELECT id, ad FROM sss_kategorileri ORDER BY id`;

  const bildirim = BILDIRIM[sp?.ok];
  const hata = HATA[sp?.hata];

  return (
    <>
      <h1>Sık sorulan sorular</h1>
      <p className="alt">{kayitlar.length} kayıt · sitede yalnızca &quot;yayında&quot; olanlar görünür.</p>
      {bildirim && <p className={`uyari ${bildirim.tur}`}>{bildirim.metin}</p>}
      {hata && <p className="uyari hata" role="alert">{hata}</p>}

      <h2>Yeni kayıt ekle</h2>
      <SssFormu action={sssEkle} kategoriler={kategoriler} dugme="Ekle" />

      <h2>Kayıtlar</h2>
      <div className="tablo-kap">
        <table className="tbl">
          <thead>
            <tr>
              <th>id</th><th>Sıra</th><th>Soru</th><th>Cevap</th><th>Kategori</th><th>Tıklanma</th><th>Durum</th><th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {kayitlar.map((k) => (
              <tr key={k.id}>
                <td className="sayi soluk">{k.id}</td>
                <td className="sayi">{k.sira ?? <span className="soluk">—</span>}</td>
                <td className="kisa">{k.soru}</td>
                <td className="kisa soluk">{k.cevap ? (k.cevap.length > 90 ? k.cevap.slice(0, 90) + '…' : k.cevap) : <em>(boş)</em>}</td>
                <td>{k.kategori ?? <span className="soluk">—</span>}</td>
                <td className="sayi">{k.tiklanma ?? 0}</td>
                <td>{k.yayinda ? <span className="rozet yesil">Yayında</span> : <span className="rozet gri">Yayında değil</span>}</td>
                <td>
                  <div className="islemler">
                    <Link className="kbtn" href={`/admin/sss/${k.id}`}>Düzenle</Link>
                    <form action={sssYayinDegistir}>
                      <input type="hidden" name="id" value={k.id} />
                      <button type="submit" className="kbtn">{k.yayinda ? 'Yayından kaldır' : 'Yayına al'}</button>
                    </form>
                    <form action={sssSil}>
                      <input type="hidden" name="id" value={k.id} />
                      <OnayliButon mesaj={`"${k.soru}" silinsin mi? Bu işlem geri alınamaz.`}>Sil</OnayliButon>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
