# Kaan Semih Kurt — Portföy Sitesi

[English](README.md) | **Türkçe**

![sürüm](https://img.shields.io/badge/s%C3%BCr%C3%BCm-2.1.0-5ea6ff) ![Next.js](https://img.shields.io/badge/Next.js-16-000) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791)

**Next.js (App Router)** ve **PostgreSQL (Neon)** ile yazılmış, veritabanına ve yönetim paneline sahip çok sayfalı portföy sitesi. Gece yarısı mavisi tasarım, serif başlıklar, mavi vurgu. Yayında: https://kaansemihkurt.vercel.app

> 2.1.0 sürümü, Manisa Celal Bayar Üniversitesi *BVA 2205 Siber Güvenlik ve Bilişim Hukuku* dersi bireysel ödevi olarak geliştirildi.

## Özellikler

- **Diller:** Türkçe (varsayılan), İngilizce ve Japonca. Sağ üstteki TR / EN / 日本語 düğmeleri; seçim hatırlanır. `?lang=en` gibi bir adresle de açılabilir.
- **Tema:** Varsayılan gece yarısı mavisi; düğmeyle açık mavi temaya geçilir ve seçim hatırlanır.
- **Veritabanından SSS:** Sorular ve cevaplar PostgreSQL'de tutulur, yönetim panelinden yönetilir; sitede yalnızca yayındaki kayıtlar gösterilir.
- **İletişim formu:** Mesajlar KVKK onayıyla birlikte veritabanına kaydedilir ve panelden okunur.
- **Yönetim paneli:** Şifreli giriş, oturum, SSS yönetimi, mesajlar ve güvenlik kaydı.

## Sayfalar

| Adres | İçerik |
|---|---|
| `/` | Ana sayfa ve veritabanından "Öne çıkan sorular" |
| `/projeler` | Projeler |
| `/sss` | Kategorilere göre sık sorulan sorular (yalnızca yayındakiler) |
| `/iletisim` | İletişim formu → `iletisim_mesajlari` tablosu |
| `/aydinlatma-metni` | KVKK aydınlatma metni (yurt dışına aktarım bilgisi dahil) |
| `/mail.html` | E-posta adresi sayfası |
| `/giris` | Yönetici girişi |
| `/admin` | Panel: okunmamış mesaj ve SSS kayıt sayısı |
| `/admin/sss` | SSS listeleme (JOIN), ekleme, düzenleme, silme, yayına alma / kaldırma |
| `/admin/mesajlar` | İletişim mesajları: okundu işaretleme, silme |
| `/admin/guvenlik` | Son 20 giriş denemesi ve en çok hatalı deneme yapan IP'ler |

## Güvenlik

- Tüm sorgular parametrelidir (`` sql`... ${deger}` ``); SQL hiçbir zaman metin birleştirerek kurulmaz (SQL injection koruması).
- Şifreler veritabanında yalnızca **bcrypt** özeti olarak tutulur (maliyet 12).
- Oturum token'ı `crypto.randomBytes(32)` ile üretilir, `oturumlar` tablosunda 2 saat geçerlidir ve **httpOnly**, `sameSite=lax`, canlıda `secure` bir çerezde saklanır.
- `/admin` altındaki **her sayfa ve her Server Action** oturumu ayrıca kontrol eder.
- Hatalı girişte yalnızca "E-posta veya şifre hatalı" denir (kullanıcı adı numaralandırmaya karşı). Kayıtlı olmayan e-postalar da sahte bir özetle karşılaştırılır; böylece yanıt süresinden hangi hesabın var olduğu anlaşılamaz.
- **Kaba kuvvet kilidi:** Aynı e-posta için 15 dakika içinde 5 hatalı denemeden sonra giriş geçici olarak kilitlenir. Her deneme `giris_denemeleri` tablosuna kaydedilir.
- İletişim formu alanları **sunucu tarafında** da doğrulanır (boş / çok uzun / geçersiz e-posta / onay eksik); botlara karşı gizli tuzak alan vardır.
- Veritabanı adresi `.env.local` dosyasındadır ve depoya gönderilmez (`.gitignore`).

## Klasör yapısı

```
app/
  (site)/          ziyaretçilerin gördüğü sayfalar (ortak üst menü ve alt bilgi)
  giris/           giriş sayfası ve çıkış işlemi
  admin/           yönetim paneli
components/        tekrar kullanılan bileşenler
lib/db.js          Neon bağlantısı
lib/auth.js        oturum kontrolü
lib/sozluk.js      TR / EN / JA metinleri
sql/tablolar.sql   tüm CREATE TABLE komutları
sql/sorgular.sql   ödevdeki SQL sorguları
public/            statik dosyalar (görseller, mail.html)
```

## Yerelde çalıştırma

```bash
npm install
# .env.example dosyasını .env.local olarak kopyalayıp DATABASE_URL'ye Neon bağlantı adresini yazın
npm run dev
```

Ardından http://localhost:3000 adresini açın.

## Yayın

Depo: `kaansemihkurt/portfoy_sitesi`. `main` dalına yapılan her değişiklik Vercel tarafından otomatik yayınlanır. `DATABASE_URL`, *Vercel → Settings → Environment Variables* bölümüne eklenmelidir. Sunucu işlevleri, Neon veritabanına (AWS eu-central-1) yakın olması için Frankfurt'ta (`fra1`, bkz. `vercel.json`) çalışır.

## Sürüm notları

### 2.1.0 — Veritabanı ve yönetim paneli
- Statik HTML'den **Next.js (App Router)** yapısına geçildi; tasarım, üç dil ve tema düğmesi korundu.
- **PostgreSQL (Neon)** veritabanı eklendi: `yoneticiler`, `oturumlar`, `iletisim_mesajlari`, `sss_kategorileri`, `sss`, `giris_denemeleri`.
- Veritabanından okunan yeni **SSS** sayfası (`/sss`) ve ana sayfada **Öne çıkan sorular** bölümü eklendi; bir soru açıldığında tıklanma sayısı artar.
- **İletişim formu** artık Formspree yerine mesajları veritabanına kaydediyor. Alanlar ad soyad, e-posta, mesaj ve KVKK onayı olarak sadeleştirildi (veri minimizasyonu); sunucu tarafı doğrulama eklendi.
- Yeni **yönetim paneli**: bcrypt ile giriş, oturum tablosu, httpOnly çerez, çıkış, özet ekranı, SSS yönetimi (ekleme / düzenleme / silme / yayın) ve mesaj yönetimi (okundu / silme).
- Yeni **kaba kuvvet koruması** ve **güvenlik kaydı** sayfası (`/admin/guvenlik`).
- Yurt dışına aktarım bilgisini içeren **KVKK aydınlatma metni** sayfası (`/aydinlatma-metni`, KVKK md. 9) eklendi.
- SQL dosyaları `sql/` klasörüne eklendi.

### 2.0.0 — Gece yarısı mavisi yeniden tasarım
- Gece yarısı mavisi tasarımlı, çok sayfalı statik site (ana sayfa, projeler, iletişim).
- Türkçe, İngilizce ve Japonca dil desteği; açık / koyu tema düğmesi.
- Formspree ile çalışan iletişim formu.
