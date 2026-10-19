import Link from 'next/link';

export const metadata = {
  title: 'Aydınlatma Metni | Kaan Semih Kurt',
  description: 'İletişim formu ile toplanan kişisel verilere ilişkin aydınlatma metni.',
};

// KVKK md. 10 kapsamında aydınlatma metni. Üç dilde yayımlanır; sayfa seçili dile göre ilgili bölümü gösterir
// (globals.css: html[lang] ile .dil-tr / .dil-en / .dil-ja). Hukuki açıdan Türkçe metin esastır.
export default function AydinlatmaMetni() {
  return (
    <main id="main" className="wrap">
      <div className="dil-tr" lang="tr"><MetinTR /></div>
      <div className="dil-en" lang="en"><MetinEN /></div>
      <div className="dil-ja" lang="ja"><MetinJA /></div>
    </main>
  );
}

function MetinTR() {
  return (
    <>
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
    </>
  );
}

function MetinEN() {
  return (
    <>
      <div className="page-head rv">
        <p className="eyebrow">KVKK · Art. 10</p>
        <h1>Privacy Notice</h1>
        <p>Information about the personal data processed through the contact form.</p>
      </div>

      <div className="metin rv">
        <p className="note">This English version is provided for information only; in case of any difference, the Turkish version prevails.</p>

        <h2>1. Data controller</h2>
        <p>
          The data controller for personal data collected through this website and its contact form is
          <strong> Kaan Semih Kurt</strong> (Şehzadeler, Manisa, Türkiye). You can reach me through the <Link href="/iletisim">contact form</Link>.
        </p>

        <h2>2. Personal data processed</h2>
        <ul>
          <li><strong>Identity:</strong> full name</li>
          <li><strong>Contact:</strong> e-mail address</li>
          <li><strong>Request:</strong> the content of your message</li>
          <li><strong>Transaction:</strong> the fact that the consent box was ticked and the time the message was sent</li>
        </ul>
        <p>The form does not ask for a phone number, address or special categories of personal data. Please do not include such information in your message.</p>

        <h2>3. Purpose and legal basis</h2>
        <p>
          Your data is processed only to <strong>read your message and reply to you</strong>; it is not used for advertising,
          marketing or profiling. The legal basis is <strong>legitimate interest</strong> under KVKK Art. 5/2-f, as processing is
          necessary to answer your request. Your data is collected electronically through the contact form.
        </p>

        <h2>4. Transfer abroad (KVKK Art. 9)</h2>
        <p>
          This website uses the infrastructure of service providers located outside Türkiye. Therefore, the data you send through
          the form is <strong>transferred abroad</strong>:
        </p>
        <table>
          <thead>
            <tr><th>Service provider</th><th>Service</th><th>Where the data is located</th></tr>
          </thead>
          <tbody>
            <tr><td>Neon (Neon Inc., USA)</td><td>Database: where messages are stored</td><td>Amazon Web Services, Frankfurt (Germany) region</td></tr>
            <tr><td>Vercel (Vercel Inc., USA)</td><td>Website hosting and server-side processing of the form</td><td>Server functions run in the Frankfurt (Germany) region; the provider&apos;s technical logs may be kept in other countries, including the USA.</td></tr>
          </tbody>
        </table>
        <p>
          <strong>Possible risks:</strong> As the Turkish Personal Data Protection Board has not issued an adequacy decision for
          these countries, your data stored on servers abroad may not be subject to exactly the same safeguards as in Türkiye and
          may be accessed by competent authorities under the laws of those countries.
        </p>
        <p>
          The transfer is based on the <strong>explicit consent</strong> you give by ticking the consent box in the form after being
          informed of these risks, under KVKK Art. 9/6-a as amended by Law No. 7499. If you do not give consent, the form cannot be
          sent; in that case you can also reach me through my GitHub profile.
        </p>

        <h2>5. Retention period</h2>
        <p>Messages are deleted at the latest <strong>one year</strong> after you have been answered.</p>

        <h2>6. Your rights (KVKK Art. 11)</h2>
        <p>By applying to the data controller, you have the right to:</p>
        <ul>
          <li>learn whether your personal data is processed and request information if it is,</li>
          <li>learn the purpose of processing and whether it is used in line with that purpose,</li>
          <li>know the third parties in Türkiye or abroad to whom your data is transferred,</li>
          <li>request correction if it is incomplete or inaccurate, and deletion or destruction under KVKK Art. 7,</li>
          <li>request that these actions be notified to the third parties to whom the data was transferred,</li>
          <li>object to a result against you arising from analysis by automated systems,</li>
          <li>claim compensation for damage caused by unlawful processing.</li>
        </ul>
        <p>You can send your requests through the <Link href="/iletisim">contact form</Link>; they are answered within 30 days at the latest.</p>

        <p className="note" style={{ marginTop: 34 }}>Last updated: October 2026</p>
      </div>
    </>
  );
}

