import Link from 'next/link';

export const metadata = {
  title: 'Aydınlatma Metni | Kaan Semih Kurt',
  description: 'İletişim formu ile toplanan kişisel verilere ilişkin aydınlatma metni.',
};

// KVKK md. 10 kapsamında aydınlatma metni. Hukuki metin olduğu için yalnızca Türkçe yayımlanır.
export default function AydinlatmaMetni() {
  return (
    <main id="main" className="wrap" lang="tr">
      <div className="page-head rv">
        <p className="eyebrow">KVKK · md. 10</p>
        <h1>Aydınlatma Metni</h1>
        <p>İletişim formu aracılığıyla işlenen kişisel verileriniz hakkında bilgilendirme.</p>
      </div>

      <div className="metin rv">
        <h2>1. Veri sorumlusu</h2>
        <p>
          Bu internet sitesi ve iletişim formu aracılığıyla toplanan kişisel verilerin veri sorumlusu
          <strong> Kaan Semih Kurt</strong>&apos;tur (Şehzadeler, Manisa). Bana <Link href="/iletisim">iletişim formu</Link> üzerinden ulaşabilirsiniz.
        </p>

        <h2>2. İşlenen kişisel veriler</h2>
        <ul>
          <li><strong>Kimlik:</strong> ad soyad</li>
          <li><strong>İletişim:</strong> e-posta adresi</li>
          <li><strong>Talep bilgisi:</strong> mesajınızın içeriği</li>
          <li><strong>İşlem bilgisi:</strong> onay kutusunun işaretlendiği bilgisi ve mesajın gönderilme zamanı</li>
        </ul>
        <p>Formda telefon numarası, adres veya özel nitelikli kişisel veri istenmez. Lütfen mesajınıza bu tür bilgiler yazmayın.</p>

        <h2>3. İşleme amacı ve hukuki sebep</h2>
        <p>
          Verileriniz yalnızca <strong>mesajınızı okumak ve size geri dönüş yapmak</strong> amacıyla işlenir; reklam, pazarlama
          veya profil çıkarma amacıyla kullanılmaz. Hukuki sebep, KVKK md. 5/2-f uyarınca talebinize yanıt verebilmem için
          zorunlu olan <strong>meşru menfaattir</strong>. Verileriniz iletişim formu aracılığıyla elektronik ortamda toplanır.
        </p>

        <h2>4. Yurt dışına aktarım (KVKK md. 9)</h2>
        <p>
          Bu site Türkiye dışında bulunan hizmet sağlayıcıların altyapısını kullanır. Bu nedenle formdan gönderdiğiniz veriler
          <strong> yurt dışına aktarılmış olur</strong>:
        </p>
        <table>
          <thead>
            <tr><th>Hizmet sağlayıcı</th><th>Hizmet</th><th>Verinin bulunduğu yer</th></tr>
          </thead>
          <tbody>
            <tr><td>Neon (Neon Inc., ABD)</td><td>Veritabanı: mesajların saklandığı yer</td><td>Amazon Web Services, Frankfurt (Almanya) bölgesi</td></tr>
            <tr><td>Vercel (Vercel Inc., ABD)</td><td>Sitenin barındırılması ve formun sunucu tarafında işlenmesi</td><td>Sunucu işlevleri Frankfurt (Almanya) bölgesinde çalışır; sağlayıcının teknik kayıtları ABD dahil başka ülkelerde tutulabilir.</td></tr>
          </tbody>
        </table>
        <p>
          <strong>Olası riskler:</strong> Kişisel Verileri Koruma Kurulu'nca bu ülkeler için ilan edilmiş bir yeterlilik kararı
          bulunmadığından, yurt dışındaki sunucularda tutulan verileriniz Türkiye'deki koruma düzeyiyle birebir aynı güvencelere
          tabi olmayabilir ve o ülkelerin mevzuatı kapsamında yetkili makamların erişimine konu olabilir.
        </p>
        <p>
          Aktarım, bu riskler hakkında bilgilendirildikten sonra formdaki onay kutusunu işaretleyerek verdiğiniz
          <strong>açık rızaya</strong> dayanılarak, 7499 sayılı Kanun ile değişik KVKK md. 9/6-a kapsamında yapılır. Onay
          vermemeniz durumunda form gönderilmez; bu durumda bana GitHub profilim üzerinden de ulaşabilirsiniz.
        </p>

        <h2>5. Saklama süresi</h2>
        <p>Mesajlar, size dönüş yapıldıktan sonra en geç <strong>1 yıl</strong> içinde silinir.</p>

        <h2>6. Haklarınız (KVKK md. 11)</h2>
        <p>Veri sorumlusuna başvurarak:</p>
        <ul>
          <li>kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse bilgi talep etme,</li>
          <li>işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
          <li>yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
          <li>eksik veya yanlış işlenmişse düzeltilmesini, KVKK md. 7 çerçevesinde silinmesini veya yok edilmesini isteme,</li>
          <li>bu işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
          <li>otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuca itiraz etme,</li>
          <li>kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
        </ul>
        <p>haklarına sahipsiniz. Başvurularınızı <Link href="/iletisim">iletişim formu</Link> üzerinden iletebilirsiniz; en geç 30 gün içinde yanıtlanır.</p>

        <p className="note" style={{ marginTop: 34 }}>Son güncelleme: Ekim 2026</p>
      </div>
    </main>
  );
}
