'use client';

import { useEffect, useState } from 'react';
import { ceviri } from '@/lib/sozluk';

// İstemci bileşenlerinde, React'in kendisinin çizdiği değişken metinler için (ör. "Gönderiliyor…").
export function useCeviri() {
  const [dil, setDil] = useState('tr');
  useEffect(() => {
    setDil(document.documentElement.lang || 'tr');
    const dinle = (e) => setDil(e.detail);
    document.addEventListener('langchange', dinle);
    return () => document.removeEventListener('langchange', dinle);
  }, []);
  return (k) => ceviri(k, dil);
}
