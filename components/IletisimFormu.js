'use client';

import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { mesajGonder } from '@/app/(site)/iletisim/actions';
import { useCeviri } from './useCeviri';

export default function IletisimFormu() {
  const [durum, gonder, bekliyor] = useActionState(mesajGonder, null);
  const t = useCeviri();
  const formRef = useRef(null);
  const [uzunluk, setUzunluk] = useState(0);
  const [bildirim, setBildirim] = useState(null);

  useEffect(() => {
    if (!durum) return;
    if (durum.durum === 'ok') {
      formRef.current?.reset();
      setUzunluk(0);
      setBildirim({ tur: 'success', anahtar: 'f.ok' });
    } else {
      setBildirim({ tur: 'error', anahtar: durum.kod });
    }
    const zamanlayici = setTimeout(() => setBildirim(null), 5500);
    return () => clearTimeout(zamanlayici);
  }, [durum]);

  return (
    <>
      <form
        ref={formRef}
        className="card rv"
        onSubmit={(e) => {
          // Formu kendimiz gönderiyoruz ki hata durumunda yazılanlar silinmesin.
          e.preventDefault();
          const veri = new FormData(e.currentTarget);
          startTransition(() => gonder(veri));
        }}
      >
        <div className="fld full">
          <label htmlFor="ad_soyad" data-i="f.adsoyad">Ad soyad</label>
          <input id="ad_soyad" name="ad_soyad" type="text" placeholder="Adın ve soyadın" data-i-attr="placeholder:f.adsoyad.ph" autoComplete="name" maxLength={100} required />
        </div>
        <div className="fld full">
          <label htmlFor="eposta" data-i="f.email">E-posta adresi</label>
          <input id="eposta" name="eposta" type="email" placeholder="ornek@mail.com" autoComplete="email" maxLength={254} required />
        </div>
        <div className="fld full">
          <label htmlFor="mesaj" data-i="f.mesaj">Detaylı mesaj</label>
          <textarea id="mesaj" name="mesaj" placeholder="Merhaba Kaan, ..." data-i-attr="placeholder:f.mesaj.ph" maxLength={1000} required onChange={(e) => setUzunluk(e.target.value.length)} />
          <span className="count" aria-hidden="true">{uzunluk} / 1000</span>
        </div>
        <label className="onay">
          <input type="checkbox" name="kvkk_onay" required />
          <span data-i="f.kvkk">Aydınlatma Metni&apos;ni okudum; iletişim bilgilerimin yurt dışındaki sunucularda işlenmesine açık rıza veriyorum.</span>
        </label>
        <p className="onay-link"><Link href="/aydinlatma-metni" target="_blank" data-i="f.kvkk.link">Aydınlatma Metni&apos;ni oku →</Link></p>
        <input className="hp" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="btn pri" type="submit" disabled={bekliyor}>{bekliyor ? t('f.sending') : t('f.send')}</button>
        <p className="hint" data-i="f.hint">Tüm alanlar zorunludur.</p>
      </form>
      <div className={`toast${bildirim ? ' show ' + bildirim.tur : ''}`} role="status" aria-live="polite">
        <p>{bildirim ? t(bildirim.anahtar) : ''}</p>
      </div>
    </>
  );
}
