/* tema, görünür olunca beliren bölümler, form gönderimi */
(function () {
  var root = document.documentElement;
  var yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();

  var tb = document.getElementById('theme');
  if (tb) tb.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    if (next === 'dark') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'light');
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  var form = document.getElementById('contact-form');
  if (!form) return;
  var btn = form.querySelector('button[type="submit"]');
  var toastEl = document.getElementById('toast');
  var ta = form.elements.mesaj, cnt = document.getElementById('count'), timer;
  function count() { cnt.textContent = ta.value.length + ' / 1000'; }
  ta.addEventListener('input', count);
  function toast(msg, type) {
    clearTimeout(timer);
    toastEl.className = 'toast show ' + (type || 'success');
    toastEl.querySelector('p').textContent = msg;
    timer = setTimeout(function () { toastEl.classList.remove('show'); }, 5500);
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var label = btn.textContent;
    btn.disabled = true; btn.textContent = t('f.sending');
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('send failed');
        toast(t('f.ok'), 'success'); form.reset(); count();
      })
      .catch(function () { toast(t('f.err'), 'error'); })
      .then(function () { btn.disabled = false; btn.textContent = t('f.send'); });
  });
})();
