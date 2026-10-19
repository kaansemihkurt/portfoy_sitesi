// Ekleme ve düzenleme sayfalarında ortak kullanılan SSS formu (sunucu bileşeni).
export default function SssFormu({ action, kategoriler, kayit, dugme }) {
  return (
    <form action={action} className="card adm-form">
      {kayit && <input type="hidden" name="id" value={kayit.id} />}
      <div className="fld full">
        <label htmlFor="soru">Soru *</label>
        <input id="soru" name="soru" required maxLength={500} defaultValue={kayit?.soru ?? ''} />
      </div>
      <div className="fld full">
        <label htmlFor="cevap">Cevap (boş bırakılabilir)</label>
        <textarea id="cevap" name="cevap" maxLength={3000} defaultValue={kayit?.cevap ?? ''} />
      </div>
      <div className="fld">
        <label htmlFor="soru_en">Soru (İngilizce, isteğe bağlı)</label>
        <input id="soru_en" name="soru_en" maxLength={500} defaultValue={kayit?.soru_en ?? ''} />
      </div>
      <div className="fld">
        <label htmlFor="soru_ja">Soru (Japonca, isteğe bağlı)</label>
        <input id="soru_ja" name="soru_ja" maxLength={500} defaultValue={kayit?.soru_ja ?? ''} />
      </div>
      <div className="fld">
        <label htmlFor="cevap_en">Cevap (İngilizce, isteğe bağlı)</label>
        <textarea id="cevap_en" name="cevap_en" maxLength={3000} defaultValue={kayit?.cevap_en ?? ''} />
      </div>
      <div className="fld">
        <label htmlFor="cevap_ja">Cevap (Japonca, isteğe bağlı)</label>
        <textarea id="cevap_ja" name="cevap_ja" maxLength={3000} defaultValue={kayit?.cevap_ja ?? ''} />
      </div>
      <div className="fld">
        <label htmlFor="kategori_id">Kategori</label>
        <select id="kategori_id" name="kategori_id" defaultValue={kayit?.kategori_id ?? ''}>
          <option value="">(Kategorisiz)</option>
          {kategoriler.map((k) => (
            <option key={k.id} value={k.id}>{k.ad}</option>
          ))}
        </select>
      </div>
      <div className="fld">
        <label htmlFor="sira">Sıra</label>
        <input id="sira" name="sira" type="number" step="1" defaultValue={kayit?.sira ?? ''} />
      </div>
      <div className="satir">
        <label className="onay">
          <input type="checkbox" name="yayinda" defaultChecked={kayit ? kayit.yayinda : true} />
          <span>Yayında (sitede görünsün)</span>
        </label>
        <button className="btn pri" type="submit">{dugme}</button>
      </div>
    </form>
  );
}
