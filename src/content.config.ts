import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// SEO additions
			author: z.string().default('Balesaja'),
			tags: z.array(z.string()).default([]),
			category: z.string().optional(),
			canonical: z.string().url().optional(),
			noindex: z.boolean().default(false),
			// CTA override
			ctaTitle: z.string().optional(),
			ctaDescription: z.string().optional(),
			ctaLink: z.string().optional(),
			ctaButton: z.string().optional(),
			faq: z.array(z.object({
				question: z.string(),
				answer: z.string(),
			})).optional(),
		}),
});

export const collections = { blog };
