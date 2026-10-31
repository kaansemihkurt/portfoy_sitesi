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
  zapOnce: null,         // ör. '9'  (ZAP baseline uyarı sayısı, önce)
  zapSonra: null,        // ör. '2'  (sonra)
  observatory: null,     // ör. 'A'
  securityheaders: null, // ör. 'A'
  dogrulandi: false,     // 403 testleri ve alarm kanıtlandıysa true
};
// Ekran görüntüleri (public/img/ altına koy): ör. { src: '/img/zafiyet-1920.png', alt: { tr: '…', en: '…', ja: '…' } }
const EKRANLAR = [];
// Demo videosu (public/video/ altına koy): ör. { src: '/video/zafiyet-panosu-demo.webm', vtt: '/video/zafiyet-panosu-demo.vtt' }
const VIDEO = null;
// Kullanıcı testi: ör. { tr: { ozet: '…', degisiklik: '…' }, en: {…}, ja: {…}, once: '/img/zafiyet-test-once.png', sonra: '/img/zafiyet-test-sonra.png' }
const TEST = null;

// Sitenin üç dilli sayfa yöntemi (Aydınlatma Metni ile aynı): her dil ayrı blokta,
// globals.css html[lang] ile seçili dilin bloğunu gösterir.
const METIN = {
  tr: {
    eyebrow: 'VAKA ÇALIŞMASI · CANLI VERİ ÜRÜNÜ',
    h1: 'Zafiyet İstihbarat Panosu',
    lead: 'Bir üniversitenin bilgi işlem güvenlik ekibi için (kurgusal müşteri) NVD CVE ve CISA KEV verisiyle her sabah güncellenen, sabah vardiyasındaki analistin "bugün önce neye bakmalıyım?" sorusunu yanıtlayan önceliklendirme panosu.',
    live: 'Canlı ürünü aç →', gh: "Projeyi GitHub'da gör", related: 'İlgili proje: MITRE ATT&CK tehdit ağı analizi →',
    problemH: 'Problem',
    problem: 'Her hafta yüzlerce yeni CVE yayımlanıyor ve hepsini aynı anda yamamak mümkün değil. Güvenlik ekibinin her sabah üç soruyu hızla yanıtlaması gerekiyor: Bizim kullandığımız ürünleri etkileyen yeni bir zafiyet var mı? Bunlardan hangisi şu an gerçekten istismar ediliyor (CISA KEV)? Önce hangisine bakmalıyım ve neden?',
    userH: 'Kullanıcı',
    user: 'Sabah vardiyasında öncelik belirleyen güvenlik analisti. Kontrol odasındaki 1920 px ekranda yoğun ama okunaklı bir görünüm istiyor, koridorda telefonundan özet bakabilmeli, fareye uzanmadan klavyeyle çalışıyor.',
    userList: [
      'Kendi ürün ve üreticilerini izleme listesine ekler; liste yalnızca kendi tarayıcısında saklanır.',
      "KEV'deki ve fidye kampanyalarında kullanılan zafiyetler etiketle ayrılır.",
      'Öncelik puanı gerekçesiyle görünür: 50 × CVSS/10, +30 KEV, +10 fidye, +10 izleme listesi.',
    ],
    pipeH: 'Veri hattı',
    pipeAlt: 'Veri hattı şeması: NVD CVE API ve CISA KEV, günlük GitHub Actions görevi, data dalındaki anlık görüntüler, Azure Static Web Apps ve tarayıcıdaki pano',
    pipe: [
      "GitHub Actions her sabah NVD'den son 10 günün CVE'lerini, KEV'deki CVE'lerin CVSS puanlarını ve 12 haftalık sayıları; CISA'dan KEV kataloğunu çeker.",
      "NVD API anahtarı yalnızca GitHub Secrets'ta durur, istemciye hiç gitmez. Hız sınırına uyulur.",
      "Kaynak geçmiş özet vermediği için her gün bir anlık görüntü ayrı bir veri dalına yazılır; KEV'in büyümesi kendi zaman serimizde birikir.",
      'Bir kaynak çökerse önceki veri korunur. Pano, ağ yoksa tarayıcıdaki son başarılı veriyle açılır ve bunu açıkça söyler.',
    ],
    screensH: 'Ekranlar', videoH: 'Demo videosu', videoLang: 'Türkçe',
    designH: 'Tasarım kararları',
    design: [
      ['Portföy tasarım sistemi + kart kısıtı:', "Renk token'ları (gece mavisi, vurgu #5ea6ff) portföyle aynı. Kartın SOC kısıtı öncelikli olduğu için yalnızca koyu tema kullanıldı ve 1920 px'te üç sütunlu yoğun düzen kuruldu. Güvenlik başlığı (CSP 'self') nedeniyle Google Fonts yerine sistem yazı tipi seçildi."],
      ['KPI → grafik → tablo akışı:', 'Dört KPI, haftalık trend (ana grafik), CVSS dağılımı (ikincil grafik) ve sıralanabilir ayrıntı tablosu. Mobilde sıra KPI → öncelik listesi → grafikler → tablo kartları.'],
      ['Erişilebilirlik:', 'Tam klavye desteği (/ arama, K KEV, W izleme listesi, ? kısayollar), görünür odak, her grafikte otomatik özet cümlesi ve "veriyi tablo olarak gör". Renk tek başına anlam taşımıyor: ikon, desen ve metin de var.'],
      ['Durumlar:', 'İskelet yükleme, boş sonuç (filtreleri sıfırla düğmesiyle) ve hata (son başarılı veri ya da yeniden dene).'],
    ],
    testH: 'Kullanıcı testi bulguları', change: 'Değişiklik:', before: 'Önce', after: 'Sonra',
    resultH: 'Sonuç',
    result: ['Veri her sabah otomatik güncelleniyor; ekranda son güncelleme zamanı ve kaynak bağlantıları hep görünür.', 'PWA olarak yüklenebiliyor, TR/EN iki dilli.'],
    lighthouse: (a, p) => `Lighthouse (mobil): Erişilebilirlik ${a}, Performans ${p}.`,
    cv: 'CV: NVD CVE API 2.0 ve CISA KEV verisini GitHub Actions ile her gün çeken, izleme listesi ve açıklanabilir öncelik puanıyla kritik zafiyetleri sıralayan erişilebilir SOC panosu geliştirdim (ECharts, PWA, TR/EN).',
    weekH: 'Bir haftam daha olsaydı',
    week: [
      'FIRST EPSS istismar olasılığı skorunu öncelik puanına eklemek.',
      'Kurumun varlık envanterinden (CPE) izleme listesini otomatik üretmek.',
      'KEV son tarihleri için takvim görünümü ve e-posta / Teams bildirimi.',
      'Tarayıcıdaki izleme listesini, isteğe bağlı olarak ekip panosundaki ortak listeyle eşitlemek.',
    ],
    secLabel: 'GÜVENLİK VE ALTYAPI', secH: 'Mimari ve güven sınırları',
    secAlt: 'Mimari diyagram: kullanıcı, Entra ID, Azure Static Web Apps, Functions API, Table Storage, Application Insights, GitHub Actions ve veri kaynakları arasındaki veri akışı ve güven sınırları',
    ctrlH: 'Öne çıkan üç kontrol',
    ctrl: [
      ['Zero Trust erişim ve roller', "Ekip panosuna (/panel/) her istek Microsoft Entra ID + MFA ile doğrulanır. Yalnızca davetle izleyici veya analist rolü verilenler görür; düzenleme yalnızca analiste açık. Rol API'de her istekte yeniden denetlenir, rolsüz hesap 403 alır."],
      ['Anahtarsız istemci, en az yetki', 'İstemcide ve depoda anahtar yok. NVD anahtarı yalnızca GitHub Actions içinde, tablo erişimi ise süreli ve yalnızca gereken işlemlere izin veren bir SAS ile yapılır. CI/CD en az yetkiyle çalışır; gitleaks, npm audit, CodeQL ve Dependabot açık.'],
      ['Sıkı başlıklar, log ve alarm', 'HTTPS + HSTS, satır içi kod olmadan CSP (grafik kütüphanesi de yerel dosyadan), frame-ancestors none ve diğer başlıklar. Her erişim kararı takma adlı olarak loglanır; tekrarlanan reddedilen isteklerde e-posta alarmı gelir.'],
    ],
    secTestH: 'Test sonucu',
    verified: 'Rolsüz hesap → 403; izleyicinin yazma isteği → 403; denemeler logda DENY olarak göründü ve alarm tetiklendi.',
    zap: (a, b) => `OWASP ZAP baseline uyarıları: ${a} → ${b}`,
  },
  en: {
    eyebrow: 'CASE STUDY · LIVE DATA PRODUCT',
    h1: 'Vulnerability Intelligence Dashboard',
    lead: 'A prioritisation dashboard for a university IT security team (fictional client), refreshed every morning with NVD CVE and CISA KEV data, answering the morning-shift analyst\'s question: "what should I look at first today?"',
    live: 'Open live product →', gh: 'View project on GitHub', related: 'Related project: MITRE ATT&CK threat network analysis →',
    problemH: 'Problem',
    problem: 'Hundreds of new CVEs are published every week, and patching them all at once is impossible. Every morning the security team has to answer three questions fast: Is there a new vulnerability affecting the products we use? Which of them is actually being exploited right now (CISA KEV)? Which one should I look at first, and why?',
    userH: 'User',
    user: 'A security analyst setting priorities on the morning shift. They want a dense but readable view on the 1920 px control-room screen, a quick summary on their phone in the corridor, and to work from the keyboard without reaching for the mouse.',
    userList: [
      'Adds their own products and vendors to a watchlist that is stored only in their browser.',
      'Vulnerabilities in KEV and those used in ransomware campaigns are tagged.',
      'The priority score is shown with its reasons: 50 × CVSS/10, +30 KEV, +10 ransomware, +10 watchlist.',
    ],
    pipeH: 'Data pipeline',
    pipeAlt: 'Data pipeline diagram: NVD CVE API and CISA KEV, daily GitHub Actions job, snapshots on the data branch, Azure Static Web Apps and the dashboard in the browser',
    pipe: [
      'Every morning GitHub Actions pulls the last 10 days of CVEs, the CVSS scores of KEV-listed CVEs and 12 weeks of counts from NVD, and the KEV catalogue from CISA.',
      'The NVD API key lives only in GitHub Secrets and never reaches the client. Rate limits are respected.',
      'Because the source provides no history, a daily snapshot is written to a separate data branch, so KEV growth builds up in our own time series.',
      'If a source fails, the previous data is kept. Without a network, the dashboard opens with the last successful data in the browser and says so clearly.',
    ],
    screensH: 'Screens', videoH: 'Demo video', videoLang: 'Turkish',
    designH: 'Design decisions',
    design: [
      ['Portfolio design system + card constraint:', 'Colour tokens (midnight blue, accent #5ea6ff) match the portfolio. Because the SOC constraint on the brief takes priority, only a dark theme is used, with a dense three-column layout at 1920 px. System fonts replace Google Fonts because of the security header (CSP \'self\').'],
      ['KPI → chart → table flow:', 'Four KPIs, the weekly trend (main chart), the CVSS distribution (secondary chart) and a sortable detail table. On mobile the order is KPIs → priority list → charts → table cards.'],
      ['Accessibility:', 'Full keyboard support (/ search, K KEV, W watchlist, ? shortcuts), visible focus, an automatic summary sentence and "show data as table" for every chart. Colour never carries meaning alone: icons, patterns and text back it up.'],
      ['States:', 'Skeleton loading, empty results (with a reset-filters button) and errors (last successful data or try again).'],
    ],
    testH: 'User testing findings', change: 'Change:', before: 'Before', after: 'After',
    resultH: 'Outcome',
    result: ['Data refreshes automatically every morning; the last update time and source links are always visible.', 'Installable as a PWA, bilingual TR/EN.'],
    lighthouse: (a, p) => `Lighthouse (mobile): Accessibility ${a}, Performance ${p}.`,
    cv: 'CV: Built an accessible SOC dashboard that pulls NVD CVE API 2.0 and CISA KEV data daily with GitHub Actions and ranks critical vulnerabilities with a watchlist and an explainable priority score (ECharts, PWA, TR/EN).',
    weekH: 'If I had one more week',
    week: [
      'Add the FIRST EPSS exploit-probability score to the priority score.',
      "Generate the watchlist automatically from the organisation's asset inventory (CPE).",
      'A calendar view for KEV due dates with e-mail / Teams notifications.',
      "Optionally sync the browser watchlist with the shared list on the team panel.",
    ],
    secLabel: 'SECURITY AND INFRASTRUCTURE', secH: 'Architecture and trust boundaries',
    secAlt: 'Architecture diagram: data flow and trust boundaries between the user, Entra ID, Azure Static Web Apps, the Functions API, Table Storage, Application Insights, GitHub Actions and the data sources',
    ctrlH: 'Three key controls',
    ctrl: [
      ['Zero Trust access and roles', 'Every request to the team panel (/panel/) is authenticated with Microsoft Entra ID + MFA. Only people invited with the viewer or analyst role can see it, and only analysts can edit. The API re-checks the role on every request; accounts without a role get 403.'],
      ['Keyless client, least privilege', 'No keys in the client or the repository. The NVD key is used only inside GitHub Actions, and table access uses a time-limited SAS that allows only the required operations. CI/CD runs with least privilege; gitleaks, npm audit, CodeQL and Dependabot are enabled.'],
      ['Strict headers, logs and alerts', 'HTTPS + HSTS, a CSP without inline code (the chart library is served locally too), frame-ancestors none and the other headers. Every access decision is logged under a pseudonym; repeated denied requests trigger an e-mail alert.'],
    ],
    secTestH: 'Test result',
    verified: 'Account without a role → 403; viewer write request → 403; the attempts appeared as DENY in the logs and the alert fired.',
    zap: (a, b) => `OWASP ZAP baseline alerts: ${a} → ${b}`,
  },
  ja: {
    eyebrow: 'ケーススタディ · ライブデータ製品',
    h1: '脆弱性インテリジェンス・ダッシュボード',
    lead: '大学の情報セキュリティチーム(架空の顧客)のために、NVD CVE と CISA KEV のデータで毎朝更新される優先順位付けダッシュボード。朝のシフトのアナリストの「今日はまず何を見るべきか?」という問いに答えます。',
    live: 'ライブ製品を開く →', gh: 'GitHubでプロジェクトを見る', related: '関連プロジェクト:MITRE ATT&CK 脅威ネットワーク分析 →',
    problemH: '課題',
    problem: '毎週何百もの新しい CVE が公開され、すべてを同時にパッチすることはできません。セキュリティチームは毎朝、次の3つの問いにすばやく答える必要があります。自分たちが使う製品に影響する新しい脆弱性はあるか?そのうち実際に今悪用されているものはどれか(CISA KEV)?どれを最初に、なぜ確認すべきか?',
    userH: 'ユーザー',
    user: '朝のシフトで優先順位を決めるセキュリティアナリスト。監視室の 1920 px 画面では密度が高くても読みやすい表示を、廊下ではスマートフォンで要約を確認したく、マウスに手を伸ばさずキーボードで作業します。',
    userList: [
      '自組織の製品やベンダーをウォッチリストに追加します。リストは自分のブラウザーにのみ保存されます。',
      'KEV に含まれる脆弱性とランサムウェア攻撃で使われる脆弱性にはラベルが付きます。',
      '優先度スコアは根拠とともに表示されます:50 × CVSS/10、KEV +30、ランサムウェア +10、ウォッチリスト +10。',
    ],
    pipeH: 'データパイプライン',
    pipeAlt: 'データパイプライン図:NVD CVE API と CISA KEV、毎日の GitHub Actions ジョブ、data ブランチのスナップショット、Azure Static Web Apps、ブラウザー上のダッシュボード',
    pipe: [
      '毎朝 GitHub Actions が NVD から直近10日間の CVE、KEV 掲載 CVE の CVSS スコア、12週間分の件数を、CISA から KEV カタログを取得します。',
      'NVD の API キーは GitHub Secrets にのみ保存され、クライアントには一切渡りません。レート制限も守ります。',
      'データ源が履歴を提供しないため、毎日のスナップショットを別のデータブランチに書き込み、KEV の増加を独自の時系列として蓄積します。',
      'データ源が停止しても以前のデータは保持されます。ネットワークがない場合、ダッシュボードはブラウザー内の最後に成功したデータで開き、そのことを明示します。',
    ],
    screensH: '画面', videoH: 'デモ動画', videoLang: 'トルコ語',
    designH: 'デザイン上の判断',
    design: [
      ['ポートフォリオのデザインシステム + 課題の制約:', "カラートークン(ミッドナイトブルー、アクセント #5ea6ff)はポートフォリオと共通です。SOC の制約を優先し、ダークテーマのみを採用し、1920 px では高密度の3カラムレイアウトにしました。セキュリティヘッダー(CSP 'self')のため、Google Fonts の代わりにシステムフォントを使用しています。"],
      ['KPI → グラフ → 表の流れ:', '4つの KPI、週次トレンド(メイングラフ)、CVSS 分布(サブグラフ)、並べ替え可能な詳細表。モバイルでは KPI → 優先度リスト → グラフ → 表カードの順です。'],
      ['アクセシビリティ:', '完全なキーボード操作(/ 検索、K KEV、W ウォッチリスト、? ショートカット)、見やすいフォーカス表示、各グラフの自動要約文と「データを表で見る」。色だけで意味を伝えず、アイコン・パターン・テキストを併用しています。'],
      ['状態:', 'スケルトン読み込み、結果なし(フィルターのリセットボタン付き)、エラー(最後に成功したデータまたは再試行)。'],
    ],
    testH: 'ユーザーテストの結果', change: '変更点:', before: '変更前', after: '変更後',
    resultH: '成果',
    result: ['データは毎朝自動で更新され、最終更新時刻とデータ源へのリンクが常に表示されます。', 'PWA としてインストール可能で、TR/EN の2言語に対応しています。'],
    lighthouse: (a, p) => `Lighthouse(モバイル):アクセシビリティ ${a}、パフォーマンス ${p}。`,
    cv: 'CV:NVD CVE API 2.0 と CISA KEV のデータを GitHub Actions で毎日取得し、ウォッチリストと説明可能な優先度スコアで重大な脆弱性を並べるアクセシブルな SOC ダッシュボードを開発(ECharts、PWA、TR/EN)。',
    weekH: 'もう1週間あったら',
    week: [
      'FIRST EPSS の悪用確率スコアを優先度スコアに加える。',
      '組織の資産台帳(CPE)からウォッチリストを自動生成する。',
      'KEV の対応期限のカレンダー表示とメール / Teams 通知。',
      'ブラウザーのウォッチリストを、必要に応じてチームパネルの共有リストと同期する。',
    ],
    secLabel: 'セキュリティとインフラ', secH: 'アーキテクチャと信頼境界',
    secAlt: 'アーキテクチャ図:ユーザー、Entra ID、Azure Static Web Apps、Functions API、Table Storage、Application Insights、GitHub Actions、データ源の間のデータフローと信頼境界',
    ctrlH: '主な3つの対策',
    ctrl: [
      ['ゼロトラストアクセスとロール', 'チームパネル(/panel/)へのすべてのリクエストは Microsoft Entra ID + MFA で認証されます。招待で閲覧者またはアナリストのロールを付与された人だけが閲覧でき、編集はアナリストのみです。API はリクエストごとにロールを再確認し、ロールのないアカウントには 403 を返します。'],
      ['キーを持たないクライアントと最小権限', 'クライアントにもリポジトリにもキーはありません。NVD のキーは GitHub Actions 内でのみ使用し、テーブルへのアクセスは必要な操作だけを許可する期限付き SAS で行います。CI/CD は最小権限で動作し、gitleaks、npm audit、CodeQL、Dependabot を有効にしています。'],
      ['厳格なヘッダー、ログとアラート', 'HTTPS + HSTS、インラインコードなしの CSP(グラフライブラリもローカル配信)、frame-ancestors none などのヘッダー。すべてのアクセス判定は仮名でログに記録され、拒否が繰り返されるとメールでアラートが届きます。'],
    ],
    secTestH: 'テスト結果',
    verified: 'ロールのないアカウント → 403、閲覧者の書き込み要求 → 403。試行はログに DENY として記録され、アラートが発報しました。',
    zap: (a, b) => `OWASP ZAP ベースラインの警告:${a} → ${b}`,
  },
};

