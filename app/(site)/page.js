import Link from 'next/link';
import { sql } from '@/lib/db';
import SssListesi from '@/components/SssListesi';
import { GithubIkon } from '@/components/Ikonlar';

export const dynamic = 'force-dynamic';

export default async function AnaSayfa() {
  // Görev 3.2 sorgusu (sıra numarasına göre ilk 5); sitede yalnızca yayındaki kayıtlar gösterilir.
  const oneCikanlar = await sql`
    SELECT id, soru, cevap, soru_en, cevap_en, soru_ja, cevap_ja, sira
    FROM sss
    WHERE yayinda = true
    ORDER BY sira ASC
    LIMIT 5`;

  return (
    <main id="main" className="wrap">
      <div className="hero">
        <div className="rv">
          <p className="eyebrow" data-i="hero.eyebrow">MCBÜ · Son sınıf öğrencisi</p>
          <h1>Kaan Semih <em>Kurt</em></h1>
          <p className="kana" lang="ja" data-i="hero.kana"></p>
          <p className="role" data-i="hero.role">Büyük Veri Analistliği Öğrencisi</p>
          <p className="lead" data-i="hero.lead">Veri analizi, yazılım ve donanım alanlarında çalışan; öğrenmeye açık ve proje odaklı biriyim.</p>
          <div className="actions">
            <Link className="btn pri" href="/projeler" data-i="hero.cta1">Projelerimi gör →</Link>
            <a className="btn" href="#hakkimda" data-i="hero.cta2">Hakkımda</a>
          </div>
        </div>
        <aside className="card glance rv">
          <p className="gt" data-i="glance.title">Bir bakışta</p>
          <dl>
            <div className="row"><dt data-i="glance.k1">Program</dt><dd data-i="glance.v1">Büyük Veri Analistliği (ön lisans)</dd></div>
            <div className="row"><dt data-i="glance.k2">Üniversite</dt><dd data-i="glance.v2">Manisa Celal Bayar Üniversitesi</dd></div>
            <div className="row"><dt data-i="glance.k3">Konum</dt><dd data-i="glance.v3">Şehzadeler, Manisa</dd></div>
            <div className="row"><dt data-i="glance.k4">Odak</dt><dd data-i="glance.v4">Veri analizi · Yazılım · Donanım</dd></div>
          </dl>
        </aside>
      </div>

      <div className="stats rv">
        <div><b data-i="stat.1.n">9 ay</b><span data-i="stat.1.l">endüstriyel staj</span></div>
        <div><b>3</b><span data-i="stat.2.l">proje</span></div>
        <div><b>3</b><span data-i="stat.3.l">programlama dili</span></div>
      </div>

      <section className="section" id="hakkimda">
        <div className="sec-head rv"><span className="n">01</span><h2 data-i="about.title">Hakkımda</h2></div>
        <div className="about rv">
          <p className="pull" data-i="about.q">Mühendislik temelleri, analitik düşünme.</p>
          <div>
            <p data-i="about.p1">Manisa Celal Bayar Üniversitesi Büyük Veri Analistliği programının son sınıfındayım. Lisede makine teknikerliği okuyarak edindiğim mühendislik temellerini ve analitik düşünme becerimi, havacılık sanayisindeki 9 aylık stajımla profesyonel iş ortamına taşıdım.</p>
            <p data-i="about.p2">Python ve C# ile yazılım projeleri geliştiriyorum. Donanım mimarisi bilgimle sistem performansını artıracak çözümler üretebiliyorum. Teknik problem çözmeyi ve yeni şeyler öğrenmeyi seviyorum.</p>
          </div>
        </div>
      </section>

      <section className="section" id="yolculuk">
        <div className="sec-head rv"><span className="n">02</span><h2 data-i="journey.title">Eğitim ve deneyim</h2></div>
        <div className="tl">
          <div className="ti now rv"><i className="dot"></i><article className="card lift"><p className="d" data-i="j1.date">ŞİMDİ · EĞİTİM</p><h3 data-i="j1.h">Büyük Veri Analistliği (Ön Lisans)</h3><p className="sub" data-i="j1.s">Manisa Celal Bayar Üniversitesi · Devam ediyor, son yıl</p></article></div>
          <div className="ti rv"><i className="dot"></i><article className="card lift"><p className="d" data-i="j2.date">2024 · EĞİTİM</p><h3 data-i="j2.h">Makine Teknikerliği</h3><p className="sub" data-i="j2.s">MOSTEM Mesleki ve Teknik Anadolu Lisesi</p></article></div>
          <div className="ti rv"><i className="dot"></i><article className="card lift"><p className="d" data-i="j3.date">2023–2024 · DENEYİM (9 AY)</p><h3 data-i="j3.h">Makine Teknikeri (Stajyer)</h3><p className="sub" data-i="j3.s">HMS Uçak ve Havacılık Sanayi, Manisa</p>
            <ul>
              <li data-i="j3.b1">Lise son sınıfta, havacılık ve uzay sanayisinin yüksek kalite standartlarındaki üretim süreçlerinde görev aldım.</li>
              <li data-i="j3.b2">Fabrika ortamında endüstriyel disiplin, iş güvenliği ve takım çalışması konularında doğrudan deneyim kazandım.</li>
            </ul>
          </article></div>
        </div>
      </section>

      <section className="section" id="yetenekler">
        <div className="sec-head rv"><span className="n">03</span><h2 data-i="skills.title">Yetenekler</h2></div>
        <div className="skills">
          <div className="card lift rv"><h3 data-i="sk1.h">Yazılım ve programlama</h3>
            <ul className="tags"><li className="tag s" data-i="sk1.t1">Python · İyi</li><li className="tag s" data-i="sk1.t2">C# · İyi</li><li className="tag" data-i="sk1.t3">Java · Temel</li></ul></div>
          <div className="card lift rv"><h3 data-i="sk2.h">Bilgisayar ve donanım</h3>
            <ul className="tags"><li className="tag" data-i="sk2.t1">Donanım mimarisi</li><li className="tag" data-i="sk2.t2">Parça uyumluluğu</li><li className="tag" data-i="sk2.t3">Sistem toplama</li><li className="tag" data-i="sk2.t4">Darboğaz (bottleneck) analizi</li><li className="tag" data-i="sk2.t5">Performans optimizasyonu</li><li className="tag" data-i="sk2.t6">Arıza tespiti</li><li className="tag" data-i="sk2.t7">Donanım iyileştirme</li></ul></div>
          <div className="card lift rv"><h3 data-i="sk3.h">Araçlar</h3>
            <ul className="tags"><li className="tag">Excel</li><li className="tag">Word</li><li className="tag">PowerPoint</li></ul>
            <p className="note" data-i="sk3.note">Raporlama, veri tablolama ve proje sunumu için ileri düzeyde.</p></div>
        </div>
      </section>

      <section className="section" id="proje">
        <div className="sec-head rv"><span className="n">04</span><h2 data-i="feat.title">Öne çıkan proje</h2></div>
        <article className="card feature rv">
          <a className="thumb-link" href="https://kaansemihkurt.github.io/tufe-enflasyon/" target="_blank" rel="noopener">
            <img className="thumb" src="/img/enflasyon-onizleme.png" width="900" height="470" loading="lazy" alt="Enflasyon veri hikâyesinin önizlemesi: 13 harcama grubunun fiyat artışı, eğitim %1.281, giyim %209, genel TÜFE %765" data-i-attr="alt:p1.alt" />
          </a>
          <div className="body">
            <p className="eyebrow" data-i="p1.label">ÖNE ÇIKAN PROJE</p>
            <h3 data-i="p1.h">Enflasyon Ortalaması Neyi Saklıyor?</h3>
            <p style={{ marginTop: 14 }} data-i="p1.d">Kullanıcı Arayüzü Tasarımı dersi için hazırladığım proje. TÜİK&apos;in TÜFE verilerini kullanarak 13 harcama grubunun 2020&apos;den 2026&apos;ya nasıl farklı hızlarda pahalandığını anlatan, kaydırmayla ilerleyen interaktif bir veri hikâyesi.</p>
            <ul>
              <li data-i="p1.b1">Python (pandas) ile iki TÜİK dosyasını birleştirip tüm serileri Aralık 2020 = 100 olacak şekilde yeniden tabanladım; sonuçları TÜİK&apos;in yayımladığı tabloyla doğruladım.</li>
              <li data-i="p1.b2">D3.js ile kaydırmayla canlanan çizgi grafiği, sıralı çubuk grafik ve treemap ile kullanıcının dönem ile grup seçip kendi karşılaştırmasını yapabildiği keşif aracını kodladım.</li>
            </ul>
            <ul className="tags"><li className="tag">Python</li><li className="tag">D3.js</li><li className="tag" data-i="p1.t3">Veri hikâyeciliği</li><li className="tag">TÜİK</li></ul>
            <div className="links">
              <a className="rep" href="https://kaansemihkurt.github.io/tufe-enflasyon/" target="_blank" rel="noopener" data-i="p1.live">Canlı siteyi aç →</a>
              <a className="rep" href="https://github.com/kaansemihkurt/tufe-enflasyon" target="_blank" rel="noopener"><GithubIkon /><span data-i="p1.gh">Projeyi GitHub&apos;da gör</span></a>
            </div>
          </div>
        </article>
        <p style={{ marginTop: 20 }}><Link className="rep" href="/projeler" data-i="feat.all">Tüm projeleri gör →</Link></p>
      </section>

      <section className="section" id="sss">
        <div className="sec-head rv"><span className="n">05</span><h2 data-i="faq.feat">Öne çıkan sorular</h2></div>
        {oneCikanlar.length > 0 ? (
          <div className="rv"><SssListesi sorular={oneCikanlar} /></div>
        ) : (
          <p className="note" data-i="faq.empty">Henüz yayında bir soru yok.</p>
        )}
        <p style={{ marginTop: 20 }}><Link className="rep" href="/sss" data-i="faq.all">Tüm soruları gör →</Link></p>
      </section>

      <section className="cta rv">
        <div>
          <h2 data-i="cta.title">Birlikte çalışalım.</h2>
          <p data-i="cta.text">Bir proje fikrin ya da sorun varsa bana yazabilirsin.</p>
        </div>
        <Link className="btn pri" href="/iletisim" data-i="cta.btn">İletişime geç →</Link>
      </section>
    </main>
  );
}
