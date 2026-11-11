// Comportamento comum a todas as páginas: cabeçalho, menu do celular, carrosséis, revelação ao rolar.
const html = document.documentElement;
const topo = document.getElementById('topo');

// cabeçalho sólido depois de rolar; barra de WhatsApp aparece depois da hero
const aoRolar = () => {
  topo?.classList.toggle('rolou', scrollY > 30);
  html.classList.toggle('passou', scrollY > innerHeight * 0.5);
};
addEventListener('scroll', aoRolar, { passive: true });
aoRolar();

// menu do celular
const abre = document.getElementById('abre-menu');
const fecha = document.getElementById('fecha-menu');
const gaveta = document.getElementById('gaveta');
const alternaMenu = (aberto) => {
  html.classList.toggle('menu-aberto', aberto);
  abre?.setAttribute('aria-expanded', String(aberto));
  (aberto ? fecha : abre)?.focus();
};
abre?.addEventListener('click', () => alternaMenu(true));
fecha?.addEventListener('click', () => alternaMenu(false));
gaveta?.addEventListener('click', (e) => { if (e.target.closest('a')) alternaMenu(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && html.classList.contains('menu-aberto')) alternaMenu(false); });

// carrosséis: setas e barra de progresso
document.querySelectorAll('[data-carrossel]').forEach((bloco) => {
  const trilho = bloco.querySelector('.trilho');
  const barra = bloco.querySelector('.barra i');
  if (!trilho) return;
  bloco.querySelectorAll('.seta').forEach((b) =>
    b.addEventListener('click', () => trilho.scrollBy({ left: Number(b.dataset.dir) * trilho.clientWidth * 0.8, behavior: 'smooth' })));
  const progresso = () => {
    if (!barra) return;
    const total = trilho.scrollWidth - trilho.clientWidth;
    const visivel = Math.min(1, trilho.clientWidth / trilho.scrollWidth);
    barra.style.width = `${visivel * 100}%`;
    barra.style.transform = `translateX(${(total > 0 ? trilho.scrollLeft / total : 0) * (100 / visivel - 100)}%)`;
  };
  trilho.addEventListener('scroll', progresso, { passive: true });
  addEventListener('resize', progresso);
  progresso();
});

// blocos que surgem ao entrar na tela
const surgem = document.querySelectorAll('.surge');
if ('IntersectionObserver' in window && surgem.length) {
  const olho = new IntersectionObserver((itens) => {
    itens.forEach((i) => { if (i.isIntersecting) { i.target.classList.add('visto'); olho.unobserve(i.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  surgem.forEach((el) => olho.observe(el));
} else {
  surgem.forEach((el) => el.classList.add('visto'));
}
