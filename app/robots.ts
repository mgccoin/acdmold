import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ---------- Search engines ----------
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/' },
      { userAgent: 'Googlebot-News', allow: '/' },
      { userAgent: 'AdsBot-Google', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
      { userAgent: 'YandexBot', allow: '/' },

      // ---------- AI / answer-engine crawlers ----------
      // OpenAI
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      // Google AI training
      { userAgent: 'Google-Extended', allow: '/' },
      // Perplexity
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      // Anthropic / Claude
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      // Common Crawl (powers many LLM training datasets)
      { userAgent: 'CCBot', allow: '/' },
      // Meta / Facebook
      { userAgent: 'FacebookBot', allow: '/' },
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
      // Cohere
      { userAgent: 'cohere-ai', allow: '/' },
      // You.com
      { userAgent: 'YouBot', allow: '/' },
      // Diffbot (knowledge graph)
      { userAgent: 'Diffbot', allow: '/' },
      // Mistral
      { userAgent: 'MistralAI-User', allow: '/' },
      // ByteDance / Doubao
      { userAgent: 'Bytespider', allow: '/' },
      // Amazon
      { userAgent: 'Amazonbot', allow: '/' },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`],
    host: SITE_URL,
  };
}
