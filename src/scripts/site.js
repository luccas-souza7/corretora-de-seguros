// Comportamento comum a todas as páginas: cabeçalho, menu do celular, carrosséis, revelação ao rolar.
const html = document.documentElement;
const topo = document.getElementById('topo');

// cabeçalho sólido depois de rolar; barra de WhatsApp aparece depois da hero
// a barra do topo some ao rolar para baixo e volta ao rolar para cima
let ultimoY = scrollY;
let agendado = false;
const aoRolar = () => {
  agendado = false;
  const y = Math.max(0, scrollY);
  topo?.classList.toggle('rolou', y > 30);
  html.classList.toggle('passou', y > innerHeight * 0.5);
  const dif = y - ultimoY;
  if (html.classList.contains('menu-aberto') || y < 120) topo?.classList.remove('esconde');
  else if (dif > 6) topo?.classList.add('esconde');
  else if (dif < -6) topo?.classList.remove('esconde');
  if (Math.abs(dif) > 6 || y < 120) ultimoY = y;
};
addEventListener('scroll', () => { if (!agendado) { agendado = true; requestAnimationFrame(aoRolar); } }, { passive: true });
// ao focar um link do cabeçalho com o teclado, ele volta
topo?.addEventListener('focusin', () => topo.classList.remove('esconde'));
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

// perguntas frequentes: só uma aberta por vez, com animação
const calmo = matchMedia('(prefers-reduced-motion: reduce)');
const animarDetalhe = (d, abrir) => {
  d._anim?.cancel();
  d.classList.toggle('fechando', !abrir);
  if (calmo.matches) { d.open = abrir; d.classList.remove('fechando'); return; }
  const inicio = d.offsetHeight;
  d.open = true;
  const fim = abrir ? d.offsetHeight : d.querySelector('summary').offsetHeight + 2;
  d.style.overflow = 'hidden';
  const anim = d.animate({ height: [`${inicio}px`, `${fim}px`] }, { duration: 380, easing: 'cubic-bezier(.2, .7, .2, 1)' });
  d._anim = anim;
  anim.onfinish = () => {
    d._anim = null;
    d.style.overflow = '';
    if (!abrir) { d.open = false; d.classList.remove('fechando'); }
  };
};
document.querySelectorAll('.faq').forEach((lista) => {
  const itens = [...lista.querySelectorAll('details')];
  itens.forEach((d) => {
    d.querySelector('summary').addEventListener('click', (e) => {
      e.preventDefault();
      const abrir = !d.open || d.classList.contains('fechando');
      if (abrir) itens.forEach((o) => { if (o !== d && o.open && !o.classList.contains('fechando')) animarDetalhe(o, false); });
      animarDetalhe(d, abrir);
    });
  });
});

// números que contam do zero quando aparecem (ex.: "500+", "15", "48h")
const contar = (el) => {
  const m = el.textContent.match(/^(\D*)([\d.]+)(.*)$/);
  if (!m || calmo.matches) return;
  const alvo = Number(m[2].replace(/\./g, ''));
  const t0 = performance.now();
  const passo = (t) => {
    const p = Math.min(1, (t - t0) / 1400);
    const v = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
    el.textContent = `${m[1]}${v.toLocaleString('pt-BR')}${m[3]}`;
    if (p < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
};
const contadores = document.querySelectorAll('[data-conta]');
if ('IntersectionObserver' in window && contadores.length) {
  const olhoNum = new IntersectionObserver((itens) => {
    itens.forEach((i) => { if (i.isIntersecting) { contar(i.target); olhoNum.unobserve(i.target); } });
  }, { threshold: 0.6 });
  contadores.forEach((el) => olhoNum.observe(el));
}

// ano do rodapé sempre atual
const ano = document.getElementById('ano');
if (ano) ano.textContent = String(new Date().getFullYear());
