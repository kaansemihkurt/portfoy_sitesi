'use client';

import { useRef } from 'react';
import { sssTiklandi } from '@/app/(site)/sss/actions';
import { useDil, dildeMetin } from './useDil';

// Açılır-kapanır soru listesi. Sorular seçili dilde gösterilir (çevirisi yoksa Türkçe).
// Bir soru ilk kez açıldığında tıklanma sayısı artırılır.
export default function SssListesi({ sorular }) {
  const dil = useDil();
  const sayilanlar = useRef(new Set());

  function acildi(e, id) {
    if (!e.currentTarget.open || sayilanlar.current.has(id)) return;
    sayilanlar.current.add(id);
    sssTiklandi(id).catch(() => {});
  }

  return (
    <div className="sss">
      {sorular.map((s) => {
        const cevap = dildeMetin(s, 'cevap', dil);
        return (
          <details key={s.id} onToggle={(e) => acildi(e, s.id)}>
            <summary>{dildeMetin(s, 'soru', dil)}</summary>
            {cevap ? (
              <p className="cevap">{cevap}</p>
            ) : (
              <p className="cevap bos" data-i="faq.noanswer">Bu soru henüz cevaplanmadı.</p>
            )}
          </details>
        );
      })}
    </div>
  );
}
