import { GithubIkon } from '@/components/Ikonlar';

export const metadata = {
  title: 'Projeler | Kaan Semih Kurt',
  description: 'Kaan Semih Kurt - Büyük veri analizi ve yazılım projeleri.',
};

export default function ProjelerSayfasi() {
  return (
    <main id="main" className="wrap">
      <div className="page-head rv">
        <p className="eyebrow">01 / 04</p>
        <h1 data-i="proj.title">Projeler</h1>
        <p data-i="proj.lead">Ders, bitirme ve yazılım çalışmalarımdan seçmeler.</p>
      </div>
      <div style={{ marginTop: 34 }}>
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

        <div className="pgrid">
          <article className="card lift pcard rv">
            <p className="label" data-i="p2.label">BİTİRME PROJESİ</p>
            <h3 data-i="p2.h">İklim Şartlarının Üzüm Tarım Rekoltesine Etkisi</h3>
            <p data-i="p2.d">İklim faktörlerinin üzüm hasat verimliliğine etkisini inceleyen büyük veri projesi.</p>
            <ul><li data-i="p2.b1">Python ile veri setlerini işledim.</li><li data-i="p2.b2">Geçmiş verileri modelleyip tarımsal verim analizi yaptım.</li></ul>
            <ul className="tags"><li className="tag">Python</li><li className="tag" data-i="p2.t2">Veri analizi</li><li className="tag" data-i="p2.t3">Modelleme</li></ul>
            <div className="foot"><span className="off" aria-disabled="true"><GithubIkon /><span data-i="off">Bu projeye şuan erişilemiyor.</span></span></div>
          </article>
          <article className="card lift pcard rv">
            <p className="label" data-i="p3.label">YAZILIM PROJESİ</p>
            <h3 data-i="p3.h">Oyun İçi Eklenti (Plugin) Geliştirme</h3>
            <p data-i="p3.d">Çok oyunculu bir oyun platformu için mimarisini kurup sıfırdan kodladığım iki sistem eklentisi.</p>
            <ul>
              <li><strong data-i="p3.b1l">Market sistemi:</strong> <span data-i="p3.b1">Oyuncuların oyun içi ekonomide ticaret yapmasını sağlayan dinamik altyapı.</span></li>
              <li><strong data-i="p3.b2l">Rütbe sistemi:</strong> <span data-i="p3.b2">Oyuncu ilerlemesini takip eden ve seviyelendiren hiyerarşik kayıt yapısı.</span></li>
            </ul>
            <ul className="tags"><li className="tag" data-i="p3.t1">Çok oyunculu</li><li className="tag" data-i="p3.t2">Market</li><li className="tag" data-i="p3.t3">Rütbe</li></ul>
            <div className="foot"><span className="off" aria-disabled="true"><GithubIkon /><span data-i="off">Bu projeye şuan erişilemiyor.</span></span></div>
          </article>
        </div>

        <div className="card more rv">
          <p data-i="more.t">Daha fazla proje ve kod için GitHub profilime göz atabilirsin.</p>
          <a className="btn pri" href="https://github.com/kaansemihkurt" target="_blank" rel="noopener"><GithubIkon size={18} /><span data-i="more.b">GitHub profilim</span></a>
        </div>
      </div>
    </main>
  );
}
