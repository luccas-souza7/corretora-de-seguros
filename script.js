(function () {
  'use strict';

  // ── Mobile menu ──────────────────────────────────
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('mobileMenu');
  if (toggle) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.innerHTML = menu.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }
  // Fechar menu ao clicar em link
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('active');
      if (toggle) toggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // ── Header shadow on scroll ───────────────────────
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ── Animate on scroll ────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // ── Seguros cards ────────────────────────────────
  const segurosContainer = document.getElementById('segurosContainer');
  if (segurosContainer) {
    const WA = 'https://wa.me/5511932018859';
    const seguros = [
      { img: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600', titulo: 'Seguro Auto', desc: 'Cobertura completa, assistência 24h e carro reserva.', msg: 'Quero+cotar+Seguro+Auto' },
      { img: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600', titulo: 'Plano de Saúde', desc: 'Rede credenciada ampla e condições especiais.', msg: 'Quero+cotar+Plano+de+Saúde' },
      { img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600', titulo: 'Seguro Residencial', desc: 'Proteção contra incêndio, roubo, vendaval e assistência 24h.', msg: 'Quero+cotar+Seguro+Residencial' },
      { img: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=600', titulo: 'Seguro de Vida', desc: 'Tranquilidade financeira para quem você ama.', msg: 'Quero+cotar+Seguro+de+Vida' },
      { img: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=600', titulo: 'Consórcio', desc: 'Planeje a compra do seu carro ou imóvel sem juros.', msg: 'Quero+saber+sobre+Consórcio' },
      { img: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600', titulo: 'Seguro Empresarial', desc: 'Proteja seu patrimônio, estoque e equipe.', msg: 'Quero+cotar+Seguro+Empresarial' },
      { img: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600', titulo: 'Seguro Celular', desc: 'Roubo, furto, quebra acidental e assistência imediata.', msg: 'Quero+cotar+Seguro+Celular' },
      { img: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600', titulo: 'Seguro Frota', desc: 'Gestão simplificada para empresas com múltiplos veículos.', msg: 'Quero+cotar+Seguro+Frota' }
    ];
    segurosContainer.innerHTML = seguros.map(s => `
      <div class="seguro-card animate-on-scroll">
        <div class="seguro-img"><img src="${s.img}" alt="${s.titulo}" loading="lazy"></div>
        <h3>${s.titulo}</h3>
        <p>${s.desc}</p>
        <a href="${WA}?text=Olá!+${s.msg}." target="_blank" class="seguro-link">Cotar agora <i class="fas fa-arrow-right"></i></a>
      </div>
    `).join('');
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  }

  // ── Depoimentos (Splide) ─────────────────────────
  const depList = document.getElementById('depoimentosList');
  if (depList) {
    const depoimentos = [
      { nome: 'Mariana Costa', texto: 'Atendimento impecável! Sinistro resolvido em menos de 48h. Equipe super atenciosa do início ao fim.', info: 'Cliente há 4 anos' },
      { nome: 'Ricardo Almeida', texto: 'Preço muito melhor que as concorrentes e suporte humano de verdade. Recomendo sem hesitar.', info: 'Empresário' },
      { nome: 'Ana Paula Souza', texto: 'Explicaram tudo com muita paciência. Me senti segura na escolha do plano ideal para minha família.', info: 'Cliente Porto Seguro' },
      { nome: 'Carlos Eduardo', texto: 'Melhor corretora de Vila Guilherme! Ágeis, simpáticos e muito honestos. Não troco por nada.', info: 'Cliente há 6 anos' },
      { nome: 'Fernanda Lima', texto: 'Atendimento humanizado de verdade. Foram além do esperado quando precisei acionar o seguro.', info: 'Seguro Residencial' },
      { nome: 'João Pedro', texto: 'Cotação excelente para o meu auto. Processo 100% pelo WhatsApp, simples e rápido.', info: 'Cliente Auto' },
      { nome: 'Patrícia Mello', texto: 'Resolvi tudo pelo WhatsApp sem sair de casa. Rápido, fácil e sem burocracia.', info: 'Cliente há 2 anos' },
      { nome: 'Roberto Silva', texto: 'Gerencio uma frota de 12 veículos e nunca tive um problema que a LS não resolvesse rapidamente.', info: 'Cliente Frota' },
      { nome: 'Luciana Costa', texto: 'Consegui um plano de saúde mais barato com cobertura muito melhor. Equipe nota 10!', info: 'Plano de Saúde' },
      { nome: 'Marcos Vinicius', texto: 'Profissionais que realmente entendem de seguro e explicam tudo de forma clara. Confiança total.', info: 'Cliente Vida' },
      { nome: 'Aline Ferreira', texto: 'Fui pessoalmente ao escritório e fui muito bem recebida. Ambiente acolhedor e profissional.', info: 'Cliente Residencial' },
      { nome: 'Gustavo Henrique', texto: 'Tive o celular roubado e o reembolso foi rápido. Nunca esperava tão pouca burocracia!', info: 'Cliente Celular' },
      { nome: 'Tatiane Rocha', texto: 'Total transparência em tudo. Tiraram todas as minhas dúvidas sem me pressionar.', info: 'Cliente Consórcio' },
      { nome: 'Eduardo Santos', texto: 'Seguro empresarial com cobertura completa. Minha empresa ficou muito mais protegida.', info: 'Empresário' },
      { nome: 'Larissa Mendes', texto: 'Indiquei para 4 amigos e todos adoraram o atendimento. A LS é de confiança mesmo.', info: 'Cliente há 5 anos' }
    ];

    const colors = ['#1E4E8C','#0A2540','#3A7CA5','#2563a8','#0e3b6e'];
    depList.innerHTML = depoimentos.map((d, i) => `
      <li class="splide__slide">
        <div class="depoimento-card">
          <div class="dep-header">
            <div class="dep-stars">${'<i class="fas fa-star"></i>'.repeat(5)}</div>
            <div class="dep-google">
              <svg viewBox="0 0 24 24" width="14" height="14"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </div>
          </div>
          <p class="dep-texto">"${d.texto}"</p>
          <div class="dep-autor">
            <div class="dep-avatar" style="background:${colors[i % colors.length]}">${d.nome.charAt(0)}</div>
            <div><strong>${d.nome}</strong><span>${d.info}</span></div>
          </div>
        </div>
      </li>
    `).join('');

    new Splide('#depoimentosSlider', {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '1.5rem',
      autoplay: true,
      interval: 5000,
      pauseOnHover: true,
      arrows: true,
      pagination: true,
      breakpoints: {
        1024: { perPage: 2 },
        640: { perPage: 1 }
      }
    }).mount();
  }

  // ── Seguradoras Splide ────────────────────────────
  const segSlider = document.getElementById('seguradorasSlider');
  if (segSlider) {
    new Splide('#seguradorasSlider', {
      type: 'loop',
      perPage: 5,
      perMove: 1,
      gap: '1.5rem',
      autoplay: true,
      interval: 2500,
      arrows: false,
      pagination: false,
      pauseOnHover: true,
      breakpoints: {
        1024: { perPage: 4 },
        768: { perPage: 3 },
        480: { perPage: 2 }
      }
    }).mount();
  }

  // ── FAQ ───────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // ── Formulário ────────────────────────────────────
  const btnSubmit = document.getElementById('btnSubmit');
  const feedback = document.getElementById('formFeedback');
  if (btnSubmit) {
    btnSubmit.addEventListener('click', () => {
      const nome = (document.getElementById('nome') || {}).value?.trim();
      const telefone = (document.getElementById('telefone') || {}).value?.trim();
      const seguro = (document.getElementById('seguro') || {}).value;
      if (nome && telefone) {
        const msg = encodeURIComponent(`Olá! Meu nome é ${nome}. Tenho interesse em: ${seguro}. Meu contato: ${telefone}.`);
        window.open(`https://wa.me/5511932018859?text=${msg}`, '_blank');
        if (feedback) {
          feedback.textContent = 'Você será redirecionado ao WhatsApp!';
          feedback.style.color = 'var(--primary)';
        }
      } else {
        if (feedback) {
          feedback.textContent = 'Por favor, preencha nome e telefone.';
          feedback.style.color = '#b91c1c';
        }
      }
    });
  }

  // ── Ano dinâmico ─────────────────────────────────
  document.querySelectorAll('#currentYear').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

})();
