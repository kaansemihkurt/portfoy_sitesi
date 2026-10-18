import Link from 'next/link';
import SiteMenu from '@/components/SiteMenu';
import SiteEtkileri from '@/components/SiteEtkileri';
import { AyIkon, GunesIkon } from '@/components/Ikonlar';

export default function SiteLayout({ children }) {
  return (
    <>
      <a className="skip" href="#main" data-i="skip">İçeriğe geç</a>
      <header className="top">
        <div className="wrap">
          <Link className="brand" href="/"><span className="mark" aria-hidden="true">K</span>Kaan Semih Kurt</Link>
          <nav aria-label="Ana menü" data-i-attr="aria-label:nav.main">
            <SiteMenu />
          </nav>
          <div className="tools">
            <div className="lang" role="group" aria-label="Dil" data-i-attr="aria-label:lang.label">
              <button type="button" data-lang="tr" lang="tr" aria-pressed="true">TR</button>
              <button type="button" data-lang="en" lang="en" aria-pressed="false">EN</button>
              <button type="button" data-lang="ja" lang="ja" aria-pressed="false">日本語</button>
            </div>
            <button type="button" className="ic" id="theme" aria-label="Temayı değiştir" data-i-attr="aria-label:theme.toggle">
              <AyIkon />
              <GunesIkon />
            </button>
          </div>
        </div>
      </header>

      {children}

      <footer>
        <div className="wrap">
          <span>© <span id="yr">2026</span> Kaan Semih Kurt · <span data-i="footer.loc">Şehzadeler, Manisa</span></span>
          <span className="alt-linkler">
            <Link href="/aydinlatma-metni" data-i="footer.kvkk">Aydınlatma Metni</Link>
            <a href="https://github.com/kaansemihkurt" target="_blank" rel="noopener">GitHub</a>
          </span>
        </div>
      </footer>
      <SiteEtkileri />
    </>
  );
}
