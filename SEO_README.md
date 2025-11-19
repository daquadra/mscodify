# Guia de SEO - MSCodify

Este documento descreve toda a estrutura de SEO implementada no site e como configurá-la.

## 📋 Checklist de SEO Implementado

### ✅ Meta Tags Básicas

- [x] Title tag otimizado
- [x] Meta description
- [x] Meta keywords
- [x] Canonical URL
- [x] Language (pt-BR)
- [x] Author e Publisher

### ✅ Open Graph (Facebook, LinkedIn)

- [x] og:type
- [x] og:title
- [x] og:description
- [x] og:image (1200x630px)
- [x] og:url
- [x] og:site_name
- [x] og:locale

### ✅ Twitter Cards

- [x] twitter:card (summary_large_image)
- [x] twitter:title
- [x] twitter:description
- [x] twitter:image
- [x] twitter:creator

### ✅ Arquivos de Indexação

- [x] sitemap.xml (dinâmico)
- [x] robots.txt (dinâmico)

### ✅ Structured Data (JSON-LD)

- [x] Organization
- [x] WebSite
- [x] WebPage
- [x] Person
- [x] Service
- [x] OfferCatalog

### ✅ Técnico

- [x] Performance (Next.js otimizado)
- [x] Responsivo (mobile-first)
- [x] Semantic HTML
- [x] Acessibilidade (alt texts, ARIA labels)

## 🔧 Configurações Necessárias

### 1. Imagem Open Graph

Você precisa criar uma imagem para compartilhamento em redes sociais:

**Localização**: `/public/images/og-image.png`

**Especificações**:

- Dimensões: 1200x630 pixels
- Formato: PNG ou JPG
- Peso máximo: 1MB
- Conteúdo: Logo + slogan ou texto descritivo

**Dica**: Use ferramentas como Canva ou Figma para criar:

```
+------------------------------------------------+
|                                                |
|           [Logo MSCodify]                      |
|                                                |
|    Desenvolvimento de Software Profissional    |
|                                                |
|    Transforme suas ideias em realidade digital |
|                                                |
+------------------------------------------------+
```

### 2. Google Search Console

