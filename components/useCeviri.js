'use client';

import { ceviri } from '@/lib/sozluk';
import { useDil } from './useDil';

// İstemci bileşenlerinde, React'in kendisinin çizdiği değişken metinler için (ör. "Gönderiliyor…").
export function useCeviri() {
  const dil = useDil();
  return (k) => ceviri(k, dil);
}
