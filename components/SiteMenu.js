'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BAGLANTILAR = [
  { href: '/', anahtar: 'nav.home', metin: 'Ana sayfa' },
  { href: '/projeler', anahtar: 'nav.projects', metin: 'Projeler' },
  { href: '/sss', anahtar: 'nav.faq', metin: 'SSS' },
  { href: '/iletisim', anahtar: 'nav.contact', metin: 'İletişim' },
];

export default function SiteMenu() {
  const yol = usePathname();
  return (
    <ul className="nav">
      {BAGLANTILAR.map((b) => (
        <li key={b.href}>
          <Link href={b.href} aria-current={yol === b.href ? 'page' : undefined} data-i={b.anahtar}>
            {b.metin}
          </Link>
        </li>
      ))}
    </ul>
  );
}
