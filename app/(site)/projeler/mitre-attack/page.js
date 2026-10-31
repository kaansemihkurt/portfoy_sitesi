import { GithubIkon } from '@/components/Ikonlar';

export const metadata = {
  title: 'MITRE ATT&CK Ağ Analizi | Kaan Semih Kurt',
  description: 'Tehdit istihbaratında iki parçalı ağ analizi: 174 siber tehdit grubu ve 515 saldırı tekniğinden oluşan etkileşimli ağ.',
};

// Sosyal Ağ Analizi dönem ödevi — etkileşimli ağ portföye gömülü (iframe).
// Ağ sayfası tek dosyadır: public/ag/mitre-attack.html (Cytoscape.js ve veri içine gömülü).
export default function MitreAttackSayfasi() {
  return (
    <main id="main" className="wrap">
      <div className="page-head rv">
        <p className="eyebrow" data-i="mitre.eyebrow">SOSYAL AĞ ANALİZİ · MITRE ATT&amp;CK v20.0</p>
        <h1 data-i="p0.h">Tehdit İstihbaratında İki Parçalı Ağ Analizi (MITRE ATT&amp;CK)</h1>
        <p data-i="mitre.lead">Düğümlere tıklayın, grup veya teknik arayın, toplulukları filtreleyin. Ağın kendi TR/EN düğmesi sağ üst köşededir.</p>
      </div>
      <div className="card rv" style={{ marginTop: 28, padding: 0, overflow: 'hidden' }}>
        <iframe
          src="/ag/mitre-attack.html"
          title="MITRE ATT&CK tehdit grubu – teknik ağı"
          loading="lazy"
          style={{ width: '100%', height: '78vh', minHeight: 560, border: 0, display: 'block' }}
        />
      </div>
      <div className="links rv" style={{ marginTop: 18, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <a className="rep" href="/ag/mitre-attack.html" target="_blank" rel="noopener" data-i="mitre.full">Tam ekran aç ↗</a>
        <a className="rep" href="https://github.com/kaansemihkurt/mitre-attack-network-analysis" target="_blank" rel="noopener">
          <GithubIkon /><span data-i="p0.gh">Projeyi GitHub&apos;da gör</span>
        </a>
      </div>
    </main>
  );
}
