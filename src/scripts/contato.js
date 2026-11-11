// Seção de contato: o formulário abre o WhatsApp com a mensagem pronta; o mapa carrega ao se aproximar da tela.
const form = document.getElementById('form-cotacao');
if (form) {
  const erro = form.querySelector('.erro');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const fone = form.telefone.value.trim();
    if (!nome || !fone) { erro.textContent = 'Preencha seu nome e um telefone para contato.'; (nome ? form.telefone : form.nome).focus(); return; }
    erro.textContent = '';
    const mensagem = `Olá! Meu nome é ${nome}. Tenho interesse em: ${form.tipo.value}. Meu contato: ${fone}.`;
    window.open(`https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(mensagem)}`, '_blank', 'noopener');
  });
}

const alvo = document.getElementById('mapa-contato');
if (alvo && 'IntersectionObserver' in window) {
  const olho = new IntersectionObserver((itens) => {
    if (!itens.some((i) => i.isIntersecting)) return;
    olho.disconnect();
    import('./mapa.js').then(({ criar }) => {
      const { mapa, centro, maplibregl } = criar('mapa-contato', { interativo: true });
      const pino = alvo.querySelector('.pino-mapa');
      mapa.once('load', () => { alvo.style.backgroundImage = 'none'; if (pino) new maplibregl.Marker({ element: pino, anchor: 'bottom' }).setLngLat(centro).addTo(mapa); });
    }).catch(() => {});
  }, { rootMargin: '400px 0px' });
  olho.observe(alvo);
}
