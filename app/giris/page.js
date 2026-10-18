import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { OTURUM_CEREZI, OTURUM_SURESI_SN, oturumuGetir } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Yönetici girişi', robots: { index: false } };

// Kayıtlı olmayan e-postalarda da bcrypt.compare çalışsın diye kullanılan sahte özet.
// Böylece "e-posta yok" ile "şifre yanlış" durumları yanıt süresinden de ayırt edilemez.
let sahteOzet;
function sahteOzetiGetir() {
  if (!sahteOzet) sahteOzet = bcrypt.hashSync(crypto.randomBytes(16).toString('hex'), 12);
  return sahteOzet;
}

async function girisYap(formData) {
  'use server';

  const eposta = String(formData.get('eposta') ?? '').trim().toLowerCase();
  const sifre = String(formData.get('sifre') ?? '');
  if (!eposta || !sifre || eposta.length > 254 || sifre.length > 200) {
    redirect('/giris?hata=1');
  }

  // Görev 6: kaba kuvvet kilidi — şifreyi kontrol etmeden ÖNCE son 15 dakikadaki hatalı denemeleri say.
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'bilinmiyor';
  const [{ sayi }] = await sql`
    SELECT COUNT(*)::int AS sayi FROM giris_denemeleri
    WHERE eposta = ${eposta} AND basarili = false
      AND zaman > now() - interval '15 minutes'`;
  if (sayi >= 5) redirect('/giris?hata=kilit');

  // Şifre kontrolü (bcrypt.compare). Kullanıcı yoksa sahte özetle karşılaştırılır.
  const [yonetici] = await sql`SELECT id, sifre_hash FROM yoneticiler WHERE eposta = ${eposta}`;
  const sifreDogru = await bcrypt.compare(sifre, yonetici?.sifre_hash ?? sahteOzetiGetir());
  const basarili = Boolean(yonetici) && sifreDogru;

  // Her denemeyi kaydet (başarılıysa basarili = true).
  await sql`INSERT INTO giris_denemeleri (eposta, ip, basarili) VALUES (${eposta}, ${ip}, ${basarili})`;

  // Hatalı girişte tek ve genel bir mesaj: hangi bilginin yanlış olduğu söylenmez.
  if (!basarili) redirect('/giris?hata=1');

  // Doğru: rastgele token üret, oturumlar tablosuna 2 saatlik kaydet, httpOnly çereze yaz.
  const token = crypto.randomBytes(32).toString('hex');
  await sql`DELETE FROM oturumlar WHERE bitis < now()`; // süresi dolmuş eski oturumları temizle
  await sql`
    INSERT INTO oturumlar (token, yonetici_id, bitis)
    VALUES (${token}, ${yonetici.id}, now() + interval '2 hours')`;

  (await cookies()).set(OTURUM_CEREZI, token, {
    httpOnly: true,                                  // JavaScript çereze erişemez (XSS'e karşı)
    secure: process.env.NODE_ENV === 'production',   // canlıda yalnızca HTTPS
    sameSite: 'lax',                                 // başka sitelerden gelen POST isteklerinde gönderilmez
    path: '/',
    maxAge: OTURUM_SURESI_SN,
  });

  redirect('/admin');
}

const MESAJLAR = {
  '1': { tur: 'hata', metin: 'E-posta veya şifre hatalı.' },
  kilit: { tur: 'hata', metin: 'Çok fazla hatalı deneme. 15 dakika sonra tekrar deneyin.' },
};

export default async function GirisSayfasi({ searchParams }) {
  if (await oturumuGetir()) redirect('/admin');

  const sp = await searchParams;
  const mesaj = sp?.cikis ? { tur: 'bilgi', metin: 'Çıkış yaptınız.' } : MESAJLAR[sp?.hata];

  return (
    <main className="giris">
      <form action={girisYap} className="card giris-kart">
        <a className="brand" href="/"><span className="mark" aria-hidden="true">K</span>Kaan Semih Kurt</a>
        <h1>Yönetici girişi</h1>
        {mesaj && <p className={`uyari ${mesaj.tur}`} role="alert">{mesaj.metin}</p>}
        <div className="fld">
          <label htmlFor="eposta">E-posta</label>
          <input id="eposta" name="eposta" type="email" autoComplete="username" required maxLength={254} />
        </div>
        <div className="fld">
          <label htmlFor="sifre">Şifre</label>
          <input id="sifre" name="sifre" type="password" autoComplete="current-password" required maxLength={200} />
        </div>
        <button className="btn pri" type="submit">Giriş yap</button>
        <a className="geri" href="/">← Siteye dön</a>
      </form>
    </main>
  );
}
