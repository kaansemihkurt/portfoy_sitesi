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
