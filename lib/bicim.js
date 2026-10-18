// Tarihleri Türkiye saatiyle gösterir.
export function tarih(d) {
  return new Date(d).toLocaleString('tr-TR', {
    timeZone: 'Europe/Istanbul',
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}
