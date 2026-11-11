import dados from '../dados/site.json';

export const site = dados;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Caminho interno já com o prefixo do GitHub Pages. */
export const url = (caminho = '') => `${base}/${caminho.replace(/^\//, '')}`;

/** URL absoluta (necessária nas tags de compartilhamento). */
export const absoluta = (caminho = '') => new URL(url(caminho), import.meta.env.SITE).href;

/** Link do WhatsApp com mensagem pronta. */
export const whatsapp = (mensagem = 'Olá! Gostaria de uma cotação gratuita.') =>
  `https://wa.me/${dados.contato.whatsapp}?text=${encodeURIComponent(mensagem)}`;

export const dataExtensa = (d: Date) =>
  d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).replace('.', '');

/** Tempo de leitura estimado, em minutos. */
export const minutosDeLeitura = (texto = '') => Math.max(1, Math.round(texto.split(/\s+/).length / 200));

export const ICONE_CATEGORIA: Record<string, string> = {
  Auto: 'car-profile', Residencial: 'house-line', Vida: 'heartbeat', Sinistro: 'shield-check',
  'Consórcio': 'key', Celular: 'device-mobile', Empresarial: 'buildings', 'Saúde': 'first-aid-kit',
};
