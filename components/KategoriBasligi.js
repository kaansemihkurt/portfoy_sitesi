'use client';

import { useDil, dildeMetin } from './useDil';

// SSS sayfasındaki kategori başlığını seçili dilde gösterir.
export default function KategoriBasligi({ kategori }) {
  const dil = useDil();
  return <h2>{dildeMetin(kategori, 'ad', dil)}</h2>;
}
