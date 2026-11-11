# Corretora de Seguros — Projeto de Portfólio

Site institucional fictício de uma corretora de seguros, desenvolvido como projeto de portfólio.

**Ver no ar:** https://luccas-souza7.github.io/corretora-de-seguros/

> **Este projeto é disponibilizado exclusivamente para visualização e avaliação. Reprodução não autorizada é proibida. Veja a [LICENSE](LICENSE).**
>
> Empresa, endereço, avaliações e depoimentos são fictícios.

---

## O que tem no site

- Abertura com mapa: o pino mostra o endereço, a câmera mergulha na rua e o cartão do endereço se abre na página
- Hero em tela cheia com vídeo
- Seguros em carrossel, seguradoras parceiras em esteira contínua, avaliações, perguntas frequentes
- Blog com artigos em Markdown
- Formulário de cotação que abre o WhatsApp com a mensagem pronta
- Mapa interativo na seção de contato
- Botão de WhatsApp sempre à mão (barra fixa no celular, botão flutuante no desktop)
- Páginas: Início, Sobre, Blog, Termos de Uso e Política de Privacidade

Pensado primeiro para o celular.

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Gerador do site | [Astro](https://astro.build) (saída 100% estática) |
| Estilo e comportamento | CSS e JavaScript puros, sem framework |
| Mapa | MapLibre GL + OpenFreeMap (dados do OpenStreetMap, gratuito e sem chave) |
| Ícones | Phosphor Icons |
| Tipografia | Onest + Open Sans, servidas pelo próprio site |
| Hospedagem | GitHub Pages, publicado por GitHub Actions |

## Estrutura

```
src/
├── dados/site.json      # textos, contatos, seguros, seguradoras, avaliações, FAQ
├── content/blog/        # um arquivo .md por artigo
├── pages/               # páginas do site
├── components/          # blocos reutilizáveis
├── layouts/Base.astro   # cabeçalho, rodapé e tags de SEO
├── scripts/             # abertura, mapa, formulário
└── styles/global.css    # cores, fontes e todo o visual
public/
├── midia/               # vídeo da hero e imagem do mapa
├── seguradoras/         # logos das seguradoras
└── blog/                # capas dos artigos
```

## Como publicar um artigo no blog

1. Abra a pasta [`src/content/blog`](src/content/blog) no GitHub e clique em **Add file → Create new file**.
2. Dê um nome terminado em `.md`, sem espaços nem acentos. O nome vira o endereço do artigo: `seguro-viagem.md` → `/blog/seguro-viagem/`.
3. Cole o modelo abaixo, ajuste e clique em **Commit changes**.

```md
---
titulo: "Título do artigo"
resumo: "Uma ou duas frases que aparecem na listagem e no compartilhamento."
data: 2026-12-01
categoria: Auto
---

Primeiro parágrafo do artigo.

## Um subtítulo

Mais texto. **Negrito**, listas e links funcionam normalmente.
```

O site é republicado sozinho em cerca de um minuto. A imagem de compartilhamento (WhatsApp, redes sociais) é gerada automaticamente com o título.

**Capa (opcional):** envie uma imagem 1600×900 para `public/blog/` e acrescente a linha `capa: nome-do-arquivo.jpg` no cabeçalho. Sem capa, o artigo usa a arte padrão da marca.

**Rascunho:** acrescente `rascunho: true` para guardar um artigo sem publicar.

**Categorias com ícone próprio:** Auto, Residencial, Vida, Sinistro, Consórcio, Celular, Empresarial, Saúde.

## Como adaptar para outra empresa

| O que mudar | Onde |
|---|---|
| Nome, contatos, endereço, textos, seguros, seguradoras, avaliações, FAQ | `src/dados/site.json` |
| Cores e fontes | início de `src/styles/global.css` |
| Logo | `public/logo-ls.png` |
| Vídeo da hero | `public/midia/` (MP4 + WebM + JPG com o mesmo nome) |
| Logos das seguradoras | `public/seguradoras/` |
| Endereço do site | `astro.config.mjs` (`site` e `base`) |

Ao mudar o endereço no mapa, atualize `longitude` e `latitude` em `site.json` e gere de novo `public/midia/mapa.webp`.

## Rodar no computador

```bash
npm install
```

```bash
npm run dev
```

Para gerar a versão final em `dist/`:

```bash
npm run build
```

## Créditos

- Vídeo: [Pexels](https://www.pexels.com)
- Mapa: © colaboradores do [OpenStreetMap](https://www.openstreetmap.org/copyright), via [OpenFreeMap](https://openfreemap.org)
- As marcas das seguradoras pertencem aos respectivos titulares

## Contato

Gostou do trabalho? Entre em contato para conversarmos sobre o seu projeto.

- 📱 [+55 (11) 93201-8859](https://wa.me/5511932018859)
- 📧 [luccasnsouza1@gmail.com](mailto:luccasnsouza1@gmail.com)
- 💼 [linkedin.com/in/luccas-souza7](https://www.linkedin.com/in/luccas-souza7/)
- 💻 [github.com/luccas-souza7](https://github.com/luccas-souza7)
