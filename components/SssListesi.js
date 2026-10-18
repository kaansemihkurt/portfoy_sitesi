'use client';

import { useRef } from 'react';
import { sssTiklandi } from '@/app/(site)/sss/actions';

// Açılır-kapanır soru listesi. Bir soru ilk kez açıldığında tıklanma sayısı artırılır.
export default function SssListesi({ sorular }) {
  const sayilanlar = useRef(new Set());

  function acildi(e, id) {
    if (!e.currentTarget.open || sayilanlar.current.has(id)) return;
    sayilanlar.current.add(id);
    sssTiklandi(id).catch(() => {});
  }

  return (
    <div className="sss">
      {sorular.map((s) => (
        <details key={s.id} onToggle={(e) => acildi(e, s.id)}>
          <summary>{s.soru}</summary>
          {s.cevap ? (
            <p className="cevap">{s.cevap}</p>
          ) : (
            <p className="cevap bos" data-i="faq.noanswer">Bu soru henüz cevaplanmadı.</p>
          )}
        </details>
      ))}
    </div>
  );
}
