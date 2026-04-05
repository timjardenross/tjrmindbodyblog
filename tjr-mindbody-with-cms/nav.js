document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const sideNav   = document.getElementById('sideNav');
  const overlay   = document.getElementById('navOverlay');
  const closeBtn  = document.getElementById('closeNav');

  function openNav()  { sideNav.classList.add('open');    overlay.classList.add('open'); }
  function closeNav() { sideNav.classList.remove('open'); overlay.classList.remove('open'); }

  hamburger && hamburger.addEventListener('click', openNav);
  closeBtn  && closeBtn.addEventListener('click',  closeNav);
  overlay   && overlay.addEventListener('click',   closeNav);

  // Close on nav link click (mobile)
  sideNav && sideNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  // Highlight active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.side-nav a').forEach(link => {
    if (link.getAttribute('href') === path) link.classList.add('active');
  });
});
