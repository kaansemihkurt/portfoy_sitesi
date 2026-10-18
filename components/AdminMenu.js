'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BAGLANTILAR = [
  { href: '/admin', metin: 'Panel' },
  { href: '/admin/sss', metin: 'SSS' },
  { href: '/admin/mesajlar', metin: 'Mesajlar' },
  { href: '/admin/guvenlik', metin: 'Güvenlik' },
];

export default function AdminMenu() {
  const yol = usePathname();
  return (
    <ul className="adm-nav">
      {BAGLANTILAR.map((b) => {
        const aktif = b.href === '/admin' ? yol === '/admin' : yol.startsWith(b.href);
        return (
          <li key={b.href}>
            <Link href={b.href} aria-current={aktif ? 'page' : undefined}>{b.metin}</Link>
          </li>
        );
      })}
    </ul>
  );
}
