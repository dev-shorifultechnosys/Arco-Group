
(function(){
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const year = document.querySelector('[data-year]');
  if(year) year.textContent = new Date().getFullYear();
  function onScroll(){ if(header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  if(toggle && menu){
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', e => { if(e.target.matches('a')){ menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }});
  }
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if((page === '' || page === 'index.html') && href === 'index.html') a.classList.add('active');
    if(href === page) a.classList.add('active');
  });
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.project-card').forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hide', !show);
      });
    });
  });
  const form = document.querySelector('[data-contact-form]');
  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      const hp = form.querySelector('[name="company_website"]');
      if(hp && hp.value.trim() !== '') return;
      const msg = form.querySelector('.form-message');
      if(msg){ msg.style.display = 'block'; msg.textContent = 'Thank you — this demo form is ready for WordPress. Connect it to your form plugin or email service at launch.'; }
      form.reset();
    });
  }
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); } });
    }, {threshold:.12});
    reveals.forEach(el => io.observe(el));
  } else { reveals.forEach(el => el.classList.add('in')); }
})();

(function(){
  function animateNumber(el){
    if(el.dataset.done === 'true') return;
    el.dataset.done = 'true';
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    const isDecimal = String(el.dataset.count || '').includes('.');
    const duration = 1500;
    const start = performance.now();
    function step(now){
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = target * eased;
      el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString()) + suffix;
      if(p < 1) requestAnimationFrame(step);
      else el.textContent = (isDecimal ? target.toFixed(1) : Math.round(target).toLocaleString()) + suffix;
    }
    requestAnimationFrame(step);
  }
  const counters = document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window){
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          animateNumber(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {threshold:.35});
    counters.forEach(el => counterObserver.observe(el));
  } else counters.forEach(animateNumber);

  document.querySelectorAll('.image-slider').forEach(slider => {
    const imgs = Array.from(slider.querySelectorAll('img'));
    if(imgs.length < 2) return;
    let i = imgs.findIndex(img => img.classList.contains('active'));
    if(i < 0) i = 0;
    imgs[i].classList.add('active');
    setInterval(() => {
      imgs[i].classList.remove('active');
      i = (i + 1) % imgs.length;
      imgs[i].classList.add('active');
    }, 4200);
  });

  document.querySelectorAll('[data-faq] details').forEach(item => {
    item.addEventListener('toggle', () => {
      if(item.open){
        item.parentElement.querySelectorAll('details').forEach(other => {
          if(other !== item) other.removeAttribute('open');
        });
      }
    });
  });
})();
