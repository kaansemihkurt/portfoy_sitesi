import Link from 'next/link';
import { GithubIkon } from '@/components/Ikonlar';

export const metadata = {
  title: 'Zafiyet İstihbarat Panosu: vaka çalışması | Kaan Semih Kurt',
  description: 'NVD CVE ve CISA KEV verisiyle günlük güncellenen, erişilebilir zafiyet önceliklendirme panosu; Zero Trust erişimle güvenli bulut yayını.',
};

// ⚠ KAAN: Aşağıdakileri KENDİ sonuçlarınla doldur. Boş (null / []) olanlar sayfada gösterilmez; uydurma değer yazma.
const SONUCLAR = {
  urun: null,            // ör. 'https://xxx.azurestaticapps.net'  (canlı ürün)
  lighthouseA11y: null,  // ör. 96   (PageSpeed Insights, mobil)
  lighthousePerf: null,  // ör. 88
  zapOnce: null,         // ör. '9 uyarı (Orta: 3)'
  zapSonra: null,        // ör. '2 uyarı (Orta: 0)'
  observatory: null,     // ör. 'A'
  securityheaders: null, // ör. 'A'
  dogrulandi: false,     // 403 testleri ve alarm kanıtlandıysa true
};
// Ekran görüntülerini public/img/ altına koy: ör. { src: '/img/zafiyet-1920.png', alt: '…', cap: '1920 px SOC görünümü' }
const EKRANLAR = [];
// Demo videosu: public/video/ altına koy. ör. { src: '/video/zafiyet-panosu-demo.webm', vtt: '/video/zafiyet-panosu-demo.vtt' }
const VIDEO = null;
// Kullanıcı testi: ör. { ozet: '2 katılımcı, 3 görev: 6 görevin 5\'i başarılı; ortalama 41 sn …', degisiklik: '…', once: '/img/zafiyet-test-once.png', sonra: '/img/zafiyet-test-sonra.png' }
const TEST = null;

const KONTROLLER = [
  { k: 'zp.c1', h: 'Zero Trust erişim ve roller', d: 'Ekip panosuna (/panel/) her istek Microsoft Entra ID + MFA ile doğrulanır. Yalnızca davetle izleyici veya analist rolü verilenler görür; düzenleme yalnızca analiste açık. Rol API\'de her istekte yeniden denetlenir, rolsüz hesap 403 alır.' },
  { k: 'zp.c2', h: 'Anahtarsız istemci, en az yetki', d: 'İstemcide ve depoda anahtar yok. NVD anahtarı yalnızca GitHub Actions içinde, tablo erişimi ise süreli ve yalnızca gereken işlemlere izin veren bir SAS ile yapılır. CI/CD en az yetkiyle çalışır; gitleaks, npm audit, CodeQL ve Dependabot açık.' },
  { k: 'zp.c3', h: 'Sıkı başlıklar, log ve alarm', d: 'HTTPS + HSTS, satır içi kod olmadan CSP (grafik kütüphanesi de yerel dosyadan), frame-ancestors none ve diğer başlıklar. Her erişim kararı takma adlı olarak loglanır; tekrarlanan reddedilen isteklerde e-posta alarmı gelir.' },
];

const Bolum = ({ id, k, baslik, children }) => (
  <section id={id} className="card rv" style={{ marginTop: 22 }}>
    <h2 data-i={k}>{baslik}</h2>
    {children}
  </section>
);

