'use client';

import { useEffect, useState } from 'react';

// Sitede seçili dili (tr / en / ja) verir; dil düğmesine basılınca güncellenir.
export function useDil() {
  const [dil, setDil] = useState('tr');
  useEffect(() => {
    setDil(document.documentElement.lang || 'tr');
    const dinle = (e) => setDil(e.detail);
    document.addEventListener('langchange', dinle);
    return () => document.removeEventListener('langchange', dinle);
  }, []);
  return dil;
}

// Kaydın seçili dildeki alanını verir (ör. soru_en); boşsa Türkçesine düşer.
export function dildeMetin(kayit, alan, dil) {
  if (dil && dil !== 'tr') {
    const v = kayit[`${alan}_${dil}`];
    if (v) return v;
  }
  return kayit[alan];
}
