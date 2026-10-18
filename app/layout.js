import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'Kaan Semih Kurt | Büyük Veri Analistliği',
  description: 'Kaan Semih Kurt: Büyük Veri Analistliği öğrencisi. Veri analizi, yazılım ve donanım projeleri.',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%235ea6ff'/%3E%3Ctext x='16' y='21.5' font-size='15' font-family='Georgia,serif' font-weight='700' text-anchor='middle' fill='%2304112b'%3EK%3C/text%3E%3C/svg%3E",
  },
};

export const viewport = { themeColor: '#060b1d' };

// Sayfa çizilmeden önce kayıtlı temayı uygular (beyaz yanıp sönmeyi önler).
const temaBetigi = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@500;600&display=swap"
        />
        <Script id="tema" strategy="beforeInteractive">{temaBetigi}</Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
