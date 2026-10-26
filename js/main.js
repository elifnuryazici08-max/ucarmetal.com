// Mobil menü
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// Galeri büyütme (lightbox)
const lb = document.createElement('div');
lb.className = 'lightbox';
lb.innerHTML = '<button class="lb-btn lb-close" aria-label="Kapat">×</button>' +
  '<button class="lb-btn lb-prev" aria-label="Önceki">‹</button>' +
  '<div class="lb-inner"><img alt=""><p></p></div>' +
  '<button class="lb-btn lb-next" aria-label="Sonraki">›</button>';
document.body.appendChild(lb);
let items = [], index = 0;

function show(i) {
  index = (i + items.length) % items.length;
  const btn = items[index];
  const img = btn.querySelector('img');
  lb.querySelector('img').src = btn.dataset.full || img.src;
  lb.querySelector('img').alt = img.alt;
  const cap = btn.closest('figure')?.querySelector('figcaption');
  lb.querySelector('p').textContent = cap ? cap.textContent : '';
}

document.querySelectorAll('.gallery').forEach(gallery => {
  const buttons = [...gallery.querySelectorAll('button')];
  buttons.forEach((btn, i) => btn.addEventListener('click', () => {
    items = buttons;
    show(i);
    lb.classList.add('open');
  }));
});
lb.querySelector('.lb-close').onclick = () => lb.classList.remove('open');
lb.querySelector('.lb-prev').onclick = () => show(index - 1);
lb.querySelector('.lb-next').onclick = () => show(index + 1);
lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') lb.classList.remove('open');
  if (e.key === 'ArrowLeft') show(index - 1);
  if (e.key === 'ArrowRight') show(index + 1);
});

// Formlar: sunucu tarafı olmadığı için e-posta istemcisini açar
document.querySelectorAll('form[data-mailto]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const lines = [];
    for (const [key, value] of data.entries()) {
      if (key !== 'kvkk' && value) lines.push(key + ': ' + value);
    }
    const subject = encodeURIComponent(form.dataset.subject || 'Web sitesi formu');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = 'mailto:' + form.dataset.mailto + '?subject=' + subject + '&body=' + body;
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
