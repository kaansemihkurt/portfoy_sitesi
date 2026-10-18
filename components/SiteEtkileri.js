'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { D, DILLER, ceviri } from '@/lib/sozluk';

// Eski sitedeki i18n.js + main.js'in React karşılığı:
// dil seçimi (TR/EN/JA), tema düğmesi, kaydırınca beliren bölümler, yıl.

const SAYFA = { '/': 'index', '/projeler': 'projects', '/iletisim': 'contact', '/sss': 'sss', '/aydinlatma-metni': 'kvkk' };

function dilSec() {
  const q = new URLSearchParams(location.search).get('lang');
  if (q && DILLER.includes(q)) return q;
  try {
    const s = localStorage.getItem('lang');
    if (s && DILLER.includes(s)) return s;
  } catch (e) {}
  return 'tr';
}

function dilUygula(dil, kaydet) {
  const kok = document.documentElement;
  kok.lang = dil;
  document.querySelectorAll('[data-i]').forEach((el) => {
    el.textContent = ceviri(el.getAttribute('data-i'), dil);
  });
  document.querySelectorAll('[data-i-attr]').forEach((el) => {
    el.getAttribute('data-i-attr').split(';').forEach((p) => {
      const a = p.split(':');
      if (a.length === 2) el.setAttribute(a[0], ceviri(a[1], dil));
    });
  });
  const sayfa = SAYFA[location.pathname];
  if (sayfa && D.tr['meta.' + sayfa + '.title']) document.title = ceviri('meta.' + sayfa + '.title', dil);
  document.querySelectorAll('[data-lang]').forEach((b) => {
    b.setAttribute('aria-pressed', b.getAttribute('data-lang') === dil ? 'true' : 'false');
  });
  if (kaydet) {
    try { localStorage.setItem('lang', dil); } catch (e) {}
  }
  document.dispatchEvent(new CustomEvent('langchange', { detail: dil }));
}

function belirmeyiBaslat() {
  const els = document.querySelectorAll('.rv:not(.in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return () => {};
  }
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

export default function SiteEtkileri() {
  const yol = usePathname();

  // Dil ve tema düğmeleri (bir kez bağlanır)
  useEffect(() => {
    function tikla(e) {
      const dilBtn = e.target.closest('[data-lang]');
      if (dilBtn) dilUygula(dilBtn.getAttribute('data-lang'), true);
      if (e.target.closest('#theme')) {
        const kok = document.documentElement;
        const sonraki = kok.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        if (sonraki === 'dark') kok.removeAttribute('data-theme');
        else kok.setAttribute('data-theme', 'light');
        try { localStorage.setItem('theme', sonraki); } catch (err) {}
      }
    }
    document.addEventListener('click', tikla);
    return () => document.removeEventListener('click', tikla);
  }, []);

  // Her sayfa değişiminde: seçili dili yeni sayfaya uygula, bölümleri belirt.
  useEffect(() => {
    dilUygula(dilSec(), false);
    const yr = document.getElementById('yr');
    if (yr) yr.textContent = new Date().getFullYear();
    return belirmeyiBaslat();
  }, [yol]);

  return null;
}
