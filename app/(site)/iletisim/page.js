import IletisimFormu from '@/components/IletisimFormu';
import { GithubIkon } from '@/components/Ikonlar';

export const metadata = {
  title: 'İletişim | Kaan Semih Kurt',
  description: 'Kaan Semih Kurt ile iletişime geç.',
};

export default function IletisimSayfasi() {
  return (
    <main id="main" className="wrap">
      <div className="page-head rv">
        <p className="eyebrow">03 / 04</p>
        <h1 data-i="c.title">İletişim</h1>
        <p data-i="c.sub">Formu doldur, mesajın doğrudan bana ulaşsın.</p>
      </div>
      <div className="contact" style={{ marginTop: 34 }}>
        <aside className="side card rv">
          <h3 data-i="c.side">Diğer yollar</h3>
          <a className="rep" href="https://github.com/kaansemihkurt" target="_blank" rel="noopener"><GithubIkon /><span data-i="more.b">GitHub profilim</span></a>
        </aside>
        <IletisimFormu />
      </div>
    </main>
  );
}