export default function ZafiyetPanosuSayfasi() {
  const s = SONUCLAR;
  const guvenlikSonuc = [
    s.dogrulandi && 'Rolsüz hesap → 403; izleyicinin yazma isteği → 403; denemeler logda DENY olarak göründü ve alarm tetiklendi.',
    s.zapOnce && s.zapSonra && `OWASP ZAP baseline: ${s.zapOnce} → ${s.zapSonra}`,
    s.observatory && `Mozilla Observatory: ${s.observatory}`,
    s.securityheaders && `securityheaders.com: ${s.securityheaders}`,
  ].filter(Boolean);

  return (
    <main id="main" className="wrap">
      <div className="page-head rv">
        <p className="eyebrow" data-i="zp.case.eyebrow">VAKA ÇALIŞMASI · CANLI VERİ ÜRÜNÜ</p>
        <h1 data-i="zp.h">Zafiyet İstihbarat Panosu</h1>
        <p data-i="zp.case.lead">Bir üniversitenin bilgi işlem güvenlik ekibi için (kurgusal müşteri) NVD CVE ve CISA KEV verisiyle her sabah güncellenen, sabah vardiyasındaki analistin &quot;bugün önce neye bakmalıyım?&quot; sorusunu yanıtlayan önceliklendirme panosu.</p>
        <div className="links" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 14 }}>
          {s.urun && <a className="btn pri" href={s.urun} target="_blank" rel="noopener" data-i="zp.case.live">Canlı ürünü aç →</a>}
          <a className="rep" href="https://github.com/kaansemihkurt/zafiyet-panosu" target="_blank" rel="noopener"><GithubIkon /><span data-i="p0.gh">Projeyi GitHub&apos;da gör</span></a>
          <Link className="rep" href="/projeler/mitre-attack" data-i="zp.case.related">İlgili proje: MITRE ATT&amp;CK tehdit ağı analizi →</Link>
        </div>
      </div>

      <Bolum k="zp.case.problem" baslik="Problem">
        <p>Her hafta yüzlerce yeni CVE yayımlanıyor ve hepsini aynı anda yamamak mümkün değil. Güvenlik ekibinin her sabah üç soruyu hızla yanıtlaması gerekiyor: Bizim kullandığımız ürünleri etkileyen yeni bir zafiyet var mı? Bunlardan hangisi şu an gerçekten istismar ediliyor (CISA KEV)? Önce hangisine bakmalıyım ve neden?</p>
      </Bolum>

      <Bolum k="zp.case.user" baslik="Kullanıcı">
        <p>Sabah vardiyasında öncelik belirleyen güvenlik analisti. Kontrol odasındaki 1920 px ekranda yoğun ama okunaklı bir görünüm istiyor, koridorda telefonundan özet bakabilmeli, fareye uzanmadan klavyeyle çalışıyor.</p>
        <ul>
          <li>Kendi ürün ve üreticilerini <b>izleme listesine</b> ekler; liste yalnızca kendi tarayıcısında saklanır.</li>
          <li>KEV&apos;deki ve fidye kampanyalarında kullanılan zafiyetler etiketle ayrılır.</li>
          <li>Öncelik puanı gerekçesiyle görünür: 50 × CVSS/10, +30 KEV, +10 fidye, +10 izleme listesi.</li>
        </ul>
      </Bolum>

      <Bolum k="zp.case.pipeline" baslik="Veri hattı">
        <img src="/img/zafiyet-veri-hatti.png" width="1800" height="345" loading="lazy" style={{ width: '100%', height: 'auto', borderRadius: 10, background: '#fff', marginTop: 12 }}
          alt="Veri hattı şeması: NVD CVE API ve CISA KEV, günlük GitHub Actions görevi, data dalındaki anlık görüntüler, Azure Static Web Apps ve tarayıcıdaki pano" data-i-attr="alt:zp.case.pipeAlt" />
        <ul style={{ marginTop: 14 }}>
          <li>GitHub Actions her sabah NVD&apos;den son 10 günün CVE&apos;lerini, KEV&apos;deki CVE&apos;lerin CVSS puanlarını ve 12 haftalık sayıları; CISA&apos;dan KEV kataloğunu çeker.</li>
          <li>NVD API anahtarı yalnızca GitHub Secrets&apos;ta durur, istemciye hiç gitmez. Hız sınırına uyulur.</li>
          <li>Kaynak geçmiş özet vermediği için her gün bir <b>anlık görüntü</b> ayrı bir veri dalına yazılır; KEV&apos;in büyümesi kendi zaman serimizde birikir.</li>
          <li>Bir kaynak çökerse önceki veri korunur. Pano, ağ yoksa tarayıcıdaki son başarılı veriyle açılır ve bunu açıkça söyler.</li>
        </ul>
      </Bolum>

      {EKRANLAR.length > 0 && (
        <Bolum k="zp.case.screens" baslik="Ekranlar">
          <div className="pgrid">
            {EKRANLAR.map((e) => (
              <figure key={e.src} style={{ margin: 0 }}>
                <img src={e.src} alt={e.alt} loading="lazy" style={{ width: '100%', height: 'auto', borderRadius: 10 }} />
                {e.cap && <figcaption className="hint" style={{ marginTop: 6 }}>{e.cap}</figcaption>}
              </figure>
            ))}
          </div>
        </Bolum>
      )}

      {VIDEO && (
        <Bolum k="zp.case.video" baslik="Demo videosu">
          <video controls preload="metadata" style={{ width: '100%', borderRadius: 10, marginTop: 12 }}>
            <source src={VIDEO.src} type="video/webm" />
            {VIDEO.vtt && <track kind="captions" src={VIDEO.vtt} srcLang="tr" label="Türkçe" default />}
          </video>
        </Bolum>
      )}

      <Bolum k="zp.case.design" baslik="Tasarım kararları">
        <ul>
          <li><b>Portföy tasarım sistemi + kart kısıtı:</b> renk token&apos;ları (gece mavisi, vurgu #5ea6ff) portföyle aynı. Kartın SOC kısıtı öncelikli olduğu için yalnızca koyu tema kullanıldı ve 1920 px&apos;te üç sütunlu yoğun düzen kuruldu. Güvenlik başlığı (CSP &apos;self&apos;) nedeniyle Google Fonts yerine sistem yazı tipi seçildi.</li>
          <li><b>KPI → grafik → tablo akışı:</b> dört KPI, haftalık trend (ana grafik), CVSS dağılımı (ikincil grafik) ve sıralanabilir ayrıntı tablosu. Mobilde sıra KPI → öncelik listesi → grafikler → tablo kartları.</li>
          <li><b>Erişilebilirlik:</b> tam klavye desteği (<code>/</code> arama, <code>K</code> KEV, <code>W</code> izleme listesi, <code>?</code> kısayollar), görünür odak, her grafikte otomatik özet cümlesi ve &quot;veriyi tablo olarak gör&quot;. Renk tek başına anlam taşımıyor: ikon, desen ve metin de var.</li>
          <li><b>Durumlar:</b> iskelet yükleme, boş sonuç (filtreleri sıfırla düğmesiyle) ve hata (son başarılı veri ya da yeniden dene).</li>
        </ul>
      </Bolum>

      {TEST && (
        <Bolum k="zp.case.test" baslik="Kullanıcı testi bulguları">
          <p>{TEST.ozet}</p>
          {TEST.degisiklik && <p><b>Değişiklik:</b> {TEST.degisiklik}</p>}
          {TEST.once && TEST.sonra && (
            <div className="pgrid">
              <figure style={{ margin: 0 }}><img src={TEST.once} alt="Testten önce" loading="lazy" style={{ width: '100%', borderRadius: 10 }} /><figcaption className="hint">Önce</figcaption></figure>
              <figure style={{ margin: 0 }}><img src={TEST.sonra} alt="Testten sonra" loading="lazy" style={{ width: '100%', borderRadius: 10 }} /><figcaption className="hint">Sonra</figcaption></figure>
            </div>
          )}
        </Bolum>
      )}

      <Bolum k="zp.case.result" baslik="Sonuç">
        <ul>
          <li>Veri her sabah otomatik güncelleniyor; ekranda son güncelleme zamanı ve kaynak bağlantıları hep görünür.</li>
          {s.lighthouseA11y && s.lighthousePerf && <li>Lighthouse (mobil): Erişilebilirlik {s.lighthouseA11y}, Performans {s.lighthousePerf}.</li>}
          <li>PWA olarak yüklenebiliyor, TR/EN iki dilli.</li>
        </ul>
        <p className="hint" style={{ marginTop: 10 }}><b>CV:</b> NVD CVE API 2.0 ve CISA KEV verisini GitHub Actions ile her gün çeken, izleme listesi ve açıklanabilir öncelik puanıyla kritik zafiyetleri sıralayan erişilebilir SOC panosu geliştirdim (ECharts, PWA, TR/EN).</p>
      </Bolum>

      <Bolum k="zp.case.week" baslik="Bir haftam daha olsaydı">
        <ul>
          <li>FIRST EPSS istismar olasılığı skorunu öncelik puanına eklemek.</li>
          <li>Kurumun varlık envanterinden (CPE) izleme listesini otomatik üretmek.</li>
          <li>KEV son tarihleri için takvim görünümü ve e-posta / Teams bildirimi.</li>
          <li>Tarayıcıdaki izleme listesini, isteğe bağlı olarak ekip panosundaki ortak listeyle eşitlemek.</li>
        </ul>
      </Bolum>

      <section id="guvenlik" className="card rv" style={{ marginTop: 22 }}>
        <p className="eyebrow" data-i="zp.sec.label">GÜVENLİK VE ALTYAPI</p>
        <h2 data-i="zp.sec.h">Mimari ve güven sınırları</h2>
        <img src="/img/zafiyet-mimari.png" width="2384" height="995" loading="lazy" style={{ width: '100%', height: 'auto', borderRadius: 10, background: '#fff', marginTop: 12 }}
          alt="Mimari diyagram: kullanıcı, Entra ID, Azure Static Web Apps, Functions API, Table Storage, Application Insights, GitHub Actions ve veri kaynakları arasındaki veri akışı ve güven sınırları" data-i-attr="alt:zp.alt" />
        <h3 style={{ marginTop: 22 }} data-i="zp.ctrl.h">Öne çıkan üç kontrol</h3>
        <div className="pgrid">
          {KONTROLLER.map((c) => (
            <article key={c.k} className="card pcard">
              <h3 data-i={`${c.k}.h`}>{c.h}</h3>
              <p data-i={`${c.k}.d`}>{c.d}</p>
            </article>
          ))}
        </div>
        {guvenlikSonuc.length > 0 && (
          <>
            <h3 style={{ marginTop: 22 }} data-i="zp.test.h">Test sonucu</h3>
            <ul>{guvenlikSonuc.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </>
        )}
        <ul className="tags"><li className="tag">Azure Static Web Apps</li><li className="tag">Entra ID + MFA</li><li className="tag">Bicep</li><li className="tag">GitHub Actions</li><li className="tag">OWASP ZAP</li></ul>
      </section>
    </main>
  );
}