1. Acesse: <https://search.google.com/search-console>
2. Adicione sua propriedade (<https://mscodify.dev.br>)
3. Verifique a propriedade usando uma destas opções:
   - Upload de arquivo HTML
   - Tag HTML (código de verificação)
   - Google Analytics
   - Google Tag Manager
   - DNS record

4. Após verificar, pegue o código de verificação e atualize em:

   ```typescript
   // app/layout.tsx
   verification: {
     google: 'SEU-CODIGO-AQUI',
   }
   ```

5. Envie o sitemap:
   - No Search Console, vá em "Sitemaps"
   - Adicione: `https://mscodify.dev.br/sitemap.xml`

### 3. Meta Verificações Opcionais

**Bing Webmaster Tools**:

1. Acesse: <https://www.bing.com/webmasters>
2. Adicione seu site
3. Copie o código de verificação
4. Adicione em `app/layout.tsx`:

   ```typescript
   verification: {
     google: 'seu-codigo-google',
     bing: 'seu-codigo-bing',
   }
   ```

**Yandex** (se quiser aparecer na Rússia):

1. Acesse: <https://webmaster.yandex.com>
2. Siga o mesmo processo
3. Adicione: `yandex: 'seu-codigo-yandex'`

### 4. Analytics (Recomendado)

Para monitorar o tráfego, adicione Google Analytics:

1. Crie uma propriedade em: <https://analytics.google.com>
2. Pegue o ID de medição (ex: G-XXXXXXXXXX)
3. Crie o arquivo `app/components/Analytics.tsx`:

```typescript
'use client';

import Script from 'next/script';

export default function Analytics() {
  const GA_ID = 'G-XXXXXXXXXX'; // Seu ID aqui

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
```

4. Adicione no `app/layout.tsx`:

```typescript
import Analytics from './components/Analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## 📊 Estrutura Atual

### Metadata (app/layout.tsx)

```typescript
- Title: "MSCodify - Desenvolvimento de Software Profissional"
- Description: Otimizada para conversão
- Keywords: 15 palavras-chave relevantes
- Open Graph: Configurado para redes sociais
- Twitter Cards: Configurado para Twitter/X
- Robots: Indexação permitida
- Canonical: https://mscodify.dev.br
```

### Sitemap (app/sitemap.ts)

URLs incluídas:

- Homepage (priority: 1.0)
- #servicos (priority: 0.8)
- #projetos (priority: 0.8)
- #sobre (priority: 0.7)
- #contato (priority: 0.9)

### JSON-LD (app/page.tsx)

Dados estruturados incluem:

- **Organization**: MSCodify como empresa
- **WebSite**: Informações do site
- **WebPage**: Página principal
- **Person**: Madson Lima (desenvolvedor)
- **Service**: Serviços oferecidos
- **OfferCatalog**: Catálogo detalhado de ofertas

## 🚀 Próximos Passos Após Deploy

### 1. Enviar para Motores de Busca

**Google**:

```
https://www.google.com/ping?sitemap=https://mscodify.dev.br/sitemap.xml
```

**Bing**:

```
https://www.bing.com/ping?sitemap=https://mscodify.dev.br/sitemap.xml
```

### 2. Verificar Structured Data

Use o Google Rich Results Test:

```
https://search.google.com/test/rich-results?url=https://mscodify.dev.br
```

### 3. Testar Open Graph

Teste como aparece nas redes sociais:

- Facebook: <https://developers.facebook.com/tools/debug/>
- LinkedIn: <https://www.linkedin.com/post-inspector/>
- Twitter: <https://cards-dev.twitter.com/validator>

### 4. Performance

Teste a performance do site:

- PageSpeed Insights: <https://pagespeed.web.dev/>
- GTmetrix: <https://gtmetrix.com/>
- WebPageTest: <https://www.webpagetest.org/>

## 🎯 Palavras-chave Alvo

Palavras principais para ranqueamento:

1. desenvolvimento de software
2. desenvolvimento web
3. PWA (Progressive Web Apps)
4. análise de sistemas
5. desenvolvedor full stack
6. criação de sites
7. sistemas web
8. e-commerce

## 📝 Boas Práticas

### Conteúdo

- ✅ Títulos descritivos e únicos
- ✅ Meta descriptions entre 150-160 caracteres
- ✅ URLs limpas e descritivas
- ✅ Headings hierárquicos (h1, h2, h3)
- ✅ Alt text em todas as imagens

### Técnico

- ✅ HTTPS (configure no deploy)
- ✅ Mobile-friendly (responsivo)
- ✅ Loading rápido (Next.js otimizado)
- ✅ Structured data válido
- ✅ Sitemap atualizado

### Links

- ✅ Links internos (navegação entre seções)
- ⚠️ Backlinks (busque parcerias e menções)
- ✅ Links externos com rel="noopener noreferrer"

## 🔍 Monitoramento

Após o site estar no ar, monitore:

1. **Google Search Console**:
   - Impressões e cliques
   - Posição média das palavras-chave
   - Erros de indexação
   - Cobertura do sitemap

2. **Google Analytics**:
   - Visitantes únicos
   - Taxa de rejeição
   - Páginas mais visitadas
   - Origem do tráfego

3. **PageSpeed Insights**:
   - Core Web Vitals
   - Performance score
   - Oportunidades de melhoria

## ⚙️ Manutenção

### Mensalmente

- [ ] Verificar posições no Google
- [ ] Analisar tráfego no Analytics
- [ ] Verificar erros no Search Console
- [ ] Atualizar projetos (muda lastModified no sitemap)

### Semestralmente

- [ ] Revisar e atualizar keywords
- [ ] Atualizar conteúdo (blog posts se criar)
- [ ] Verificar backlinks
- [ ] Analisar concorrentes

## 📚 Recursos Úteis

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Guide](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

## 🎨 Personalização

### Alterar URL Base

Se mudar o domínio, atualize em:

1. `app/layout.tsx` - metadataBase
2. `app/sitemap.ts` - baseUrl
3. `app/robots.ts` - baseUrl
4. `app/page.tsx` - URLs no JSON-LD

### Adicionar Novas Páginas ao Sitemap

Edite `app/sitemap.ts`:

```typescript
{
  url: `${baseUrl}/nova-pagina`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.7,
}
```

### Atualizar Informações de Contato

Edite `app/page.tsx` no objeto jsonLd:

```typescript
contactPoint: {
  telephone: '+55-XX-XXXXX-XXXX',
  email: 'seu@email.com',
}
```

---

**Última atualização**: 2025-11-19
**Versão**: 1.0
