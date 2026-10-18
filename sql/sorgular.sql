-- =====================================================
-- BVA 2205 Siber Güvenlik ve Bilişim Hukuku
-- Kaan Semih Kurt - 2516016008
-- Modül: Sık Sorulan Sorular (sss)
-- =====================================================


-- Görev 3.1
-- Cevabı boş olmayan VE 10'dan fazla tıklanan sorular
SELECT id, soru, tiklanma
FROM sss
WHERE cevap IS NOT NULL
  AND tiklanma > 10
ORDER BY tiklanma DESC;


-- Görev 3.2
-- Sıra numarasına göre ilk 5 soru (sitedeki "Öne çıkanlar" alanı bu sorguyu kullanır)
SELECT id, soru, sira
FROM sss
ORDER BY sira ASC
LIMIT 5;


-- Görev 3.3
-- Toplam tıklanma sayısı ve en çok tıklanan sorunun tıklanma sayısı
SELECT SUM(tiklanma) AS toplam_tiklanma,
       MAX(tiklanma) AS en_cok_tiklanma
FROM sss;


-- Görev 3.4
-- Her kategorideki soru sayısı; hiç sorusu olmayan kategoriler 0 ile görünür.
-- Kategoriler tablosundan başlayıp LEFT JOIN yapılır, COUNT(s.id) eşleşmeyen satırda 0 verir.
SELECT k.ad AS kategori,
       COUNT(s.id) AS soru_sayisi
FROM sss_kategorileri k
LEFT JOIN sss s ON s.kategori_id = k.id
GROUP BY k.id, k.ad
ORDER BY k.id;


-- Görev 3.5
-- Soru alanında öğrenci numarasının geçtiği kayıt (ILIKE büyük-küçük harf ayırmaz)
SELECT id, soru
FROM sss
WHERE soru ILIKE '%2516016008%';


-- Görev 3.6
-- id 6 (sira 6) ile id 7 (sira 7) kayıtlarının sıralarını yer değiştirme
-- Önce kontrol:
SELECT id, soru, sira FROM sss WHERE id IN (6, 7);

UPDATE sss SET sira = 7 WHERE id = 6;
UPDATE sss SET sira = 6 WHERE id = 7;

-- Sonra kontrol:
SELECT id, soru, sira FROM sss WHERE id IN (6, 7);


-- Görev 3.7
-- Cevabı boş olan soruları silme
-- Önce hangi kayıtların silineceğini görmek için:
SELECT id, soru FROM sss WHERE cevap IS NULL OR cevap = '';

DELETE FROM sss
WHERE cevap IS NULL OR cevap = '';


-- =====================================================
-- Görev 6 (Güvenlik): Son 24 saatte en çok hatalı deneme yapılan 3 IP adresi
-- =====================================================
SELECT ip, COUNT(*) AS hatali_deneme
FROM giris_denemeleri
WHERE basarili = false
  AND zaman > now() - interval '24 hours'
GROUP BY ip
ORDER BY hatali_deneme DESC
LIMIT 3;


-- =====================================================
-- Görev 7 (Hukuk): Yurt dışına aktarım
-- =====================================================

-- Veritabanının saat dilimi ve PostgreSQL sürümü
SELECT current_setting('TimeZone'), version();

-- Yurt dışına aktarılan kayıt sayısı (iletişim formundan gelen mesajlar)
SELECT COUNT(*) AS yurt_disina_aktarilan_kayit
FROM iletisim_mesajlari;
