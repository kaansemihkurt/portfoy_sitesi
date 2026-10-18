-- =====================================================
-- Kaan Semih Kurt - 2516016008
-- Veritabanı tabloları (Neon SQL Editor'de çalıştırıldı)
-- =====================================================

-- Görev 1: Ortak tablolar
CREATE TABLE yoneticiler (
  id SERIAL PRIMARY KEY,
  eposta TEXT UNIQUE NOT NULL,
  sifre_hash TEXT NOT NULL, -- şifrenin kendisi DEĞİL, bcrypt özeti
  olusturma TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE oturumlar (
  token TEXT PRIMARY KEY, -- tarayıcı çerezinde tutulan rastgele değer
  yonetici_id INT NOT NULL REFERENCES yoneticiler(id) ON DELETE CASCADE,
  bitis TIMESTAMPTZ NOT NULL
);

CREATE TABLE iletisim_mesajlari (
  id SERIAL PRIMARY KEY,
  ad_soyad TEXT NOT NULL,
  eposta TEXT NOT NULL,
  mesaj TEXT NOT NULL,
  kvkk_onay BOOLEAN NOT NULL DEFAULT false,
  okundu BOOLEAN NOT NULL DEFAULT false,
  gonderim_zamani TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Görev 2: Sık Sorulan Sorular
CREATE TABLE sss_kategorileri (
  id SERIAL PRIMARY KEY,
  ad TEXT NOT NULL UNIQUE
);

CREATE TABLE sss (
  id SERIAL PRIMARY KEY,
  soru TEXT NOT NULL,
  cevap TEXT,
  sira INT,
  tiklanma INT DEFAULT 0,
  kategori_id INT REFERENCES sss_kategorileri(id) ON DELETE SET NULL,
  yayinda BOOLEAN NOT NULL DEFAULT true,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Görev 6: Kaba kuvvet saldırısına karşı giriş denemeleri
CREATE TABLE giris_denemeleri (
  id SERIAL PRIMARY KEY,
  eposta TEXT NOT NULL,
  ip TEXT,
  basarili BOOLEAN NOT NULL,
  zaman TIMESTAMPTZ NOT NULL DEFAULT now()
);
