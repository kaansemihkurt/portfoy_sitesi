import Link from 'next/link';
import { oturumGerekli } from '@/lib/auth';
import { cikisYap } from '@/app/giris/actions';
import AdminMenu from '@/components/AdminMenu';

export const metadata = { title: 'Yönetim paneli | Kaan Semih Kurt', robots: { index: false } };

export default async function AdminLayout({ children }) {
  // Not: Layout, sayfalar arası geçişte yeniden çalışmayabilir. Bu yüzden
  // her sayfa ve her Server Action ayrıca oturumGerekli() çağırır.
  const yonetici = await oturumGerekli();

  return (
    <>
      <header className="adm-ust">
        <div className="wrap">
          <Link className="brand" href="/admin"><span className="mark" aria-hidden="true">K</span>Panel</Link>
          <span className="adm-etiket">Yönetici</span>
          <AdminMenu />
          <span className="adm-kim">{yonetici.eposta}</span>
          <Link className="kbtn" href="/" target="_blank">Siteyi aç ↗</Link>
          <form action={cikisYap}>
            <button type="submit" className="kbtn">Çıkış</button>
          </form>
        </div>
      </header>
      <main className="wrap adm">{children}</main>
    </>
  );
}
