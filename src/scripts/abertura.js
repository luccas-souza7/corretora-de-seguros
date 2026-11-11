// Abertura da página inicial: o endereço abre a porta.
// 0 mapa com o pino · 1 a câmera mergulha na rua · 2 o cartão do endereço cresce até virar a hero · fim
const html = document.documentElement;
const ab = document.getElementById('abertura');

if (ab && html.classList.contains('abrindo')) {
  const site = document.getElementById('site');
  const cartao = ab.querySelector('.ab-cartao');
  const esperas = [];
  let vivo = null;
  let acabou = false;

  const fase = (n) => { html.dataset.fase = String(n); };
  const depois = (ms, fn) => esperas.push(setTimeout(fn, ms));

  const terminar = () => {
    if (acabou) return;
    acabou = true;
    esperas.forEach(clearTimeout);
    site.style.transition = 'none';
    site.style.clipPath = '';
    html.classList.remove('abrindo');
    delete html.dataset.fase;
    try { sessionStorage.setItem('abertura', '1'); } catch (e) { /* sem armazenamento, toca de novo */ }
    setTimeout(() => { vivo?.mapa.remove(); ab.remove(); site.style.transition = ''; }, 60);
  };

  const recorte = (r, raio) => `inset(${r.t}px ${r.r}px calc(100% - ${r.b}px) ${r.l}px round ${raio}px)`;
  const abrirPorta = () => {
    const c = cartao.getBoundingClientRect();
    site.style.transition = 'none';
    site.style.clipPath = recorte({ t: c.top, r: innerWidth - c.right, b: c.bottom, l: c.left }, 16);
    site.getBoundingClientRect(); // aplica o estado inicial antes de animar
    requestAnimationFrame(() => {
      site.style.transition = 'clip-path .95s cubic-bezier(.7, 0, .2, 1)';
      site.style.clipPath = recorte({ t: 0, r: 0, b: innerHeight, l: 0 }, 0);
    });
  };

  const mergulhar = () => {
    if (acabou) return;
    fase(1);
    if (ab.classList.contains('vivo')) {
      vivo.mapa.easeTo({ zoom: 17.5, pitch: 58, bearing: -24, duration: 1800, easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) });
    }
    depois(1800, () => { fase(2); abrirPorta(); depois(1000, terminar); });
  };

  ab.querySelector('.ab-pular')?.addEventListener('click', terminar);
  addEventListener('keydown', (e) => { if (e.key === 'Escape') terminar(); });

  // A imagem estática do mapa já está na tela. O mapa interativo carrega por trás e assume se chegar a tempo.
  const inicio = performance.now();
  let partiu = false;
  const partir = () => { if (!partiu) { partiu = true; depois(Math.max(0, 1200 - (performance.now() - inicio)), mergulhar); } };
  // Aparelhos fracos ou em economia de dados ficam só com a imagem (sem o mapa 3D).
  const economia = navigator.connection && navigator.connection.saveData;
  const fraco = (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  if (!economia && !fraco) {
    import('./mapa.js').then((m) => {
      if (acabou || partiu) return;
      vivo = m.criar('ab-mapa', { predios3d: true, leve: true });
      vivo.mapa.once('idle', () => { if (!acabou && !partiu) { ab.classList.add('vivo'); partir(); } });
    }).catch(() => {});
  }
  depois(economia || fraco ? 0 : 2400, partir); // sem mapa ao vivo ou rede lenta: segue só com a imagem
}
