# Kaan Semih Kurt | Portfolyo

Büyük veri analizi, yazılım ve donanım alanlarındaki çalışmalarımı bir araya getirdiğim kişisel portfolyo sitem.

<!-- Yayına aldıktan sonra aşağıdaki satırı aç ve adresi düzelt:
🔗 **Canlı site:** https://kullaniciadi.github.io/depo-adi
-->

<!-- Ekran görüntüsü eklemek için dosyayı depoya yükle ve satırı aç:
![Ana sayfa](ekran-goruntusu.png)
-->

## Sayfalar

| Sayfa | Dosya | İçerik |
|---|---|---|
| Ana sayfa | `index.html` | Tanıtım, hakkımda, eğitim ve deneyim, yetenekler |
| Projeler | `projeler.html` | Veri analizi ve yazılım projelerim |
| İletişim | `iletisim.html` | Mesaj formu |

## Özellikler

- Çok sayfalı yapı, tüm sayfalarda ortak menü
- Koyu tema, cam efektli kartlar ve yağmur animasyonu
- Daktilo efekti, kaydırma ilerleme çubuğu ve kaydırınca beliren bölümler
- Mobil, tablet ve masaüstüyle uyumlu (responsive) tasarım
- `prefers-reduced-motion` desteği: hareketi azaltmayı seçen kullanıcılarda animasyonlar kapanır
- İletişim formu: zorunlu alan kontrolü, karakter sayacı, bot koruması ve gönderim bildirimi

## Kullanılan teknolojiler

- HTML5
- CSS3 (framework kullanılmadı)
- JavaScript (kütüphanesiz)
- Google Fonts: Inter, Space Grotesk, IBM Plex Mono
- [Formspree](https://formspree.io): iletişim formu için

## Klasör yapısı

```
├── index.html
├── projeler.html
├── iletisim.html
├── style.css
├── main.js
└── README.md
```

## Yerelde çalıştırma

Derleme veya kurulum gerekmez.

```bash
git clone https://github.com/kullaniciadi/depo-adi.git
cd depo-adi
```

Ardından `index.html` dosyasını tarayıcıda açman yeterli.

## GitHub Pages ile yayınlama

1. Depoda **Settings → Pages** bölümüne git.
2. **Source** olarak `Deploy from a branch` seç.
3. Dalı `main`, klasörü `/ (root)` olarak ayarla ve kaydet.
4. Birkaç dakika sonra site `https://kullaniciadi.github.io/depo-adi` adresinde yayına girer.

## İletişim formunu kendi hesabına bağlama

Form, Formspree üzerinden çalışır. Kendi hesabını kullanmak için:

1. Formspree'de yeni bir form oluştur.
2. `iletisim.html` içindeki `<form>` etiketinin `action` adresini kendi form adresinle değiştir:

   ```html
   <form id="contact-form" action="https://formspree.io/f/FORM_KODUN" ...>
   ```

## İletişim

- GitHub: [@Tomichami](https://github.com/Tomichami)
- Site üzerindeki [iletişim formu](iletisim.html)

## Lisans

Bu depodaki içerik (metinler, projeler ve kişisel bilgiler) bana aittir. İzinsiz kopyalanıp kendi adına yayınlanamaz. Tasarım yapısından ilham alabilirsin.
