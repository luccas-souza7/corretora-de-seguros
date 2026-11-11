// Imagem de compartilhamento (1200×630) da página inicial e de cada post, gerada no build.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import dados from '../../dados/site.json';

const raiz = process.cwd();
const fonte = (peso: number) => fs.readFileSync(path.join(raiz, `node_modules/@fontsource/onest/files/onest-latin-${peso}-normal.woff`));
const emBase64 = (arquivo: string, tipo: string) => `data:${tipo};base64,${fs.readFileSync(path.join(raiz, arquivo)).toString('base64')}`;

export async function getStaticPaths() {
  const posts = await getCollection('blog', (p) => !p.data.rascunho);
  return [
    { params: { slug: 'inicio' }, props: { olho: `Corretora de seguros · desde ${dados.empresa.desde}`, titulo: `${dados.hero.titulo} ${dados.hero.destaque}`, rodape: dados.endereco.bairro } },
    ...posts.map((p) => ({ params: { slug: p.id }, props: { olho: `Blog · ${p.data.categoria}`, titulo: p.data.titulo, rodape: dados.empresa.nome } })),
  ];
}

const no = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}) => ({ type, props: { style, children, ...extra } });

export const GET: APIRoute = async ({ props }) => {
  const { olho, titulo, rodape } = props as { olho: string; titulo: string; rodape: string };
  const foto = emBase64(`public/midia/${dados.hero.video}.jpg`, 'image/jpeg');
  const logo = emBase64('public/logo-ls.png', 'image/png');
  const arvore = no('div', { width: 1200, height: 630, display: 'flex', position: 'relative', backgroundColor: '#0B1F44', fontFamily: 'Onest' }, [
    no('img', { position: 'absolute', left: 380, top: 0, width: 1120, height: 630, objectFit: 'cover' }, undefined, { src: foto }),
    no('div', { position: 'absolute', left: 0, top: 0, width: 1200, height: 630, backgroundImage: 'linear-gradient(90deg, #0B1F44 0%, #0B1F44 36%, rgba(11,31,68,0.82) 52%, rgba(11,31,68,0.15) 80%, rgba(11,31,68,0) 100%)' }),
    no('div', { position: 'absolute', left: 64, top: 56, display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: 18, padding: '10px 14px' }, [
      no('img', { width: 64, height: 64 }, undefined, { src: logo }),
    ]),
    no('div', { position: 'absolute', left: 64, top: 190, width: 700, display: 'flex', flexDirection: 'column' }, [
      no('div', { fontSize: 24, fontWeight: 600, color: '#9CC2FF', letterSpacing: 0.4 }, olho),
      no('div', { marginTop: 18, fontSize: titulo.length > 44 ? 58 : 68, fontWeight: 500, color: '#fff', lineHeight: 1.08, letterSpacing: -1.5 }, titulo),
    ]),
    no('div', { position: 'absolute', left: 64, bottom: 56, fontSize: 24, color: '#C9D8F5' }, rodape),
  ]);
  const svg = await satori(arvore as never, {
    width: 1200, height: 630,
    fonts: [{ name: 'Onest', data: fonte(500), weight: 500, style: 'normal' }, { name: 'Onest', data: fonte(600), weight: 600, style: 'normal' }],
  });
  const jpg = await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } });
};