function MetinJA() {
  return (
    <>
      <div className="page-head rv">
        <p className="eyebrow">KVKK · 第10条</p>
        <h1>個人情報に関する通知</h1>
        <p>お問い合わせフォームを通じて取り扱う個人情報についてのお知らせです。</p>
      </div>

      <div className="metin rv">
        <p className="note">この日本語版は参考のために提供するものです。内容に相違がある場合はトルコ語版が優先されます。</p>

        <h2>1. データ管理者</h2>
        <p>
          本ウェブサイトおよびお問い合わせフォームを通じて収集する個人情報のデータ管理者は
          <strong>カーン・セミフ・クルト（Kaan Semih Kurt）</strong>（トルコ・マニサ県シェフザーデレル）です。
          <Link href="/iletisim">お問い合わせフォーム</Link>からご連絡いただけます。
        </p>

        <h2>2. 取り扱う個人情報</h2>
        <ul>
          <li><strong>本人情報：</strong>氏名</li>
          <li><strong>連絡先：</strong>メールアドレス</li>
          <li><strong>依頼内容：</strong>メッセージの内容</li>
          <li><strong>処理情報：</strong>同意チェックボックスへのチェックの有無と送信日時</li>
        </ul>
        <p>フォームでは電話番号、住所、特別な種類の個人情報はお尋ねしません。メッセージにもこれらの情報を書かないでください。</p>

        <h2>3. 利用目的と法的根拠</h2>
        <p>
          個人情報は<strong>メッセージを読み、返信するため</strong>にのみ利用し、広告、マーケティング、プロファイリングには使用しません。
          法的根拠は、ご依頼に回答するために必要な<strong>正当な利益</strong>（KVKK第5条第2項f号）です。
          個人情報はお問い合わせフォームを通じて電子的に収集されます。
        </p>

        <h2>4. 国外への移転（KVKK第9条）</h2>
        <p>本サイトはトルコ国外のサービス事業者の基盤を利用しているため、フォームから送信されたデータは<strong>国外に移転</strong>されます。</p>
        <table>
          <thead>
            <tr><th>サービス事業者</th><th>サービス</th><th>データの所在地</th></tr>
          </thead>
          <tbody>
            <tr><td>Neon（Neon Inc.、米国）</td><td>データベース：メッセージの保存先</td><td>Amazon Web Services フランクフルト（ドイツ）リージョン</td></tr>
            <tr><td>Vercel（Vercel Inc.、米国）</td><td>サイトのホスティングとフォームのサーバー側処理</td><td>サーバー機能はフランクフルト（ドイツ）リージョンで動作します。事業者の技術ログは米国を含む他の国で保管される場合があります。</td></tr>
          </tbody>
        </table>
        <p>
          <strong>想定されるリスク：</strong>トルコ個人情報保護委員会はこれらの国について十分性認定を行っていないため、
          国外のサーバーに保存されたデータには、トルコと全く同じ保護措置が適用されない場合があり、
          また当該国の法令に基づき権限のある当局がアクセスする可能性があります。
        </p>
        <p>
          移転は、これらのリスクについて説明を受けたうえでフォームの同意チェックボックスにチェックすることで与えられる
          <strong>明示的な同意</strong>に基づき、第7499号法により改正されたKVKK第9条第6項a号に従って行われます。
          同意いただけない場合はフォームを送信できませんが、GitHubプロフィールからもご連絡いただけます。
        </p>

        <h2>5. 保存期間</h2>
        <p>メッセージは、返信後遅くとも<strong>1年以内</strong>に削除されます。</p>

        <h2>6. お客様の権利（KVKK第11条）</h2>
        <p>データ管理者に申請することで、次の権利を行使できます。</p>
        <ul>
          <li>個人情報が処理されているかを知り、処理されている場合は情報を求めること</li>
          <li>処理の目的と、その目的に沿って利用されているかを知ること</li>
          <li>国内外で個人情報が移転された第三者を知ること</li>
          <li>不完全または不正確な場合の訂正、およびKVKK第7条に基づく削除・破棄を求めること</li>
          <li>これらの措置を移転先の第三者に通知するよう求めること</li>
          <li>自動化されたシステムによる分析の結果、不利益な結果が生じた場合に異議を申し立てること</li>
          <li>違法な処理により損害を受けた場合に損害の賠償を求めること</li>
        </ul>
        <p>ご請求は<Link href="/iletisim">お問い合わせフォーム</Link>からお送りください。遅くとも30日以内に回答します。</p>

        <p className="note" style={{ marginTop: 34 }}>最終更新：2026年10月</p>
      </div>
    </>
  );
}
