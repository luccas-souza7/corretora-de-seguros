import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Cada arquivo .md em src/content/blog/ vira um post.
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    data: z.coerce.date(),
    categoria: z.string(),
    // nome de um arquivo dentro de public/blog/ (ex.: "franquia.jpg"); opcional
    capa: z.string().optional(),
    rascunho: z.boolean().default(false),
  }),
});

export const collections = { blog };