const kart = { marginTop: 22 };
const gorsel = { width: '100%', height: 'auto', borderRadius: 10, background: '#fff', marginTop: 12 };

function Icerik({ dil }) {
  const m = METIN[dil];
  const s = SONUCLAR;
  const guvenlikSonuc = [
    s.dogrulandi && m.verified,
    s.zapOnce && s.zapSonra && m.zap(s.zapOnce, s.zapSonra),
    s.observatory && `Mozilla Observatory: ${s.observatory}`,
    s.securityheaders && `securityheaders.com: ${s.securityheaders}`,
  ].filter(Boolean);
  const test = TEST && TEST[dil];

  return (
    <>
      <div className="page-head rv">
        <p className="eyebrow">{m.eyebrow}</p>
        <h1>{m.h1}</h1>
        <p>{m.lead}</p>
        <div className="links" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 14 }}>
          {s.urun && <a className="btn pri" href={s.urun} target="_blank" rel="noopener">{m.live}</a>}
          <a className="rep" href="https://github.com/kaansemihkurt/zafiyet-panosu" target="_blank" rel="noopener"><GithubIkon /><span>{m.gh}</span></a>
          <Link className="rep" href="/projeler/mitre-attack">{m.related}</Link>
        </div>
      </div>

      <section className="card rv" style={kart}>
        <h2>{m.problemH}</h2>
        <p>{m.problem}</p>
      </section>

      <section className="card rv" style={kart}>
        <h2>{m.userH}</h2>
        <p>{m.user}</p>
        <ul>{m.userList.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>

      <section className="card rv" style={kart}>
        <h2>{m.pipeH}</h2>
        <img src="/img/zafiyet-veri-hatti.png" width="1800" height="345" loading="lazy" style={gorsel} alt={m.pipeAlt} />
        <ul style={{ marginTop: 14 }}>{m.pipe.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>

      {EKRANLAR.length > 0 && (
        <section className="card rv" style={kart}>
          <h2>{m.screensH}</h2>
          <div className="pgrid">
            {EKRANLAR.map((e) => (
              <figure key={e.src} style={{ margin: 0 }}>
                <img src={e.src} alt={(e.alt && e.alt[dil]) || ''} loading="lazy" style={{ width: '100%', height: 'auto', borderRadius: 10 }} />
              </figure>
            ))}
          </div>
        </section>
      )}

      {VIDEO && (
        <section className="card rv" style={kart}>
          <h2>{m.videoH}</h2>
          <video controls preload="metadata" style={{ width: '100%', borderRadius: 10, marginTop: 12 }}>
            <source src={VIDEO.src} type="video/webm" />
            {VIDEO.vtt && <track kind="captions" src={VIDEO.vtt} srcLang="tr" label={m.videoLang} default />}
          </video>
        </section>
      )}

      <section className="card rv" style={kart}>
        <h2>{m.designH}</h2>
        <ul>{m.design.map(([b, t]) => <li key={b}><b>{b}</b> {t}</li>)}</ul>
      </section>

      {test && (
        <section className="card rv" style={kart}>
          <h2>{m.testH}</h2>
          <p>{test.ozet}</p>
          {test.degisiklik && <p><b>{m.change}</b> {test.degisiklik}</p>}
          {TEST.once && TEST.sonra && (
            <div className="pgrid">
              <figure style={{ margin: 0 }}><img src={TEST.once} alt={m.before} loading="lazy" style={{ width: '100%', borderRadius: 10 }} /><figcaption className="hint">{m.before}</figcaption></figure>
              <figure style={{ margin: 0 }}><img src={TEST.sonra} alt={m.after} loading="lazy" style={{ width: '100%', borderRadius: 10 }} /><figcaption className="hint">{m.after}</figcaption></figure>
            </div>
          )}
        </section>
      )}

      <section className="card rv" style={kart}>
        <h2>{m.resultH}</h2>
        <ul>
          <li>{m.result[0]}</li>
          {s.lighthouseA11y && s.lighthousePerf && <li>{m.lighthouse(s.lighthouseA11y, s.lighthousePerf)}</li>}
          <li>{m.result[1]}</li>
        </ul>
        <p className="hint" style={{ marginTop: 10 }}>{m.cv}</p>
      </section>

      <section className="card rv" style={kart}>
        <h2>{m.weekH}</h2>
        <ul>{m.week.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>

      <section id={dil === 'tr' ? 'guvenlik' : `guvenlik-${dil}`} className="card rv" style={kart}>
        <p className="eyebrow">{m.secLabel}</p>
        <h2>{m.secH}</h2>
        <img src="/img/zafiyet-mimari.png" width="2384" height="995" loading="lazy" style={gorsel} alt={m.secAlt} />
        <h3 style={{ marginTop: 22 }}>{m.ctrlH}</h3>
        <div className="pgrid">
          {m.ctrl.map(([h, d]) => (
            <article key={h} className="card pcard">
              <h3>{h}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
        {guvenlikSonuc.length > 0 && (
          <>
            <h3 style={{ marginTop: 22 }}>{m.secTestH}</h3>
            <ul>{guvenlikSonuc.map((x) => <li key={x}>{x}</li>)}</ul>
          </>
        )}
        <ul className="tags"><li className="tag">Azure Static Web Apps</li><li className="tag">Entra ID + MFA</li><li className="tag">Bicep</li><li className="tag">GitHub Actions</li><li className="tag">OWASP ZAP</li></ul>
      </section>
    </>
  );
}

export default function ZafiyetPanosuSayfasi() {
  return (
    <main id="main" className="wrap">
      <div className="dil-tr" lang="tr"><Icerik dil="tr" /></div>
      <div className="dil-en" lang="en"><Icerik dil="en" /></div>
      <div className="dil-ja" lang="ja"><Icerik dil="ja" /></div>
    </main>
  );
}
